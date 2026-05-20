import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildGameMasterPrompt,
  callOllama,
  narrate,
  pickFallbackMessage,
} from '../../server/src/gameMaster';

describe('game master', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('buildGameMasterPrompt uses defaults when fields are empty', () => {
    const prompt = buildGameMasterPrompt({});
    expect(prompt).toContain('español (México)');
    expect(prompt).toContain('sector hostil');
    expect(prompt).toContain('el jugador avanza');
  });

  it('buildGameMasterPrompt embeds context and event', () => {
    const prompt = buildGameMasterPrompt({
      context: 'pozo volt',
      event: 'boss al 30%',
    });
    expect(prompt).toContain('pozo volt');
    expect(prompt).toContain('boss al 30%');
  });

  it('pickFallbackMessage returns a non-empty string', () => {
    expect(pickFallbackMessage(0).length).toBeGreaterThan(10);
    expect(pickFallbackMessage(1)).not.toBe(pickFallbackMessage(0));
  });

  it('callOllama returns null when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await expect(callOllama('test')).resolves.toBeNull();
  });

  it('callOllama returns trimmed response on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ response: '  La puerta   tiembla.  ' }),
      }),
    );
    await expect(callOllama('x')).resolves.toBe('La puerta tiembla.');
  });

  it('narrate uses fallback when Ollama is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    const result = await narrate({ event: 'prueba' });
    expect(result.source).toBe('fallback');
    expect(result.message.length).toBeGreaterThan(5);
  });

  it('narrate uses ollama when model responds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ response: 'El pasillo respira óxido.' }),
      }),
    );
    const result = await narrate({ context: 'sector 1' });
    expect(result).toEqual({
      message: 'El pasillo respira óxido.',
      source: 'ollama',
    });
  });
});
