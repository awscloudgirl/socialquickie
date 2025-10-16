// Elements
const form = document.getElementById("pageForm");
const preview = document.querySelector(".preview-box");
const pageList = document.getElementById("pageList");
const homeView = document.getElementById("homeView");
const pageView = document.getElementById("pageView");
const pageContent = document.getElementById("pageContent");
const backBtn = document.getElementById("backBtn");

// Load saved pages
let pages = JSON.parse(localStorage.getItem("pages")) || [];
renderDashboard();

// --- FORM SUBMIT HANDLER ---
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const subtitle = document.getElementById("subtitle").value;
  const ctaText = document.getElementById("ctaText").value;
  const ctaLink = document.getElementById("ctaLink").value;

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const fakeUrl = `#${slug}`;

  const newPage = { title, subtitle, ctaText, ctaLink, fakeUrl, slug };

  pages.push(newPage);
  localStorage.setItem("pages", JSON.stringify(pages));

  const pageHTML = `
    <div class="mini-landing">
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <a href="${ctaLink}" class="cta" target="_blank">${ctaText}</a>
      <p><small>Share link: <a href="${fakeUrl}" target="_blank">${location.origin}/${fakeUrl}</a></small></p>
    </div>
  `;
  preview.innerHTML = pageHTML;

  renderDashboard();
  form.reset();
});

// --- DASHBOARD RENDERING ---
function renderDashboard() {
  pageList.innerHTML = "";

  if (pages.length === 0) {
    pageList.innerHTML = '<li class="empty">No pages saved yet. Create your first one above 👆</li>';
    return;
  }

  pages.forEach((page, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div><a href="${page.fakeUrl}">${page.title}</a></div>
      <div class="btn-group">
        <button class="copy-btn" data-url="${location.origin}/${page.fakeUrl}">Copy Link</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    pageList.appendChild(li);
  });

  // Delete
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const i = e.target.getAttribute("data-index");
      pages.splice(i, 1);
      localStorage.setItem("pages", JSON.stringify(pages));
      renderDashboard();
    });
  });

  // Copy
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const url = e.target.getAttribute("data-url");
      navigator.clipboard.writeText(url);
      e.target.textContent = "Copied!";
      setTimeout(() => (e.target.textContent = "Copy Link"), 1500);
    });
  });
}

// --- ROUTING ---
window.addEventListener("hashchange", loadPageFromHash);
window.addEventListener("load", loadPageFromHash);

function loadPageFromHash() {
  const hash = location.hash.slice(1);
  if (!hash) {
    homeView.style.display = "block";
    pageView.style.display = "none";
    return;
  }

  const page = pages.find((p) => p.slug === hash);
  if (page) {
    homeView.style.display = "none";
    pageView.style.display = "block";

    pageContent.innerHTML = `
      <h1>${page.title}</h1>
      <p>${page.subtitle}</p>
      <a href="${page.ctaLink}" class="cta" target="_blank">${page.ctaText}</a>
    `;
  }
}

// --- Back Button ---
backBtn.addEventListener("click", () => {
  location.hash = "";
});