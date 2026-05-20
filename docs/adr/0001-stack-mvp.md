# ADR 0001: Stack técnico para MVP

> **Histórico (MVP inicial).** El runtime actual es raycast-first en navegador, sin Express/SQLite. Para el stack vigente ver [adrs/0002-raycast-architecture.md](../adrs/0002-raycast-architecture.md) y [architecture.md](../architecture.md).

## Estado
Accepted (superseded in part — backend opcional no implementado)

## Contexto
Se requiere demo funcional en < 1 mes con equipo junior de 3 personas.

## Decisión
- Phaser 3 + TypeScript + Vite para juego.
- Node/Express + SQLite opcional para estadísticas.
- Vitest + ESLint + Prettier.
- Docker Compose y GitHub Actions.

## Consecuencias
- Desarrollo rápido y bajo costo cognitivo.
- Buen soporte para 2D arcade.
- Se evita sobreingeniería de red/online hasta estabilizar MVP local.
