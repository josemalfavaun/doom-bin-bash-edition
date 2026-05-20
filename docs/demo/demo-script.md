# Demo script (3–5 minutos) — GitHub / portfolio

Guía corta para grabar o presentar el proyecto. **Modo principal:** raycast FPS (`RaycastScene`). Para tabla detallada, línea de pitch y variante ~10 min, ver también [raycast-demo-script.md](./raycast-demo-script.md).

**Entorno:** `npm ci` → `npm run dev` → abrir la URL de Vite (p. ej. `http://localhost:5173`).

---

## Objetivo del demo

Mostrar un vertical slice **jugable de punta a punta**: menú → prólogo → sector con combate y progresión → (opcional) boss y resumen de run → (opcional) teaser World 2, sin prometer mecánicas que no enseñes en pantalla.

**Duración objetivo:** 3–5 minutos.

---

## Orden recomendado

1. **Menú (`MenuScene`)**
   - Indicar que **A / “3D mode”** (o equivalente en pantalla) es el producto principal.
   - Opcional: **D** para ciclar dificultad; abrir **Ajustes** si quieres mostrar gamepad/touch.
   - **No** prometer modo Arena 2D desde el menú — `ArenaScene` no está registrada en el build actual (código legado solo para tests).

2. **Prólogo (`PrologueScene`)**
   - Leer una línea del tono terminal / horror; **continuar** al episodio.

3. **Raycast mode (`RaycastScene`)**
   - Movimiento **WASD**, mirada ratón / **Q** **E** / flechas, disparo **F** / espacio / clic, armas **1–3**.
   - Señalar la línea de **objetivo** / estado en HUD.

4. **Combate**
   - Un encuentro corto: lectura de enemigos, retroalimentación de daño, mensajes de combate si aparecen.
   - Sin forzar explicación de cada rol; basta “hay presión y variedad de siluetas”.

5. **Minimap / HUD**
   - Abrir minimapa (**M** por defecto en ayuda) si aplica.
   - Mencionar vida, arma, mensajes de sistema — **compacto**, no un simulador completo de RPG.

6. **Secreto / llave / puerta**
   - Mostrar **token** (pickup) → **puerta** que requiere llave → **salida** o siguiente beat, según el sector.
   - Si el tiempo aprieta: una sola puerta + un secreto opcional “si está en la ruta”.

7. **Boss (si hay tiempo)**
   - **Episode 1** culmina en pelea de boss (p. ej. Volt Archon); enseñar fases / telegráficos a alto nivel.
   - Si no da tiempo en 3 min, saltar con una toma pregrabada o mencionar “finale en sector boss”.

8. **Score / run summary**
   - Tras sector claro o hitos: **overlay** con puntuación, tiempo, rango/medallas si están visibles; **high score** local (**localStorage**).
   - Objetivo mastery: lograr **S/SS en todos los sectores del arco completo** para desbloquear **True Signal ending**, final secreto y hook de **Impossible Mode**.
   - **N** para continuar cuando el overlay lo permita; **R** reinicia sector; **ESC** vuelve al menú.

9. **World 2 teaser**
   - Tras boss de Ep. 1, si el flujo lo permite: **N** hacia **World 2** (banner “abyss stratum” / copy fría vs forja).
   - Enseñar **solo** entrada + un vistazo breve o menú de continuación; no hace falta completar un sector W2 en vivo.

---

## Control rápido (presentador)

| Acción | Tecla / nota |
|--------|----------------|
| Raycast: mover | WASD |
| Mirar | Ratón, Q/E, flechas |
| Disparar | F, espacio, clic |
| Armas | 1–3 |
| Mapa | M (ver ayuda **H** / **?**) |
| Reiniciar sector | R |
| Siguiente (overlay) | N |
| Menú | ESC |
| Debug | TAB (mejor apagado en demo) |

---

## Checklist post-demo (30 s)

- Sin errores graves en consola durante el recorrido mostrado.
- Quedó claro que **raycast** es el único modo jugable en el menú actual.
- Se vio al menos una de: **progresión llave/puerta** o **combate** + **HUD**.

---

## Capturas y GIFs

Lista de tomas sugeridas: [screenshots-plan.md](./screenshots-plan.md). Detalle técnico y regeneración: [../assets/screenshots/SHOT_LIST.md](../assets/screenshots/SHOT_LIST.md).

