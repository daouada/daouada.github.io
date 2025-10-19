#!/usr/bin/env python3
import os
import json
import re
from pathlib import Path
import pdb

import bibtexparser

ROOT = Path(__file__).resolve().parents[1]
BIB_FILE = ROOT / "publications.bib"
DATA_FILE = ROOT / "data" / "publications.json"
STATIC_CIT = ROOT / "static" / "citations"


def slugify(text: str) -> str:
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text.lower()).strip("-")
    return text[:60]


def main() -> None:
    with open(BIB_FILE, "r", encoding="utf-8") as fh:
        db = bibtexparser.load(fh)

    publications = []
    STATIC_CIT.mkdir(parents=True, exist_ok=True)

    for entry in db.entries:
        year = entry.get("year", "0000")
        # common pattern to strip outer braces from BibTeX titles
        title = entry.get("title", "").strip("{}")
        authors = entry.get("author", "")
        venue = entry.get("booktitle") or entry.get("journal") or ""
        doi = entry.get("doi", "")
        pages = entry.get("pages", "")
        key = entry.get("ID", "")
        slug = f"{year}-{slugify(title)}"

        # Write citation-only page
        cite_dir = STATIC_CIT / slug
        cite_dir.mkdir(parents=True, exist_ok=True)

        # Build BibTeX block with all key=value pairs except ENTRYTYPE and ID
        entrytype = entry.get("ENTRYTYPE", "inproceedings")
        fields = []
        for k, v in entry.items():
            if k in ("ENTRYTYPE", "ID"):
                continue
            # Keep value wrapped in braces to preserve capitalization and latex
            fields.append(f"  {k} = {{{v}}},")


        cite_bib = (
            f"@{entrytype}{{{key},\n"
            f"{os.linesep.join(fields).rstrip(',')}\n"
            f"}}\n"
        )

        # write the .bib under static
        (STATIC_CIT / f"{slug}.bib").write_text(cite_bib, encoding="utf-8")

        # Collect data for the JSON index
        publications.append(
            {
                "title": title,
                "authors": authors,
                "venue": venue,
                "year": year,
                "doi": doi,
                "pages": pages,
                "slug": slug,
            }
        )

    # Write the JSON index
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(publications, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"Generated {len(publications)} publications")


if __name__ == "__main__":
    main()