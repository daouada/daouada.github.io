from scholarly import scholarly

# Author ID from Google Scholar URL
author_id = "WBmJVSkAAAAJ"

# Fetch author information
print(f"Fetching publications for author ID: {author_id}...")
author = scholarly.search_author_id(author_id)
author = scholarly.fill(author, sections=["publications"])

# Prepare BibTeX entries
bib_entries = []
for pub in author["publications"]:
    try:
        filled_pub = scholarly.fill(pub)
        bib = scholarly.bibtex(filled_pub)
        bib_entries.append(bib)
    except Exception as e:
        print(f"Skipping one entry due to error: {e}")

# Save all BibTeX entries into a file
with open("citations.bib", "w", encoding="utf-8") as f:
    f.write("\n\n".join(bib_entries))

print(f"✅ Export complete! Saved {len(bib_entries)} entries to citations.bib")
