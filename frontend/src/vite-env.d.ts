/// <reference types="vite/client" />

// Augment Window for webkit-prefixed Speech Recognition
interface Window {
  readonly webkitSpeechRecognition: (new () => SpeechRecognition) | undefined;
}
