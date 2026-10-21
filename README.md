<p align="center">
  <img src="docs/assets/doombanner-cover.png" width="100%" alt="DOOM BIN BASH EDITION cover"/>
</p>

# doom-bin-bash-edition

**Browser-playable retro-horror raycast FPS** built with **Phaser 3**, **TypeScript**, and **Vite**. The **main product story** is **`RaycastScene`**: menu → settings (optional) → terminal prologue → **Episode 1** (five sectors + boss finale), optional **World 2** / **World 3** when progression allows, plus local **score / high score** and run summary via `SaveManager` (`localStorage`).

Modos de juego: la campaña principal es single-player (descrita abajo). El juego también incluye un modo cooperativo multijugador en LAN para hasta 3 jugadores — ver la sección Modo Multijugador Cooperativo (LAN).

**Engineering:** **Vitest** for core logic, **ESLint**, production **Vite** build, **GitHub Actions** CI.

**Media:** Reference captures live under `docs/assets/`; this README stays text-first. A concrete capture wishlist is in [`docs/demo/screenshots-plan.md`](docs/demo/screenshots-plan.md).

## Delivery Status

- ![CI](https://github.com/Hotzh3/doom-bin-bash-edition/actions/workflows/ci.yml/badge.svg) CI
- Release artifacts: available on version tags/manual workflow runs.
- CD - GitHub Pages configured for `dist/`; requires `Settings -> Pages -> Source: GitHub Actions`.

Expected Pages URL:

- [https://Hotzh3.github.io/doom-bin-bash-edition/](https://Hotzh3.github.io/doom-bin-bash-edition/)

Deployment docs:

- ![CD Pages](https://github.com/Hotzh3/doom-bin-bash-edition/actions/workflows/cd-pages.yml/badge.svg) GitHub Pages deploy

Runtime and delivery docs:

- [docs/runtime/docker.md](docs/runtime/docker.md)
- [docs/runtime/release-flow.md](docs/runtime/release-flow.md)
- [docs/runtime/deployment.md](docs/runtime/deployment.md)
- [docs/runtime/cicd-validation.md](docs/runtime/cicd-validation.md)
- [docs/demo/final-delivery-checklist.md](docs/demo/final-delivery-checklist.md) — pre-entrega universitaria / portfolio

---

## API, backend, and OpenAPI

- **Shipped game** — static **browser client** (Vite → `dist/`). Progression and settings use **`localStorage`** (`SaveManager`). **OpenAPI does not apply** to that client.
- **Game Master + Ollama (demo principal)** — **un solo comando** con Docker: `npm run dev:full` levanta Vite (`5173`), Express (`3001`) y **Ollama** en contenedor (`11434`). Modelo **`llama3.2:3b`** se descarga la primera vez y queda en volumen Docker. **Sin API keys ni OpenAI.** Si Ollama o el modelo fallan, el backend responde con **`source: fallback`** y el juego no se rompe.
- **Guía LLM (español):** [docs/llm/ollama-game-master.md](docs/llm/ollama-game-master.md) — arquitectura, `dev:full`, voz, curl, modo manual (3 terminales).
- **Not** the score/progression backend — see [docs/infra.md](docs/infra.md). Historical MVP server notes: [docs/adr/0001-stack-mvp.md](docs/adr/0001-stack-mvp.md).

---

## Disclaimer

Portfolio / learning project. Inspired by the **feel** of classic retro FPS; **not** affiliated with Doom or Doom 64. No reuse of their code, assets, maps, names, sprites, sounds, or copyrighted content.

## Clean-room boundary

No copied gameplay assets, maps, proprietary data, or reverse-engineered implementations. References are **high-level only** (movement clarity, strafe play, pacing, readable horror atmosphere). Layouts, tuning, names, and visuals here are original.

---

## Implemented today (honest scope)

What you can actually play and show:

| Area | What ships |
|------|------------|
| **Raycast renderer** | Column raycasting, procedural styling with **optional authored wall/door textures** (fallback to procedural if assets missing), atmosphere (fog, corruption tint), billboards for pickups/doors/exits, optional enemy/weapon sprites. |
| **Combat** | Hitscan weapons, damage feedback, enemy projectiles where authored, basic knockback/flash presentation hooks — **not** a full tactical sim. |
| **AI director** | `GameDirector` pacing (calm → pressure → ambush → recovery, etc.) tuned per level; spawns and tension staging. |
| **Encounters** | Authored beats, triggers, optional encounter-pattern hooks for variety — scope is **vertical slice**, not endless modes. |
| **Enemy roles** | Kinds: `GRUNT`, `STALKER`, `RANGED`, `BRUTE`, `SCRAMBLER`, `FLASHER` with different silhouettes/roles in raycast presentation. |
| **Boss** | Episode finale boss (e.g. **Volt Archon**) with phased fight and HUD strings; additional bosses in later worlds when reached. |
| **Score / high score** | Run scoring, medals/rank where implemented, **localStorage** persistence — **no** server backend. |
| **HUD / minimap** | Compact terminal-style HUD, objective line, combat strip, **M** minimap (see in-game help). |
| **World progression** | Episode 1 catalog → boss → optional **World 2** / **World 3** continuation when unlock flow allows (banners and atmosphere differ per arc). |
| **Multijugador (coop)** | Modo cooperativo PvE en LAN para hasta 3 jugadores sobre RaycastScene, servidor autoritativo a 20 Hz: jugadores/enemigos/combate/llaves/puertas/transición de nivel sincronizados; boss con vida y movimiento server-side. Ver sección dedicada. |
| **Input / settings** | Keyboard/mouse, gamepad, touch (where supported), `SettingsScene` for session prefs. |
| **Game Master (LLM)** | Optional **Ollama** narration on gameplay events; overlay subtitles; macOS `say` voice optional — see [docs/llm/ollama-game-master.md](docs/llm/ollama-game-master.md). |
| **Quality gate** | `npm test`, `npm run lint`, `npm run build` expected green in CI and before releases. |

**Legacy note:** `ArenaScene` source remains for unit/regression references but is **not registered** in `gameConfig.scene` — it is **not** reachable from the current menu. Do not demo it unless re-wired intentionally.

## Ranking and mastery marks

- Rank tiers in run summary: `D`, `C`, `B`, `A`, `S`, `SS`.
- Rank evaluation blends time, accuracy, damage taken, secrets, tokens, regen usage, retries/deaths, and boss arena performance (when boss data exists).
- Compact mastery marks shown in summary include:
  - `NO DAMAGE`
  - `SPEED CLEAR`
  - `FULL ACCURACY`
  - `ALL SECRETS`
  - `NO REGEN USED`
  - `FULL INTEL`
  - `BOSS BREAKER`
  - `CLEAN RUN`

## Optional pre-run modifier roulette

Before starting a raycast run/world (Prologue), roulette is optional:

- `M`: cycle modifiers
- `R`: roll random modifier
- `N`: clear (play with no modifier)
- `SPACE/ENTER`: accept and start

Current roulette options:

1. `DOUBLE DAMAGE / LOW HP`
2. `FAST ENEMIES / MORE SCORE`
3. `NO REGEN / HIGHER RANK BONUS`
4. `GLASS CANNON`
5. `TREASURE SIGNAL`
6. `OVERCLOCKED`
7. `HUNTER MARK`
8. `DARK ROUTE`

## Demo profesional (Game Master + Ollama)

**Requisito:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) en ejecución.

```bash
npm ci
npm run dev:full
```

Abre [http://localhost:5173](http://localhost:5173). La primera vez, el servicio **ollama-bootstrap** puede tardar varios minutos descargando **`llama3.2:3b`**; después queda cacheado en el volumen `ollama_data`.

| Servicio | URL |
|----------|-----|
| Juego (Vite) | http://localhost:5173 |
| Game Master | http://localhost:3001/health |
| Ollama | http://localhost:11434/api/tags |

Comandos útiles:

```bash
npm run dev:full:logs    # seguir logs
npm run dev:full:smoke   # comprobar 5173 / 3001 / 11434 (con stack arriba)
npm run dev:full:down    # apagar contenedores
```

- **Ollama** corre en contenedor (`OLLAMA_BASE_URL=http://ollama:11434` en el backend).
- **No** hay API keys ni secretos en el repo.
- Tras descargar el modelo, **no** hace falta internet para narrar.
- Si Ollama falla → `source: fallback` en la API; el FPS sigue.

Modo manual (sin Compose): ver [docs/llm/ollama-game-master.md](docs/llm/ollama-game-master.md).

## Modo Multijugador Cooperativo (LAN)

Modo **cooperativo PvE** sobre `RaycastScene`: hasta **3 jugadores** en red local recorren juntos la campaña completa (13 niveles en 3 mundos, incluyendo bosses). Arquitectura **cliente-servidor con servidor autoritativo** a **20 Hz**.

### Arquitectura

El servidor multijugador vive en el **mismo proceso** que el Game Master: Express (narración Ollama) y un **WebSocket server** comparten el puerto **3001**. El servidor mantiene el estado autoritativo del mundo (jugadores, enemigos, llaves, puertas, triggers, boss) y emite *snapshots* a todos los clientes cada 50 ms; los clientes envían su input y el servidor valida y resuelve la lógica.

| Carpeta | Rol |
|---------|-----|
| `server/` | Servidor autoritativo: tick loop 20 Hz, estado del mundo, transiciones de nivel, AI de enemigos y boss server-side. |
| `shared/` | Tipos y constantes compartidos cliente/servidor (protocolo WebSocket, tick rate, puerto). |
| `src/game/net/` | Cliente WebSocket dentro de Phaser: conexión, snapshots, reconexión entre niveles. |

### Cómo funciona la conexión

1. El cliente abre un WebSocket a `ws://<ip>:3001` y manda un `hello`.
2. El servidor responde con un `welcome` (id de jugador, nivel actual, config).
3. A partir de ahí: el servidor manda `snapshot` (estado del mundo) a 20 Hz; el cliente manda su `input`/`shoot` (también throttleado a 20 Hz).
4. El servidor es la **única fuente de verdad**: valida disparos, aplica daño, detecta recogida de llaves/apertura de puertas por proximidad, y coordina las transiciones de nivel (cuando un jugador llega al exit, **todos** avanzan juntos).

### Cómo correrlo (local)

En **dos terminales** (no hay script único sin Docker):

```bash
# Terminal 1 — servidor coop (Express + WebSocket en :3001)
npm run server:dev

# Terminal 2 — cliente (Vite en :5173)
npm run dev
```

En el menú, presiona M y escribe la dirección del servidor en formato IP:puerto (default localhost:3001). Se te asigna un nombre automático.

### Cómo probar en LAN (varias máquinas)

```bash
# 1. Encuentra la IP de la máquina que corre el servidor
ipconfig getifaddr en0        # macOS Wi-Fi

# 2. Cliente accesible en la red
npm run dev -- --host         # Vite expone http://<ip>:5173
```

Los demás jugadores abren http://<ip>:5173, presionan M y escriben <ip>:3001. El servidor ya acepta conexiones de rangos LAN privados (validación de Origin en server/src/index.ts). En macOS, permite las conexiones entrantes de node si el firewall lo pide. Si la red institucional aísla a los clientes entre sí, usa un hotspot propio.

### Qué se sincroniza (autoritativo en el servidor)

- Posición de jugadores y jugadores remotos visibles entre sí.
- Enemigos (AI, daño, muertes), director de spawns y triggers.
- Combate: disparos validados server-side.
- Llaves, puertas y triggers compartidos (detección por proximidad).
- Transición de nivel coordinada (Modelo B: un jugador en el exit → todos avanzan).
- Boss: vida compartida, movimiento y rotación de objetivo server-side.

### Decisiones de diseño

- Servidor autoritativo: el cliente nunca decide daño ni progreso; evita desincronización y trampas. El movimiento del jugador es client-authoritative (responsividad) pero todo lo demás lo valida el servidor.
- Modelo B de transición: cualquier jugador que llega al exit teletransporta a todo el equipo al siguiente nivel (revive a los caídos). La conexión WebSocket se preserva entre niveles vía el registry de Phaser, sin reconectar.
- LAN-only: validación de Origin acepta localhost y rangos privados (RFC-1918), rechaza IPs públicas.

### Limitaciones conocidas / mejoras futuras

- Proyectiles del boss: los ataques (volleys) aún se simulan localmente en cada cliente; el boss apunta al mismo objetivo para todos, pero los proyectiles individuales no están sincronizados. Pendiente: simulación determinista server-side.
- Narración del Game Master en coop: actualmente cada cliente narra local; pendiente narración compartida de eventos globales.
- Secretos y botiquines: per-jugador (no compartidos), por diseño.

---

Atajo de desarrollo: las teclas 4 / 5 / 6 saltan directamente al boss de World 1 / 2 / 3 (en coop, el servidor lleva a todos juntos). Es una herramienta de debug para pruebas; no forma parte del flujo normal de juego.

## Docker Quick Start (solo frontend)

Prerequisite: Docker Desktop running.

```bash
docker compose up --build
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). Stop: `docker compose down`.

More details: [docs/runtime/docker.md](docs/runtime/docker.md), [docs/runtime/docker-validation.md](docs/runtime/docker-validation.md).

Badge check: pull shark 1.
