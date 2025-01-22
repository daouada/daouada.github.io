// publications.js
document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const searchInput = document.getElementById("publication-search");
  const typeFilter = document.getElementById("type-filter");
  const yearFilter = document.getElementById("year-filter");
  const sortSelect = document.getElementById("sort-select");

  // Get all publication items
  const publicationItems = document.querySelectorAll(".publication-item");

  // Add event listeners
  searchInput.addEventListener("input", filterPublications);
  typeFilter.addEventListener("change", filterPublications);
  yearFilter.addEventListener("change", filterPublications);
  sortSelect.addEventListener("change", sortPublications);

  function filterPublications() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedYear = yearFilter.value;

    publicationItems.forEach((item) => {
      const title = item
        .querySelector(".publication-title")
        .textContent.toLowerCase();
      const authors = item
        .querySelector(".publication-authors")
        .textContent.toLowerCase();
      const content = item
        .querySelector(".publication-venue")
        .textContent.toLowerCase();
      const type = item.getAttribute("data-type");
      const year = item.getAttribute("data-year");

      const matchesSearch =
        title.includes(searchTerm) ||
        authors.includes(searchTerm) ||
        content.includes(searchTerm);
      const matchesType = selectedType === "all" || type === selectedType;
      const matchesYear = selectedYear === "all" || year === selectedYear;

      if (matchesSearch && matchesType && matchesYear) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Update year sections visibility
    updateYearSectionsVisibility();
  }

  function sortPublications() {
    const sortBy = sortSelect.value;
    const publicationsList = document.getElementById("publications-list");
    const publications = Array.from(publicationItems);

    publications.sort((a, b) => {
      if (sortBy === "year-desc") {
        return b.getAttribute("data-year") - a.getAttribute("data-year");
      } else if (sortBy === "year-asc") {
        return a.getAttribute("data-year") - b.getAttribute("data-year");
      } else if (sortBy === "title") {
        return a
          .querySelector(".publication-title")
          .textContent.localeCompare(
            b.querySelector(".publication-title").textContent
          );
      }
    });

    publications.forEach((pub) => {
      publicationsList.appendChild(pub);
    });
  }

  function updateYearSectionsVisibility() {
    const yearSections = document.querySelectorAll(".year-section");
    yearSections.forEach((section) => {
      const hasVisiblePubs = [
        ...section.querySelectorAll(".publication-item"),
      ].some((item) => item.style.display !== "none");
      section.style.display = hasVisiblePubs ? "block" : "none";
    });
  }

  // Citation copy functionality
  document.querySelectorAll(".copy-citation").forEach((button) => {
    button.addEventListener("click", async function () {
      const citation = this.getAttribute("data-citation");
      try {
        await navigator.clipboard.writeText(citation);
        // Show success message
        const originalText = this.textContent;
        this.textContent = "Copied!";
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy citation:", err);
      }
    });
  });
});

async function loadPublications() {
  try {
    console.log("Fetching publications...");
    const response = await fetch("../documents/publications.json");
    console.log("Response:", response);
    const data = await response.json();
    console.log("Parsed data:", data);
    renderPublications(data);
  } catch (error) {
    console.error("Error loading publications:", error);
    document.getElementById("publications-list").innerHTML =
      '<p class="text-red-500">Error loading publications. Please try again later.</p>';
  }
}

