export const OLLAMA_GENERATE_URL = 'http://localhost:11434/api/generate';
export const OLLAMA_MODEL = 'llama3.2:3b';
export const OLLAMA_TIMEOUT_MS = 15_000;

export interface NarrateRequest {
  context?: string;
  event?: string;
}

export interface NarrateResponse {
  message: string;
  source: 'ollama' | 'fallback';
}

const FALLBACK_MESSAGES: readonly string[] = [
  'La estación cruje. Algo se mueve en la penumbra—no pierdas el ritmo.',
  'Señal débil, pulso fuerte. Avanza: el corredor no se va a limpiar solo.',
  'El polvo del búnker sabe tu nombre. Dispara primero, pregunta después.',
  'Eco metálico a la izquierda. Si era enemigo, ya lo sentiste; si no, sigue.',
  'El terminal parpadea rojo. La misión sigue viva mientras tú respires.',
  'Silencio de radio, ruido de dientes. Eso no es viento—es hambre.',
];

export function pickFallbackMessage(seed = Date.now()): string {
  const index = Math.abs(seed) % FALLBACK_MESSAGES.length;
  return FALLBACK_MESSAGES[index] ?? FALLBACK_MESSAGES[0];
}

export function buildGameMasterPrompt(body: NarrateRequest): string {
  const context = body.context?.trim() || 'sector hostil, terminal dañado';
  const event = body.event?.trim() || 'el jugador avanza con cautela';

  return [
    'Eres el Game Master de un FPS retro raycast en español (México).',
    'Responde en UNA sola línea (máx. 22 palabras), tono tensión arcade/horror.',
    'Sin listas, sin emojis, sin romper la cuarta pared.',
    `Contexto: ${context}.`,
    `Evento: ${event}.`,
    'Narración:',
  ].join(' ');
}

function trimModelReply(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, 220);
}

export async function callOllama(prompt: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(OLLAMA_GENERATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { response?: string };
    const message = data.response?.trim();
    return message ? trimModelReply(message) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function narrate(body: NarrateRequest = {}): Promise<NarrateResponse> {
  const prompt = buildGameMasterPrompt(body);
  const ollamaMessage = await callOllama(prompt);

  if (ollamaMessage) {
    return { message: ollamaMessage, source: 'ollama' };
  }

  return { message: pickFallbackMessage(), source: 'fallback' };
}
