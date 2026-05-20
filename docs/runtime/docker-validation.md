# Docker Validation Evidence

## Purpose

Reproducible validation that the project **runs in Docker** for local development and demos.

**Scope (important):** Docker here runs the **Vite dev server** (`npm run docker:dev`) inside `node:20-alpine`. It does **not** ship a production backend, database, or nginx production image. The playable product remains a **static browser client** built to `dist/` for GitHub Pages.

## Validation date

- **2026-05-20** (local run on `main` @ `0b466c3`, branch `docs/docker-validation-cleanup`)
- **Host:** macOS, Docker Desktop (daemon required before `docker compose`)

## Environment assumptions

- Docker Desktop installed and **running** (`docker info` succeeds).
- Commands executed from repository root.
- Host can reach `http://127.0.0.1:5173`.
- Port `5173` free on the host.

## Commands executed

```bash
# Quality gate (same as CI, pre-Docker)
npm ci
npm test
npm run lint
npm run build

# Docker image + service
docker compose build
docker compose up -d

# Automated smoke (build, up, curl, down via trap)
npm run docker:smoke

# Manual evidence capture
docker compose up -d
docker compose logs --tail=80
curl -I http://127.0.0.1:5173
docker compose down
```

## Expected vs obtained

| Step | Expected | Obtained |
|------|----------|----------|
| `docker compose build` | Image `doom-bin-bash-edition-game` builds without error | **PASS** — build completed (~36s first build) |
| `docker compose up -d` | Container `doom-bin-bash-game` running, port `5173:5173` | **PASS** — service `Up`, healthcheck starting |
| Vite inside container | `VITE v5.4.x ready`, listening `0.0.0.0:5173` | **PASS** — see logs excerpt below |
| `curl -I http://127.0.0.1:5173` | `HTTP/1.1 200 OK` | **PASS** |
| `npm run docker:smoke` | Script exits `0`, prints `OK: HTTP 200 received` | **PASS** — reachable on attempt 2 |
| `docker compose down` | Container and network removed | **PASS** |

### Log excerpt (Vite ready)

```text
doom-bin-bash-game  | > doom-bin-bash-edition@0.1.0 docker:dev
doom-bin-bash-game  | > vite --host 0.0.0.0 --port 5173
doom-bin-bash-game  |   VITE v5.4.21  ready in 174 ms
doom-bin-bash-game  |   ➜  Local:   http://localhost:5173/
doom-bin-bash-game  |   ➜  Network: http://172.23.0.2:5173/
```

### `curl -I` excerpt

```text
HTTP/1.1 200 OK
Content-Type: text/html
```

## What this proves

- Dependencies install with `npm ci` inside the image.
- The game dev server is reachable from the host through Docker port mapping.
- `scripts/docker-smoke.sh` is a one-command regression check for demos/CI-adjacent validation.

## What this does **not** prove

- Production cloud deploy (Kubernetes, Terraform, etc.).
- A dedicated game backend or API.
- OpenAPI / REST services (not applicable — static client only).
- Production nginx serving `dist/` inside Docker (use `npm run build` + `npm run preview:dist` or GitHub Pages for static preview).

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| `Cannot connect to the Docker daemon` | Docker Desktop stopped | Start Docker Desktop; wait until `docker info` works |
| Port `5173` already in use | Local `npm run dev` or old container | `docker compose down`; stop other Vite on 5173 |
| `wget` healthcheck fails on non-Alpine host | N/A — healthcheck runs **inside** container | Ensure image rebuilt after `Dockerfile` changes |
| Slow first `docker compose build` | Cold `npm ci` layer | Normal; rebuilds use cache |
| Smoke script stops container immediately | By design — `trap` runs `docker compose down` | Use `docker compose up` (foreground) for interactive play |

## Related files

- `Dockerfile` — `node:20-alpine`, `npm ci`, `CMD npm run docker:dev`
- `docker-compose.yml` — service `game`, volume mount, healthcheck `wget` on `5173`
- `package.json` — `docker:up`, `docker:smoke`, `docker:dev`
- [docker.md](./docker.md) — quick start for professors/reviewers

## Validation checklist (for delivery packet)

- [x] `docker compose build` succeeds
- [x] `docker compose up -d` + browser/curl returns **200**
- [x] `npm run docker:smoke` exits **0**
- [x] `docker compose down` cleans up
- [ ] Screenshot: terminal + browser at `http://127.0.0.1:5173` (optional evidence for professor)
