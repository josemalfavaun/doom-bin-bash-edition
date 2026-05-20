# Architecture (current — raycast-first)

This document describes `src/game/` as oriented today: **`RaycastScene` is the main experience**, support scenes handle menu/settings/prologue/gating, and raycast code is grouped by domain under `src/game/raycast/`.

## Principles

1. **Raycast as the product:** compact episode, data-driven levels, pure logic where it keeps tests cheap.
2. **Legacy code isolated:** `ArenaScene` remains in the tree for historical tests only — it is **not** booted in `gameConfig.scene` today.
3. **Tests on critical logic:** combat, level graph, director, objectives, episode progression — without requiring a live Phaser canvas for the bulk of assertions.

## Scenes (`game/scenes/`)

| Scene | Role |
|-------|------|
| `MenuScene` | Entry: start prologue, difficulty, settings, boss shortcuts. |
| `SettingsScene` | Session input prefs (gamepad/touch), persisted locally. |
| `PrologueScene` | Terminal narrative beat before Episode 1. |
| `RaycastScene` | Main FPS loop: raycast render pass, enemies, HUD, pause, minimap, boss, transitions between sectors/worlds. |
| `RaycastWorldLockedScene` | UX when a world is gated by build/config. |
| `ArenaScene` | **Legacy (not booted):** 2D sandbox code kept for tests; not in `gameConfig.scene`. |

There is no separate `BootScene` in the documented flow; Phaser boots and hands off to the menu as configured in the game entry.

## Raycast (`game/raycast/`)

Representative modules (not exhaustive):

| Module | Responsibility |
|--------|----------------|
| `RaycastMap.ts` | Grid, geometric ray cast, wall types / tiles. |
| `RaycastLevel.ts` | Level types, **Episode 1** sectors + boss, `RAYCAST_LEVEL_CATALOG`, helpers (`getRaycastLevelById`, reachability, etc.). |
| `RaycastWorldTwoLevels.ts` | **World 2** level data and `RAYCAST_WORLD_TWO_CATALOG` (four sectors). |
| `RaycastWorldThreeLevels.ts` | **World 3** data and `RAYCAST_WORLD_THREE_CATALOG` (three sectors + boss flow as authored). |
| `RaycastRenderer.ts` | Per-column wall rendering (optional authored wall/door textures + procedural fallback), sky/floor bands, atmosphere blending, billboards, enemy/weapon sprites when present. |
| `RaycastVisualTheme.ts`, `RaycastPalette.ts`, `RaycastAtmosphere.ts` | Zone themes, fog, corruption tint, world-segment atmosphere, procedural wall/ground accents. |
| `RaycastMinimap.ts` | 2D minimap derived from map + player state. |
| `RaycastHud.ts`, `RaycastPauseMenu.ts`, `RaycastPresentation.ts` | HUD copy, overlays, difficulty strings, banners. |
| `RaycastRunSummary.ts` | End-of-run / sector summary presentation (score, rank, timing). |
| `RaycastEpisode.ts` | Episode progression, next level, world unlock wiring (with scene glue). |
| `RaycastEnemy.ts`, `RaycastEnemySystem.ts`, `RaycastCombatSystem.ts`, `RaycastMovement.ts` | FPS combat and movement. |
| `RaycastBoss.ts` | Boss state and arena behaviour as authored. |
| `RaycastEncounterDirector.ts` | Raycast-side encounter selection / bindings (works with director state). |

## Shared systems (`game/systems/`)

| Area | Notes |
|------|--------|
| `GameDirector.ts` | Pacing state machine; intensity and spawn pressure for raycast levels that enable it. |
| `EncounterPattern.ts` / `DirectorEvents.ts` | Optional authored spawn patterns consumed by the director. |
| Audio, input, weapon types | Shared with raycast where applicable. |

## Backend / OpenAPI

None for the shipped slice: **high score, settings, and run metadata are local** (`SaveManager` / `localStorage`). **OpenAPI does not apply** (no HTTP API). Historical MVP docs that mention Express/SQLite are not implemented — see [adr/0001-stack-mvp.md](./adr/0001-stack-mvp.md) (historical).

## Tests (`src/tests/`)

- **Raycast:** `raycast-*.test.ts` (map, combat, HUD, episode, atmosphere, presentation, …).
- **Director / encounters:** `game-director.test.ts`, `encounter-pattern.test.ts`, `raycast-encounter-director.test.ts`, etc.
- **Boss / scoring:** `raycast-boss.test.ts`, `raycast-score.test.ts`, …

Run: `npm test` (see `package.json`). Prefer keeping new gameplay logic testable without full scene boot.

## Doc history

- Academic arena roadmap: `docs/roadmap.md` (historical).
- Runtime budget / phases: `docs/phases/phase-21-runtime-budget.md` and later phase files.
- Index: **[docs/README.md](./README.md)**.
