/* ============================================================
   PROJECTS
   Add a new object here to add a new project card to the page.
   Leave `link` as "" if you don't have a live link/repo yet —
   it will render as a disabled "Coming soon" label instead.
   ============================================================ */
const projects = [
  {
    fig: "Project 01",
    title: "Human Reference Atlas — Organ Visualization",
    desc: "A Vega-based pipeline that generates organ-specific multiscale anatomical trees, with reusable Python workflows and config files for future Atlas releases.",
    tags: ["Python", "Vega", "Jupyter"],
    link: "",
    linkLabel: "View repo"
  },
  {
    fig: "Project 02",
    title: "Environmental Awareness Bee Game",
    desc: "A grid-based educational game built in C, using arrays, structs, and file handling to teach environmental decision-making through gameplay.",
    tags: ["C", "Game logic"],
    link: "",
    linkLabel: "View repo"
  },
  {
    fig: "Project 03",
    title: "Robot Rescue",
    desc: "An educational board game teaching AI literacy and iterative learning to students ages 10–14, presented as a completed prototype to peers and instructors.",
    tags: ["Design", "Education"],
    link: "",
    linkLabel: "View writeup"
  }
];

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects.map(p => `
    <article class="project-card">
      <p class="project-fig">${p.fig}</p>
      <h3>${p.title}</h3>
      <p class="project-desc">${p.desc}</p>
      <ul class="project-tags">
        ${p.tags.map(t => `<li>${t}</li>`).join("")}
      </ul>
      <div class="project-links">
        ${p.link
          ? `<a href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "View"}</a>`
          : ``}
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

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderTagLists();
  initNavToggle();
});
