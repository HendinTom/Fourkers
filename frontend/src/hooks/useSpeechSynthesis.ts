import { useCallback } from 'react';

// Module-level timer: all useSpeechSynthesis instances share one pending speech slot.
// This prevents overlapping playback and ensures "Hear again" always works reliably.
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
    if (ttsAvailable) window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback(
    (text: string): void => {
      if (!ttsAvailable || !text.trim()) return;
      // Cancel any pending or running speech
      if (pendingTimer !== null) clearTimeout(pendingTimer);
      window.speechSynthesis.cancel();
      // 150 ms delay gives Chrome's cancel() time to settle — key reliability fix
      pendingTimer = setTimeout(() => {
        pendingTimer = null;
        const u = new SpeechSynthesisUtterance(text.trim());
        u.rate = 0.88;
        u.pitch = 1.0;
        u.lang = 'en-CA';
        window.speechSynthesis.speak(u);
      }, 150);
    },
    []
  );

  return { speak, cancel, supported: ttsAvailable };
}
