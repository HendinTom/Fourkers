import { useState, useCallback, useRef, useEffect } from 'react';

// Local interface definitions — avoids DOM lib version conflicts
interface RecognitionAlternative {
  readonly transcript: string;
}
interface RecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  readonly [index: number]: RecognitionAlternative;
}
interface RecognitionResultList {
  readonly length: number;
  readonly [index: number]: RecognitionResult;
}
interface RecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: RecognitionResultList;
}
interface Recognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((ev: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
}

function getCtor(): (new () => Recognition) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, (new () => Recognition) | undefined>;
  return w['SpeechRecognition'] ?? w['webkitSpeechRecognition'] ?? null;
}

export function useSpeechRecognition() {
  const Ctor = getCtor();
  const supported = Ctor !== null;
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recRef = useRef<Recognition | null>(null);

  // Stop on unmount
  useEffect(() => {
    return () => {
      if (recRef.current) {
        try { recRef.current.stop(); } catch (_) { /* ignore */ }
        recRef.current = null;
      }
    };
  }, []);

  const stop = useCallback((): void => {
    if (recRef.current) {
      try { recRef.current.stop(); } catch (_) { /* ignore */ }
      recRef.current = null;
    }
    setListening(false);
  }, []);

  const start = useCallback(
    (onFinal?: (text: string) => void): void => {
      if (!Ctor) return;
      if (recRef.current) {
        try { recRef.current.stop(); } catch (_) { /* ignore */ }
      }
      const rec = new Ctor();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-CA';
      recRef.current = rec;
      setListening(true);
      setTranscript('');
      let finalText = '';

      rec.onresult = (ev: RecognitionEvent): void => {
        let interim = '';
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const chunk = ev.results[i][0].transcript;
          if (ev.results[i].isFinal) finalText += chunk;
          else interim += chunk;
        }
        setTranscript(finalText + interim);
        if (finalText && onFinal) onFinal(finalText);
      };
      rec.onend = (): void => {
        recRef.current = null;
        setListening(false);
      };
      rec.onerror = (): void => {
        recRef.current = null;
        setListening(false);
      };
      try {
        rec.start();
      } catch (_) {
        recRef.current = null;
        setListening(false);
      }
    },
    [Ctor]
  );

  return { supported, listening, transcript, start, stop };
}
