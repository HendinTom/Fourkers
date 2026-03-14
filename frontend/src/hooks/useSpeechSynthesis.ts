import { useCallback } from 'react';

// Module-level pending timer — shared across all instances so only one utterance queues at a time
let pendingTimer: ReturnType<typeof setTimeout> | null = null;

const ttsAvailable =
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  'SpeechSynthesisUtterance' in window;

export function useSpeechSynthesis() {
  const cancel = useCallback((): void => {
    if (pendingTimer !== null) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }
    if (ttsAvailable) {
      try { window.speechSynthesis.cancel(); } catch (_) { /* ignore */ }
    }
  }, []);

  const speak = useCallback((text: string): void => {
    if (!ttsAvailable || !text.trim()) return;

    // Clear any already-queued speak
    if (pendingTimer !== null) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }

    try {
      // Cancel whatever is playing
      window.speechSynthesis.cancel();

      // Chrome/mobile bug: synthesis can get stuck in "paused" state.
      // Calling resume() before speaking fixes silent failures.
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (_) { /* ignore */ }

    // 250 ms gives cancel() time to fully settle before the new utterance
    pendingTimer = setTimeout(() => {
      pendingTimer = null;
      try {
        const u = new SpeechSynthesisUtterance(text.trim());
        u.rate   = 0.85;
        u.pitch  = 1.0;
        u.volume = 1.0;
        u.lang   = 'en-CA';
        window.speechSynthesis.speak(u);
      } catch (_) { /* ignore — browser may block without user gesture */ }
    }, 250);
  }, []);

  return { speak, cancel, supported: ttsAvailable };
}
