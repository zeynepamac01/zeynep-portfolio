# Zeynep S. Amac — Portfolio

A static, dependency-free portfolio site (HTML/CSS/JS, no build step).

## Files

- `index.html` — page structure and content
- `style.css` — all styling
- `script.js` — renders the project cards, skill tags, and the hero tree diagram
- `assets/Zeynep_S_Amac_CV.pdf` — your CV, linked from the "Download CV" button

## Put it on GitHub Pages

1. Create a new repository on GitHub. If you want it at `https://<username>.github.io`,
   name the repo exactly `<username>.github.io`. Otherwise any repo name works and
   the site will live at `https://<username>.github.io/<repo-name>`.
2. Push these files to the repo root (not inside a subfolder):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**. Under "Build and deployment," set
   **Source** to "Deploy from a branch," branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then visit the URL GitHub shows you on that same page.

## Add a new project

Open `script.js` and add an object to the `projects` array at the top:

```js
{
  fig: "Fig. 02.4",
  title: "Your Project Name",
  desc: "One or two sentences on what it does and why it's interesting.",
  tags: ["Python", "Whatever else"],
  link: "https://github.com/you/your-repo",
  linkLabel: "View repo"
}
```

Leave `link: ""` if you don't have a link yet — it'll show "Coming soon" instead
of a dead link.

## Edit skills

In `index.html`, each skill category is a `<ul class="tag-list" data-tags="...">` —
just edit the comma-separated string.

## Swap the CV

Replace `assets/Zeynep_S_Amac_CV.pdf` with an updated file of the same name,
or update the `href` on the "Download CV" button in `index.html` if you rename it.

## Local preview

No build tools needed — just open `index.html` in a browser, or run a tiny local
server from this folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.
