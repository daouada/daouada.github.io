// news.js
document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const searchInput = document.getElementById("news-search");
  const categoryFilter = document.getElementById("category-filter");
  const yearFilter = document.getElementById("year-filter");

  // Get all news items
  const newsItems = document.querySelectorAll(".news-item");

  // Add event listeners to filters
  searchInput.addEventListener("input", filterNews);
  categoryFilter.addEventListener("change", filterNews);
  yearFilter.addEventListener("change", filterNews);

  function filterNews() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedYear = yearFilter.value;

    newsItems.forEach((item) => {
      const title = item.querySelector(".news-title").textContent.toLowerCase();
      const content = item
        .querySelector(".news-content")
        .textContent.toLowerCase();
      const category = item.getAttribute("data-category");
      const year = item.getAttribute("data-year");

      const matchesSearch =
        title.includes(searchTerm) || content.includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;
      const matchesYear = selectedYear === "all" || year === selectedYear;

      if (matchesSearch && matchesCategory && matchesYear) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Update year sections visibility
    updateYearSectionsVisibility();
  }

  function updateYearSectionsVisibility() {
    const yearSections = document.querySelectorAll(".year-section");
    yearSections.forEach((section) => {
      const hasVisibleNews = [...section.querySelectorAll(".news-item")].some(
        (item) => item.style.display !== "none"
      );
      section.style.display = hasVisibleNews ? "block" : "none";
    });
  }
});