function generatePublicationHTML(publication, type) {
  // Safely access properties with fallbacks
  const year = publication.year || "Unknown";
  const authors = Array.isArray(publication.authors)
    ? publication.authors.join(", ")
    : publication.authors || "Unknown Authors";
  const title = publication.title || "Untitled";
  const venue = publication.venue || "";
  const volume = publication.volume || "";
  const pages = publication.pages || "";
  const url = publication.url || "";
  const doi = publication.doi || "";
  const impact_factor = publication.impact_factor || null;
  const patent_number = publication.patent_number || "";
  const presentation_type = publication.type || "";

  // Determine badge color based on publication type
  const typeClass =
    {
      journals: "bg-blue-100 text-blue-800",
      conferences: "bg-green-100 text-green-800",
      patents: "bg-purple-100 text-purple-800",
    }[type] || "bg-gray-100 text-gray-800";

  const typeLabel =
    {
      journals: "Journal",
      conferences: "Conference",
      patents: "Patent",
    }[type] || "Publication";

  // Create title with optional URL link
  const titleElement = url
    ? `<a href="${url}" target="_blank" class="hover:text-blue-600 transition-colors">${title}</a>`
    : title;

  return `
    <div class="publication-item card" data-type="${type}" data-year="${year}">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="publication-title text-xl font-semibold">
            ${titleElement}
          </h3>
          <p class="publication-authors text-gray-600 mt-2">
            ${authors}
          </p>
          <p class="publication-venue mt-1">
            ${venue}
            ${volume ? `, Vol. ${volume}` : ""}
            ${pages ? `, pp. ${pages}` : ""}
            
          </p>
          <div class="mt-2">
            <span class="inline-block ${typeClass} text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              ${typeLabel}
            </span>
            ${
              impact_factor
                ? `<span class="text-sm text-gray-500">Impact Factor: ${impact_factor}</span>`
                : ""
            }
            ${
              patent_number
                ? `<span class="text-sm text-gray-500">Patent: ${patent_number}</span>`
                : ""
            }
            ${
              doi
                ? `<a href="https://doi.org/${doi}" target="_blank" 
                  class="text-sm text-blue-600 hover:text-blue-800 ml-2">DOI: ${doi}</a>`
                : ""
            }
            ${
              presentation_type
                ? `<span class="inline-block bg-gray-100 text-gray-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded">
                ${presentation_type}
               </span>`
                : ""
            }
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="copy-citation btn-outline text-sm" onclick="copyCitation(this)">
            Copy Citation
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderPublications(data) {
  // Validate input data
  if (!data || typeof data !== "object") {
    console.error("Invalid publication data:", data);
    return;
  }

  // Group publications by year
  const yearGroups = {};

  // Process each type of publication
  ["journals", "conferences", "patents"].forEach((type) => {
    const publications = data[type];
    if (!Array.isArray(publications)) {
      console.log(`No ${type} found or invalid data format`);
      return;
    }

    publications.forEach((pub) => {
      if (!pub) return;
      const year = (pub.year || "Unknown").toString();
      if (!yearGroups[year]) {
        yearGroups[year] = [];
      }
      yearGroups[year].push({ ...pub, publicationType: type });
    });
  });

  // Sort years in descending order (putting 'Unknown' at the end)
  const years = Object.keys(yearGroups).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return parseInt(b) - parseInt(a);
  });

  // Generate HTML
  const publicationsList = document.getElementById("publications-list");
  if (!publicationsList) {
    console.error("Publications list container not found");
    return;
  }

  const html = years
    .map(
      (year) => `
    <section class="year-section" data-year="${year}">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">${year}</h2>
      <div class="space-y-6">
        ${yearGroups[year]
          .sort((a, b) => {
            const typeOrder = { journals: 0, conferences: 1, patents: 2 };
            return (
              (typeOrder[a.publicationType] || 999) -
              (typeOrder[b.publicationType] || 999)
            );
          })
          .map((pub) => generatePublicationHTML(pub, pub.publicationType))
          .join("")}
      </div>
    </section>
  `
    )
    .join("");

  publicationsList.innerHTML = html;
  initializeFilters();
}

function initializeFilters() {
  const searchInput = document.getElementById("publication-search");
  const typeFilter = document.getElementById("type-filter");
  const yearFilter = document.getElementById("year-filter");

  function filterPublications() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedYear = yearFilter.value;

    // Debug logging
    console.log("Filtering with:", { searchTerm, selectedType, selectedYear });

    document.querySelectorAll(".publication-item").forEach((item) => {
      const title = item
        .querySelector(".publication-title")
        .textContent.toLowerCase();
      const authors = item
        .querySelector(".publication-authors")
        .textContent.toLowerCase();
      const type = item.dataset.type;
      const year = item.dataset.year;

      // Map the filter values to the data types
      const matchesType =
        selectedType === "all" ||
        (selectedType === "journal" && type === "journals") ||
        (selectedType === "conference" && type === "conferences") ||
        (selectedType === "patent" && type === "patents") ||
        (selectedType === "book" && type === "bookChapters");

      const matchesSearch =
        title.includes(searchTerm) || authors.includes(searchTerm);
      const matchesYear = selectedYear === "all" || year === selectedYear;

      // Debug logging for each item
      console.log("Item:", {
        title: title.substring(0, 20) + "...",
        type,
        matches: { matchesType, matchesSearch, matchesYear },
      });

      item.style.display =
        matchesSearch && matchesType && matchesYear ? "block" : "none";
    });

    // Show/hide year sections based on visible publications
    document.querySelectorAll(".year-section").forEach((section) => {
      const hasVisiblePublications = [
        ...section.querySelectorAll(".publication-item"),
      ].some((item) => item.style.display !== "none");
      section.style.display = hasVisiblePublications ? "block" : "none";
    });
  }

  // Add event listeners
  if (searchInput) searchInput.addEventListener("input", filterPublications);
  if (typeFilter) typeFilter.addEventListener("change", filterPublications);
  if (yearFilter) yearFilter.addEventListener("change", filterPublications);

  // Initial filter application
  filterPublications();
}

// Copy citation functionality
function copyCitation(button) {
  const pubItem = button.closest(".publication-item");
  const title = pubItem.querySelector(".publication-title").textContent.trim();
  const authors = pubItem
    .querySelector(".publication-authors")
    .textContent.trim();
  const venue = pubItem.querySelector(".publication-venue").textContent.trim();

  const citation = `${authors}. "${title}". ${venue}`;
  navigator.clipboard.writeText(citation);

  button.textContent = "Copied!";
  setTimeout(() => {
    button.textContent = "Copy Citation";
  }, 2000);
}

// Initialize when DOM is loaded - single event listener
document.addEventListener("DOMContentLoaded", loadPublications);
