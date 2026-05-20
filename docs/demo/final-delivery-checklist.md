# Final delivery checklist (university / portfolio)

Use this list before the **~15 minute** presentation. Gameplay smoke details: [release-checklist.md](./release-checklist.md). Docker evidence: [../runtime/docker-validation.md](../runtime/docker-validation.md).

## Repository & GitHub

- [ ] `main` is the presentation branch; no WIP commits on demo machine
- [ ] README matches what you will show (raycast-first, no obsolete Arena menu path)
- [ ] Badges visible: CI + GitHub Pages (if used live)
- [ ] No secrets in repo (`.env`, tokens)
- [ ] Open PRs either merged or explicitly out of scope for the grade

## CI/CD

- [ ] Latest `CI` workflow green on `main` (`test`, `lint`, `build`, audit)
- [ ] `cd-pages.yml` green if demo uses GitHub Pages URL
- [ ] Screenshot or link to successful Actions run (for professor)

## Docker

- [ ] Docker Desktop running before class/demo
- [ ] Validated locally: `docker compose build`, `docker compose up -d`, `curl -I http://127.0.0.1:5173` → **200**
- [ ] Optional: `npm run docker:smoke` → exit **0**
- [ ] Can explain scope: **dev Vite in container**, not production backend

## Documentation

- [ ] [architecture.md](../architecture.md) — current scenes and modules
- [ ] [adrs/README.md](../adrs/README.md) — portfolio ADR index (0002–0007)
- [ ] [infra.md](../infra.md) — CI/CD, Docker, static deploy
- [ ] [docker-validation.md](../runtime/docker-validation.md) — dated validation log
- [ ] Demo scripts: [demo-script.md](./demo-script.md) (gameplay 3–5 min) + prepare **15 min** narrative (engineering + demo + Q&A)

## OpenAPI / backend / infra (justify to professor)

- [ ] **OpenAPI:** N/A — no HTTP API; static browser client. See note in [README](../../README.md) and [infra.md](../infra.md).
- [ ] **Backend:** N/A for shipped slice — `localStorage` via `SaveManager`; no Express/SQLite in runtime.
- [ ] **Infra:** GitHub Actions + GitHub Pages + Docker dev — documented in `docs/runtime/`.

## Demo readiness (gameplay)

- [ ] `npm ci && npm test && npm run lint && npm run build` green locally
- [ ] `npm run dev` — menu → prologue → raycast sector → combat → door/key → clear overlay
- [ ] Settings scene opens from menu (if showing input options)
- [ ] No red console errors during rehearsed path
- [ ] Pages URL tested if presenting deployed build (not only localhost)

## Demo 15 minutes (structure — prepare separately)

- [ ] **Pending:** single slide/doc `presentacion-15min.md` (engineering 5 min + live demo 5–7 min + Q&A)
- [ ] **Ready:** short gameplay script [demo-script.md](./demo-script.md) (3–5 min core loop)

## PDF / informe

- [ ] **Pending:** export [../final/portfolio-report.md](../final/portfolio-report.md) to PDF for submission (if required)
- [ ] **Ready:** Markdown corpus under `docs/` (architecture, ADRs, phases)

## Post-delivery (optional)

- [ ] Tag release `v0.x.x` if artifacts required
- [ ] Archive branch cleanup after merges
