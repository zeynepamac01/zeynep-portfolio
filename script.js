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
          : `<span class="disabled">Coming soon</span>`}
      </div>
    </article>
  `).join("") + `
    <article class="project-card add-card">
      <p>+ Add another project in <code>script.js</code></p>
    </article>
  `;
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
function renderTree() {
  const svg = document.getElementById("tree-svg");
  if (!svg) return;

  const levels = [
    { y: 40,  labels: ["Body"] },
    { y: 190, labels: ["Skeletal", "Cardiovascular", "Nervous"] },
    { y: 340, labels: ["Tissue", "Tissue", "Tissue", "Tissue"] },
    { y: 480, labels: ["Cell", "Cell", "Cell", "Cell", "Cell"] }
  ];

  const width = 480;
  let svgContent = "";
  const nodePositions = [];

  levels.forEach((level, li) => {
    const count = level.labels.length;
    const spacing = width / (count + 1);
    const positions = level.labels.map((label, i) => ({
      x: spacing * (i + 1),
      y: level.y,
      label
    }));
    nodePositions.push(positions);
  });

  // edges: connect each node to nearest parent(s)
  for (let li = 1; li < nodePositions.length; li++) {
    const parents = nodePositions[li - 1];
    const children = nodePositions[li];
    children.forEach((child, ci) => {
      const parentIdx = Math.floor(ci * parents.length / children.length);
      const parent = parents[Math.min(parentIdx, parents.length - 1)];
      const midY = (parent.y + child.y) / 2;
      svgContent += `<path class="tree-edge" d="M${parent.x},${parent.y} C${parent.x},${midY} ${child.x},${midY} ${child.x},${child.y}" style="stroke-dasharray:300;stroke-dashoffset:300;animation:draw 1.1s ease forwards ${0.15 * li}s"/>`;
    });
  }

  // nodes
  nodePositions.forEach((positions, li) => {
    positions.forEach((pos, i) => {
      const r = li === 0 ? 10 : 6 - li * 0.6;
      const rootClass = li === 0 ? " root" : "";
      svgContent += `<circle class="tree-node${rootClass}" cx="${pos.x}" cy="${pos.y}" r="${r}" style="opacity:0;animation:fadein 0.5s ease forwards ${0.25 * li + 0.3}s"/>`;
      if (li === 0) {
        svgContent += `<text class="tree-label" x="${pos.x}" y="${pos.y - 18}" text-anchor="middle">${pos.label}</text>`;
      } else if (li === 1) {
        svgContent += `<text class="tree-label" x="${pos.x}" y="${pos.y - 12}" text-anchor="middle">${pos.label}</text>`;
      }
    });
  });

  svg.innerHTML = svgContent;

  // inject keyframes once
  if (!document.getElementById("tree-keyframes")) {
    const style = document.createElement("style");
    style.id = "tree-keyframes";
    style.textContent = `
      @keyframes draw { to { stroke-dashoffset: 0; } }
      @keyframes fadein { to { opacity: 1; } }
    `;
    document.head.appendChild(style);
  }
}

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
  renderTree();
  initNavToggle();
});
