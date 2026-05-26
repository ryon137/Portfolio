# ryoncook.dev

Personal portfolio site — [ryoncook.dev](https://ryoncook.dev)

Lightweight vanilla HTML/CSS/JS. No build step, no framework. Deploys via GitHub Pages.

## Structure

```
Portfolio/
├── index.html      # markup
├── style.css       # all styles
├── app.js          # fetches projects.json and renders cards
├── projects.json   # project data — updated automatically by /portfolio-sync
└── CNAME           # custom domain config for GitHub Pages
```

## Adding / updating projects

Project data lives in `projects.json`. Each entry:

```json
{
  "id": "project-slug",
  "name": "Display Name",
  "description": "One or two sentences about what it does.",
  "tech": ["Tech1", "Tech2"],
  "github": "https://github.com/ryon137/repo",
  "status": "active | in-progress | complete",
  "featured": true,
  "lastUpdated": "YYYY-MM-DD"
}
```

The `/portfolio-sync` Claude Code skill updates this file automatically whenever a feature branch is created in any project repo. To trigger manually, run `/portfolio-sync` from within a Claude Code session.

## Deployment

Served via GitHub Pages on the `main` branch. Push to `main` and changes are live within ~30 seconds.

DNS is managed through DigitalOcean — `ryoncook.dev` points to GitHub Pages IPs.
