# Release checklist

Lista antes de un **demo en vivo**, **tag**, **PR grande** o **actualización del README con capturas**.

---

## Comandos obligatorios (CI local)

Ejecutar en la raíz del repo:

```bash
npm test
npm run lint
npm run build
```

(`npm run test` es equivalente si tu `package.json` define el script `test`.)

---

## Smoke manual (raycast — flujo principal)

- [ ] `npm run dev` — arranque sin errores fatales en terminal.
- [ ] Menú: iniciar **raycast** (**A** / modo 3D).
- [ ] Prólogo: avanzar al primer sector.
- [ ] Movimiento, mirada, disparo, cambio de arma **1–3**.
- [ ] **Pickup** de llave/token, **puerta** bloqueada que abre, al menos un **trigger** o combate con director perceptible.
- [ ] **Minimapa** (**M**) y lectura básica del **HUD** (vida, objetivo).
- [ ] **Salida** de sector o progresión hasta overlay de **clear**; **N** / **R** / **ESC** según copy en pantalla.
- [ ] (Opcional pero recomendable) Llegar o cargar **boss** y comprobar que no rompe el flujo.
- [ ] (Opcional) Tras boss: **continuar** hacia **World 2** y verificar banner / entrada si lo vas a mostrar en demo.

## Legacy Arena (opcional — solo si re-registras `ArenaScene` en `gameConfig`)

- [ ] `ArenaScene` **no** está en el menú del build actual — omitir en demo de entrega salvo re-wire explícito.

## Navegador

- [ ] Abrir DevTools una vez: sin errores rojos persistentes en consola durante el smoke.
- [ ] Sin 404 de assets locales críticos (red → filtro “failed”).

---

## Capturas y media (si toca release visual)

- [ ] Revisar [screenshots-plan.md](./screenshots-plan.md) o [../assets/screenshots/SHOT_LIST.md](../assets/screenshots/SHOT_LIST.md).
- [ ] Confirmar que los archivos referenciados en README **existen** en `docs/assets/…`.
- [ ] Tras `npm run capture:media` (si lo usas): revisar tamaños y nitidez; boss/clear manual si aplica.

---

## Mensaje clean-room (público)

- [ ] Describir el proyecto como **FPS raycast retro horror original**.
- [ ] Inspiración = **sensación** de clásicos, **sin** contenido ni marcas de terceros.
- [ ] No afirmar paridad con Doom / Doom 64 ni mostrar assets ajenos como propios.

---

## Checklist de PR (equipo / portfolio)

- [ ] Objetivo del cambio acotado; sin mecánicas grandes “de paso”.
- [ ] `npm test`, `npm run lint`, `npm run build` en verde.
- [ ] Si hay copy de usuario o UI: revisión rápida de tono (terminal / horror).
- [ ] Si hay cambio visual fuerte: considerar nueva captura o nota en `screenshots-plan.md` / SHOT_LIST.
- [ ] Documentación enlazada: `docs/README.md` y README raíz si añades rutas nuevas.

---

## Enlaces útiles

- Demo corto: [demo-script.md](./demo-script.md)
- Demo extendido: [raycast-demo-script.md](./raycast-demo-script.md)
- Plan de capturas: [screenshots-plan.md](./screenshots-plan.md)
- Arquitectura: [../architecture.md](../architecture.md)
- Índice docs: [../README.md](../README.md)
