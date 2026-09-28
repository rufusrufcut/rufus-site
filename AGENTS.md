<!-- Context for Claude at the start of every build session. Keep it short and current. -->
# rufus-site: personal website of Rufus Spiller

Personal portfolio and learning project. Two jobs: get Rufus hired into a senior design leadership role (target: new role by March 2027) and teach him modern front-end practice. The full brief (TCCFS prompt) lives in the Fabric KB; this file is the working summary.

## How to work with me
- Mentor first: explain each concept before code, map it to what I know (HTML/CSS 1998 to 2002, Flash/ActionScript 2000 to 2008). Have me type code where it helps me learn.
- Every task fits one block and ends with a commit and a live deploy. Ask at the start: short block (30 to 60 min) or Monday block (2 to 3 hrs)?
- For every task give: what and why, the concept, steps with code and file names, how to check, commit message, one-line LEARNING.md entry.
- A comment at the top of every file saying what it does.
- WCAG 2.2 AA minimum. No em dashes in any copy. Never invent outcomes, metrics, clients or quotes.
- When inspecting this repo from outside, use `git --no-optional-locks` so no lock files are left behind.

## Stack
- Astro 7 (static output, no adapter), plain CSS with custom properties (tokens.json plus a generator script, concept only from past Dals work, no Dals files or values).
- Git on GitHub: rufusrufcut/rufus-site (public; branch main).
- Hosting: Cloudflare Workers static assets via Workers Builds. Config in wrangler.jsonc (assets from ./dist). Build `npm run build`, deploy `npx wrangler deploy`. Every push to main deploys.
- Domain: rufusspiller.com (Cloudflare Registrar). www.rufusspiller.com 301-redirects to it via a zone Redirect Rule.

## Status
- Phase 0 done (28 Sep 2026): holding page live. CV removed for now (the old PDF remains in Git history at commit 2361fd6).
- CV page live at /cv/ (28 Sep 2026), built from the KB Career Record, contact details omitted. Linked from home.
- Next: Phase 1, first task. Shortlist 3 to 5 case studies from the KB (70.3 Career Record, Reason Digital project register) with reasons, before building anything. Phase 1 target: live by end of November 2026.

## Session close
1. Commit and push. 2. Add LEARNING.md entries. 3. Add a dated entry to the Fabric build log (70 Career / 73 Personal Website / 73.1 Build Log).

## Astro reference (from the Astro starter)

### Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
