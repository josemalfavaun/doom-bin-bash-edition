# Ollama Game Master (backend local)

Servidor Express opcional que genera líneas de narración estilo **FPS retro** en español (México). El cliente del juego (`http://localhost:5173`) puede consumirlo más adelante; **el gameplay actual no depende de este servicio**.

## Requisitos

- [Ollama](https://ollama.com/) en marcha en el host: `http://localhost:11434`
- Modelo descargado: `ollama pull llama3.2:3b`
- Node.js 20+ (mismo toolchain del repo)

## Arranque

```bash
npm run server:dev
```

Escucha en **`http://localhost:3001`** con CORS permitido solo para **`http://localhost:5173`**.

## Endpoints

### `GET /health`

```json
{ "ok": true }
```

### `POST /api/game-master/narrate`

**Body (JSON, opcional):**

```json
{
  "context": "sector 2, puerta sellada",
  "event": "el jugador recoge la llave roja"
}
```

**Respuesta:**

```json
{
  "message": "Una línea de narración…",
  "source": "ollama"
}
```

| Campo | Valores |
|-------|---------|
| `source` | `"ollama"` si Ollama respondió; `"fallback"` si hubo error, timeout o respuesta vacía |

**Fallback:** mensajes locales precargados (sin red) cuando Ollama no está disponible.

## Integración con Ollama

- URL: `http://localhost:11434/api/generate`
- Modelo: `llama3.2:3b`
- `stream: false`
- Timeout del servidor: 15 s

## Alcance y límites

- **No** es API de producción ni persistencia de partida.
- **No** sustituye HUD, director de encuentros ni lógica de combate.
- OpenAPI del juego principal sigue sin aplicar al cliente estático; este es un **microservicio de narración** aparte.

## Prueba manual

```bash
curl -s http://localhost:3001/health

curl -s -X POST http://localhost:3001/api/game-master/narrate \
  -H 'Content-Type: application/json' \
  -d '{"context":"búnker oscuro","event":"disparo a la puerta sellada"}'
```

## Archivos

| Archivo | Rol |
|---------|-----|
| `server/src/index.ts` | Express, CORS, rutas |
| `server/src/gameMaster.ts` | Prompt, llamada Ollama, fallback |
| `package.json` | script `server:dev` |
