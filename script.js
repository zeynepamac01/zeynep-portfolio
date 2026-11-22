/* ============================================================
   PROJECTS
   Add a new object here to add a new project card to the page.
   Leave `link` as "" if you don't have a live link/repo yet —
   it will render as a disabled "Coming soon" label instead.
   ============================================================ */
const projects = [
  {
    fig: "Upcoming project",
    title: "Epidemiology Lab",
    desc: "Upcoming work with the Laboratory for Computational Epidemiology and Public Health (CEPH).",
    tags: ["Epidemiology", "Research"],
    upcoming: true
  },
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
    image: "robot_rescue_photo.png?v=landscape",
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

  grid.innerHTML = projects.map(p => {
    const thumbnail = p.upcoming
      ? `<div class="project-thumb project-thumb--upcoming"><span>Upcoming project</span></div>`
      : `<a class="project-thumb" href="${p.link}" aria-label="${p.title}">
          <img src="${p.image}" alt="${p.imageAlt}" class="project-thumb-image project-thumb-image--${p.imageFit}">
          <span>${p.fig}</span>
        </a>`;
    const cardAction = p.link ? `onclick="window.location.href='${p.link}'"` : "";
    const projectLink = p.link
      ? `<a href="${p.link}">${p.linkLabel || "View"}</a>`
      : `<span class="project-coming-soon">In development</span>`;

    return `
      <article class="project-card${p.upcoming ? " project-card--upcoming" : ""}" ${cardAction}>
        ${thumbnail}
        <p class="project-fig">${p.fig}</p>
        <h3>${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <ul class="project-tags">
          ${p.tags.map(t => `<li>${t}</li>`).join("")}
        </ul>
        <div class="project-links">${projectLink}</div>
      </article>
    `;
  }).join("");
}

function initCarousels() {
  document.querySelectorAll("[data-carousel-controls]").forEach(controls => {
    const track = document.getElementById(controls.dataset.carouselControls);
    if (!track) return;

    const buttons = [...controls.querySelectorAll("[data-carousel-direction]")];
    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      buttons.forEach(button => {
        const direction = Number(button.dataset.carouselDirection);
        button.disabled = direction < 0 ? track.scrollLeft <= 1 : track.scrollLeft >= maxScroll - 1;
      });
    };

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const card = track.firstElementChild;
        if (!card) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const direction = Number(button.dataset.carouselDirection);
        track.scrollBy({
          left: direction * (card.getBoundingClientRect().width + gap),
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
        });
      });
    });

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  });
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

function initNetworkBackground() {
  const canvas = document.querySelector(".network-background");
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const points = [];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    const count = Math.min(150, Math.max(48, Math.round((width * height) / 9000)));
    points.length = 0;
    for (let index = 0; index < count; index += 1) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.14,
        radius: Math.random() < 0.1 ? 2.2 : 0.8 + Math.random() * 0.8,
      });
    }
  }

  function draw() {
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const dark = document.documentElement.dataset.theme === "dark";
    const maxDistance = Math.min(136, Math.max(88, width * 0.11));

    if (!reduceMotion) {
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -3) point.x = width + 3;
        if (point.x > width + 3) point.x = -3;
        if (point.y < -3) point.y = height + 3;
        if (point.y > height + 3) point.y = -3;
      });
    }

    for (let index = 0; index < points.length; index += 1) {
      const point = points[index];
      for (let next = index + 1; next < points.length; next += 1) {
        const other = points[next];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * (dark ? 0.2 : 0.22);
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = dark
            ? `rgba(190, 181, 230, ${strength})`
            : `rgba(78, 82, 94, ${strength})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
      }
    }

    points.forEach((point, index) => {
      context.beginPath();
      context.arc(point.x, point.y, point.radius + (dark ? 0 : 0.25), 0, Math.PI * 2);
      context.fillStyle = dark
        ? (index % 5 === 0 ? "rgba(205, 196, 255, 0.86)" : "rgba(248, 247, 255, 0.72)")
        : "rgba(255, 255, 255, 0.96)";
      context.shadowColor = dark ? "rgba(190, 181, 230, 0.36)" : "rgba(44, 49, 61, 0.48)";
      context.shadowBlur = 5;
      context.fill();
      context.shadowBlur = 0;
    });
  }

  resize();
  window.addEventListener("resize", resize);
  if (reduceMotion) {
    draw();
  } else {
    const animate = () => {
      draw();
      window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }
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

function initSectionNavigation() {
  const sections = [...document.querySelectorAll("main > section")];
  if (sections.length < 2) return;

  let locked = false;

  window.addEventListener("wheel", event => {
    if (event.ctrlKey || Math.abs(event.deltaY) < 8 || locked) return;

    const headerOffset = document.querySelector(".site-header")?.offsetHeight || 0;
    const currentIndex = sections.reduce((closest, section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top - headerOffset);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Infinity }).index;
    const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + Math.sign(event.deltaY)));

    if (nextIndex === currentIndex) return;

    event.preventDefault();
    locked = true;
    sections[nextIndex].scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });

    window.setTimeout(() => {
      locked = false;
    }, 950);
  }, { passive: false });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderTagLists();
  initCarousels();
  initNavToggle();
  initThemeToggle();
  initNetworkBackground();
  initContactForm();
  initSectionNavigation();
  initBackToTop();
});

function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
}
