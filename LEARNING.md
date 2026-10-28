<!-- Learning log: one line per concept, grouped by session. Source for future "Build log" posts. -->
# Learning log

## Session 1: Monday 28 September 2026 (Monday block, Phase 0)

Shipped: holding page live at https://rufusspiller.com (www redirects to it).

- A static site generator compiles content into plain HTML, like Flash compiling a .fla into a .swf. Git snapshots versions, GitHub stores them, Cloudflare builds and serves on push.
- Silence means success in the terminal. Commit author name and email are public in a public repo, so use a real name and GitHub's no-reply email.
- Astro uses file-based routing (src/pages/x.astro becomes /x). public/ is copied as-is. Code between the --- fences runs at build time, not in the visitor's browser, and the fences must start at the left edge.
- git status shows what's uncommitted; "working tree clean" means everything is saved. File names in URLs must match exactly, so avoid spaces.
- Terminal is always "busy" or "ready". Ctrl+C stops most running things, q exits a scrolling list, Esc then :q! exits the vim editor.
- A remote (origin) is where pushes go. Every push to main is a deploy.
- Cloudflare Workers serves the static site using wrangler.jsonc, which points it at dist/. Only give third-party apps access to the specific repos they need.
- Deleting a file doesn't remove it from Git history; anything committed to a public repo should be treated as published.
- Registered rufusspiller.com via Cloudflare Registrar (at cost). A custom domain on a Worker handles DNS and HTTPS automatically when the domain is in the same Cloudflare account.
- www is a separate subdomain. Pick one canonical address and 301-redirect the other so links and search results don't split.
- DNS records can be proxied (orange cloud, traffic passes through Cloudflare so rules apply) or DNS only. Dashboard warnings can be wrong; check the actual records.
- DNS failures get cached too. After adding a record, "not working" on your own machine can be a stale cache; check from another network before changing settings.
- Typographic holding page: CSS Grid (12 columns, grid-column spans), subgrid to draw guides that match the real grid, custom properties as design tokens, clamp() and min() for fluid type, mix-blend-mode: multiply for an overprint effect. Contrast checked: red #c8201a is 5:1 on the paper colour.
- CV page at /cv/: a folder with index.astro becomes a clean URL. Content kept as data (arrays of objects) in the frontmatter and looped with .map(), so adding a role means adding one object. Shared styles moved to src/styles/base.css and imported by each page. Scoped <style> in Astro applies only to that page. A @media rule switches the layout at tablet width; a print rule tidies it for paper.
- Data Visualisations section (/data-visualisations/ and /data-visualisations/bjj/): JSON files in src/data/ are imported into an Astro page at build time, handed to a small inline script through a JSON script tag (set:html), and the script draws the month grid in the browser. SVG symbol plus use defines each shape once and reuses it, which keeps the page small. An element with the hidden attribute still shows if another rule sets its display, so the page adds [hidden] { display: none !important }.
- A small Astro component (src/components/LastUpdated.astro) takes a prop (the date) and renders the same "Last updated" line on every page, like a Flash symbol with a parameter. The time element carries a machine-readable date (datetime) next to the readable one. A page's scoped styles can reach into a component with :global(), used here to place the line in the CV's print layout.
