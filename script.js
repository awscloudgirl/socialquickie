// Get elements
const form = document.getElementById("pageForm");
const preview = document.querySelector(".preview-box");

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload

  // Collect input values
  const title = document.getElementById("title").value;
  const subtitle = document.getElementById("subtitle").value;
  const ctaText = document.getElementById("ctaText").value;
  const ctaLink = document.getElementById("ctaLink").value;

  // Create a slug (fake link path)
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const fakeUrl = `https://socialquickie.app/${slug}`;

  // Build preview HTML
  const pageHTML = `
    <div class="mini-landing">
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <a href="${ctaLink}" class="cta" target="_blank">${ctaText}</a>
      <p><small>Share link: <a href="${fakeUrl}" target="_blank">${fakeUrl}</a></small></p>
    </div>
  `;

  // Inject preview
  preview.innerHTML = pageHTML;
});