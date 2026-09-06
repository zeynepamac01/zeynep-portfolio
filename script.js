/* ============================================================
   PROJECTS
   Add a new object here to add a new project card to the page.
   Leave `link` as "" if you don't have a live link/repo yet —
   it will render as a disabled "Coming soon" label instead.
   ============================================================ */
const projects = [
  {
    fig: "Project 01",
    title: "Human Reference Atlas - Organ Visualizations",
    desc: "A Vega-based pipeline that generates organ-specific multiscale anatomical trees, with reusable Python workflows and config files for future Atlas releases.",
    tags: ["Python", "Vega", "Jupyter"],
    image: "vega_mouth_tree_viz.svg",
    imageAlt: "Mouth anatomical structure tree visualization",
    imageFit: "cover",
    link: "project-human-reference-atlas.html",
    linkLabel: "Read more"
  },
  {
    fig: "Project 02",
    title: "Environmental Awareness Bee Game",
    desc: "A grid-based educational game built in C, using arrays, structs, and file handling to teach environmental decision-making through gameplay.",
    tags: ["C", "Game logic"],
    image: "Bee_game_ss.png",
    imageAlt: "Environmental Awareness Bee Game screenshot",
    imageFit: "cover",
    link: "project-bee-game.html",
    linkLabel: "Read more"
  },
  {
    fig: "Project 03",
    title: "Robot Rescue",
    desc: "An educational board game teaching AI literacy and iterative learning to students ages 10–14, presented as a completed prototype to peers and instructors.",
    tags: ["Design", "Education"],
    image: "robot_rescue_photo.png",
    imageAlt: "Robot Rescue board game prototype",
    imageFit: "cover",
    link: "project-robot-rescue.html",
    linkLabel: "Read more"
  },
  {
    fig: "Project 04",
    title: "FTU & VCCF Connection Visualization",
    desc: "A scientific visualization showing connections between functional tissue units and the vascular common coordinate framework.",
    tags: ["Design", "Visualization"],
    image: "large_intestine_vasculature_ftus_vega.svg",
    imageAlt: "Large intestine FTU and VCCF connection visualization",
    imageFit: "cover",
    link: "project-macroscopes.html",
    linkLabel: "Read more"
  }
];

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects.map(p => `
    <article class="project-card" onclick="window.location.href='${p.link}'">
      <a class="project-thumb" href="${p.link}" aria-label="${p.title}">
        <img src="${p.image}" alt="${p.imageAlt}" class="project-thumb-image project-thumb-image--${p.imageFit}">
        <span>${p.fig}</span>
      </a>
      <p class="project-fig">${p.fig}</p>
      <h3>${p.title}</h3>
      <p class="project-desc">${p.desc}</p>
      <ul class="project-tags">
        ${p.tags.map(t => `<li>${t}</li>`).join("")}
      </ul>
      <div class="project-links">
        <a href="${p.link}">${p.linkLabel || "View"}</a>
      </div>
    </article>
  `).join("");
}

/* ============================================================
   SKILL TAGS — reads data-tags attr and builds <li> chips
   ============================================================ */
function renderTagLists() {
  document.querySelectorAll(".tag-list[data-tags]").forEach(list => {
    const items = list.getAttribute("data-tags").split(",").map(s => s.trim());
    list.innerHTML = items.map(i => `<li>${i}</li>`).join("");
  });
}

/* ============================================================
   HERO TREE — Body -> Organ -> Tissue -> Cell
   Built programmatically so it's easy to relabel.
   ============================================================ */

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
function initNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

function initThemeToggle() {
  const startingTheme = "light";

  document.documentElement.dataset.theme = startingTheme;

  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === "dark";
    btn.textContent = dark ? "Light" : "Dark";
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("aria-pressed", String(dark));
  }

  applyTheme(startingTheme);

  btn.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const email = data.get("email") || "";
    const subject = data.get("subject") || "";
    const message = data.get("message") || "";
    const body = `From: ${email}\n\n${message}`;
    window.location.href = `mailto:zsamac@iu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderTagLists();
  initNavToggle();
  initThemeToggle();
  initContactForm();
  initBackToTop();
});

function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
}
