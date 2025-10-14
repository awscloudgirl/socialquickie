// Get elements
const form = document.getElementById("pageForm");
const preview = document.querySelector(".preview-box");
const pageList = document.getElementById("pageList");

// --- Load any saved pages from localStorage ---
let pages = JSON.parse(localStorage.getItem("pages")) || [];
renderDashboard();

// --- Handle form submission ---
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect values
  const title = document.getElementById("title").value;
  const subtitle = document.getElementById("subtitle").value;
  const ctaText = document.getElementById("ctaText").value;
  const ctaLink = document.getElementById("ctaLink").value;

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const fakeUrl = `https://socialquickie.app/${slug}`;

  // Build page object
  const newPage = { title, subtitle, ctaText, ctaLink, fakeUrl };

  // Save to localStorage
  pages.push(newPage);
  localStorage.setItem("pages", JSON.stringify(pages));

  // Render preview
  const pageHTML = `
    <div class="mini-landing">
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <a href="${ctaLink}" class="cta" target="_blank">${ctaText}</a>
      <p><small>Share link: <a href="${fakeUrl}" target="_blank">${fakeUrl}</a></small></p>
    </div>
  `;
  preview.innerHTML = pageHTML;

  // Refresh dashboard
  renderDashboard();

  // Reset form
  form.reset();
});

// --- Render Dashboard ---
function renderDashboard() {
  pageList.innerHTML = ""; // clear list

  if (pages.length === 0) {
    pageList.innerHTML = "<li>No pages saved yet.</li>";
    return;
  }

  pages.forEach((page, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${page.fakeUrl}" target="_blank">${page.title}</a>
      <button data-index="${index}">Delete</button>
    `;
    pageList.appendChild(li);
  });

  // Add delete button listeners
  document.querySelectorAll(".dashboard button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const i = e.target.getAttribute("data-index");
      pages.splice(i, 1);
      localStorage.setItem("pages", JSON.stringify(pages));
      renderDashboard();
    });
  });
}
