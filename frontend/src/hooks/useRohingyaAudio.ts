import { useCallback, useState } from 'react';
import type { AudioEntry } from '../types/audio';

/**
 * ROHINGYA AUDIO ENGINE
 * =====================================================================
 * Playback priority for every AudioEntry:
 *
 *   1. Prerecorded Rohingya audio file  (entry.rohingyaSrc !== null)
 *      ► Place .mp3 files in:  /public/audio/rohingya/
 *
 *   2. Browser Rohingya TTS voice  (voice.lang starts with "rhg")
 *      ► Rare in current browsers — included for future support.
 *
 *   3. DEMO_MODE English TTS  (only when DEMO_MODE = true)
 *      ► Speaks entry.labelEn in English so the demo feels functional.
 *      ► ⚠  SET DEMO_MODE = false IN PRODUCTION.
 *         English speech will then be suppressed; real Rohingya audio
 *         or TTS must be provided before the button makes any sound.
 *
 *   4. Silent — button still animates, no crash.
 *
 * ADDING REAL ROHINGYA AUDIO (step-by-step):
 *   1. Record a .mp3 with a Rohingya speaker or translator.
 *   2. Copy the file to:  frontend/public/audio/rohingya/<name>.mp3
 *   3. In audioGuide.ts or lessons.ts, set:
 *        rohingyaSrc: '/audio/rohingya/<name>.mp3'
 *   4. Set DEMO_MODE = false to stop English TTS fallback.
 * =====================================================================
 */

// ← CHANGE TO false IN PRODUCTION (disables English TTS fallback)
const DEMO_MODE = true;

// ISO 639-3 code for Rohingya; BCP 47 tag used in browser voices
const ROHINGYA_LANG = 'rhg';

// ── Module-level playback state (one audio stream at a time app-wide) ──
let activeHtmlAudio: HTMLAudioElement | null = null;
let pendingTtsTimer: ReturnType<typeof setTimeout> | null = null;

/** Stop everything that's currently playing. Called before each new play. */
function stopAll(): void {
  if (activeHtmlAudio) {
    activeHtmlAudio.pause();
    activeHtmlAudio.currentTime = 0;
    activeHtmlAudio = null;
  }
  if (pendingTtsTimer !== null) {
    clearTimeout(pendingTtsTimer);
    pendingTtsTimer = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (_) { /* ignore */ }
  }
}

export function useRohingyaAudio() {
  // Per-instance "briefly active" indicator for button animation
  const [active, setActive] = useState(false);

  const stop = useCallback((): void => {
    stopAll();
    setActive(false);
  }, []);

  const play = useCallback((entry: AudioEntry): void => {
    stopAll();

    // Flash the button active for visual feedback (2 s)
    setActive(true);
    setTimeout(() => setActive(false), 2000);

    // ── Priority 1: Prerecorded Rohingya audio file ──────────────────
    if (entry.rohingyaSrc) {
      const audio = new Audio(entry.rohingyaSrc);
      activeHtmlAudio = audio;
      audio.onended = () => { activeHtmlAudio = null; };
      audio.onerror = () => {
        // File failed to load — fall through to TTS
        activeHtmlAudio = null;
        tryTTS(entry);
      };
      audio.play().catch(() => {
        activeHtmlAudio = null;
        tryTTS(entry);
      });
      return;
    }

    // ── Priority 2 & 3: Browser TTS or demo fallback ─────────────────
    tryTTS(entry);
  }, []);

  return { play, stop, active };
}

function tryTTS(entry: AudioEntry): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // ── Priority 2: Look for a Rohingya voice in the browser ──────────
  // Voices may not be loaded yet; call getVoices() after a short delay.
  const attemptTTS = () => {
    const voices = window.speechSynthesis.getVoices();
    const rohingyaVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(ROHINGYA_LANG) ||
        v.name.toLowerCase().includes('rohingya')
    );

    if (rohingyaVoice) {
      // Real Rohingya TTS voice found — use it!
      speakUtterance(entry.labelEn, rohingyaVoice.lang, rohingyaVoice);
      return;
    }

    // ── Priority 3: DEMO_MODE — English TTS placeholder ───────────────
    if (DEMO_MODE) {
      /**
       * TODO — PRODUCTION:
       * ─────────────────────────────────────────────────────────────────
       * This English TTS fires only because DEMO_MODE = true.
       * Before releasing to real Rohingya users:
       *   • Set  DEMO_MODE = false  (line 30 above)
       *   • Add prerecorded Rohingya .mp3 files (entry.rohingyaSrc)
       *   • OR ensure a Rohingya TTS voice is available in the browser
       * ─────────────────────────────────────────────────────────────────
       */
      speakUtterance(entry.labelEn, 'en-CA', null);
      return;
    }

    // ── Priority 4: Silent fail ────────────────────────────────────────
    // No Rohingya audio and DEMO_MODE is off — do nothing.
    // The button still animates to confirm the press was received.
  };

  // Small delay lets speechSynthesis.getVoices() populate on first call
  pendingTtsTimer = setTimeout(attemptTTS, 100);
}

function speakUtterance(
  text: string,
  lang: string,
  voice: SpeechSynthesisVoice | null
): void {
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();

    pendingTtsTimer = setTimeout(() => {
      pendingTtsTimer = null;
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang    = lang;
        u.rate    = 0.85;
        u.volume  = 1.0;
        if (voice) u.voice = voice;
        window.speechSynthesis.speak(u);
      } catch (_) { /* ignore */ }
    }, 250);
  } catch (_) { /* ignore */ }
}
