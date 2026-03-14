import './style.css';

type Tab = 'learning' | 'connection';

let currentTab: Tab = 'learning';

const app = document.querySelector<HTMLDivElement>('#app')!;

function renderNav(): string {
  const learningActive = currentTab === 'learning';
  const connectionActive = currentTab === 'connection';
  return `
    <nav class="app-nav" role="tablist" aria-label="Main">
      <button type="button" class="nav-tab ${learningActive ? 'active' : ''}" data-tab="learning" role="tab" aria-selected="${learningActive}">
        <span class="nav-icon" aria-hidden="true">📚</span>
        <span class="nav-label">Learning</span>
      </button>
      <button type="button" class="nav-tab ${connectionActive ? 'active' : ''}" data-tab="connection" role="tab" aria-selected="${connectionActive}">
        <span class="nav-icon" aria-hidden="true">🎤</span>
        <span class="nav-label">Connect</span>
      </button>
    </nav>
  `;
}

function renderLearningPage(): string {
  return `
    <main class="page learning-page" role="tabpanel" id="panel-learning" aria-labelledby="tab-learning">
      <header class="page-header">
        <h1>Learn</h1>
        <p>Explore topics and get ready for in-person sessions with community leaders.</p>
      </header>
      <div class="topic-grid">
        <article class="topic-card" data-topic="transit">
          <span class="topic-icon" aria-hidden="true">🚌</span>
          <h2>Toronto transit & bus</h2>
          <p>How to use buses, streetcars, and subway. Fares, routes, and planning your trip.</p>
        </article>
        <article class="topic-card" data-topic="english">
          <span class="topic-icon" aria-hidden="true">🗣️</span>
          <h2>English everyday</h2>
          <p>Common phrases, directions, and vocabulary you’ll use with your community leader.</p>
        </article>
        <article class="topic-card" data-topic="housing">
          <span class="topic-icon" aria-hidden="true">🏠</span>
          <h2>Housing & rights</h2>
          <p>Renting, tenant rights, and finding support in Toronto.</p>
        </article>
        <article class="topic-card" data-topic="health">
          <span class="topic-icon" aria-hidden="true">🏥</span>
          <h2>Health & services</h2>
          <p>Clinics, OHIP, and how to access healthcare.</p>
        </article>
      </div>
    </main>
  `;
}

function renderConnectionPage(): string {
  return `
    <main class="page connection-page" role="tabpanel" id="panel-connection" aria-labelledby="tab-connection">
      <header class="page-header">
        <h1>Connect</h1>
        <p>Tell us what you want to learn. We’ll share it with community leaders who can take you and a group in person—for example to a bus stop—and teach you along the way.</p>
      </header>
      <div class="voice-section">
        <div class="transcript-box" id="transcript-box" aria-live="polite">
          <p class="transcript-placeholder" id="transcript-placeholder">Tap the mic and say what you’d like to learn, e.g. “I want to learn the bus system in Toronto and I’m a refugee.”</p>
          <p class="transcript-text" id="transcript-text" hidden></p>
        </div>
        <div class="voice-actions">
          <button type="button" class="mic-btn" id="mic-btn" aria-label="Start voice input">
            <span class="mic-icon" id="mic-icon">🎤</span>
            <span class="mic-label" id="mic-label">Hold to talk</span>
          </button>
          <button type="button" class="send-btn" id="send-btn" disabled aria-label="Send to community leaders">
            Send to community leaders
          </button>
        </div>
        <div class="connection-status" id="connection-status" aria-live="polite" hidden></div>
      </div>
    </main>
  `;
}

function render(): void {
  app.innerHTML = `
    <div class="app-shell">
      ${renderNav()}
      <div class="app-content">
        ${currentTab === 'learning' ? renderLearningPage() : renderConnectionPage()}
      </div>
    </div>
  `;
  if (currentTab === 'connection') setupConnectionPage();
  bindNav();
}

function bindNav(): void {
  app.querySelectorAll<HTMLButtonElement>('.nav-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab as Tab;
      if (tab && tab !== currentTab) {
        currentTab = tab;
        render();
      }
    });
  });
}

// --- Connection page: voice + send to community ---

function setupConnectionPage(): void {
  const transcriptPlaceholder = document.getElementById('transcript-placeholder')!;
  const transcriptText = document.getElementById('transcript-text') as HTMLParagraphElement;
  const micBtn = document.getElementById('mic-btn')!;
  const micIcon = document.getElementById('mic-icon')!;
  const micLabel = document.getElementById('mic-label')!;
  const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
  const connectionStatus = document.getElementById('connection-status')!;

  let accumulatedTranscript = '';
  let recognition: SpeechRecognition | null = null;

  function updateDisplay(text: string): void {
    if (text) {
      transcriptPlaceholder.hidden = true;
      transcriptText.hidden = false;
      transcriptText.textContent = text;
      sendBtn.disabled = false;
    } else {
      transcriptPlaceholder.hidden = false;
      transcriptText.hidden = true;
      transcriptText.textContent = '';
      sendBtn.disabled = true;
    }
  }

  function showStatus(message: string, isSuccess: boolean): void {
    connectionStatus.hidden = false;
    connectionStatus.textContent = message;
    connectionStatus.className = 'connection-status ' + (isSuccess ? 'success' : 'info');
  }

  function initSpeechRecognition(): SpeechRecognition | null {
    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return null;
    const rec = new SpeechRecognitionAPI();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-CA';
    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) accumulatedTranscript += t;
        else interim += t;
      }
      updateDisplay(accumulatedTranscript + interim);
    };
    rec.onend = () => {
      micIcon.textContent = '🎤';
      micLabel.textContent = 'Hold to talk';
      micBtn.classList.remove('recording');
    };
    rec.onerror = () => {
      micIcon.textContent = '🎤';
      micLabel.textContent = 'Hold to talk';
      micBtn.classList.remove('recording');
    };
    return rec;
  }

  recognition = initSpeechRecognition();

  micBtn.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (recognition) {
      try {
        recognition.start();
        micIcon.textContent = '⏹';
        micLabel.textContent = 'Listening…';
        micBtn.classList.add('recording');
      } catch (_) {}
    } else {
      accumulatedTranscript =
        "Voice isn't supported in this browser. Try Chrome or Edge. You can type your message in the box above when we add text input.";
      updateDisplay(accumulatedTranscript);
    }
  });

  micBtn.addEventListener('mouseup', () => {
    if (recognition) try { recognition.stop(); } catch (_) {}
  });
  micBtn.addEventListener('mouseleave', () => {
    if (recognition) try { recognition.stop(); } catch (_) {}
  });

  sendBtn.addEventListener('click', () => {
    if (!accumulatedTranscript.trim()) return;
    const message = accumulatedTranscript.trim();
    sendBtn.disabled = true;
    showStatus(
      `"${message.slice(0, 60)}${message.length > 60 ? '…' : ''}" was sent to community leaders. A leader may contact you to arrange a group session (e.g. a bus stop visit and English practice).`,
      true
    );
    accumulatedTranscript = '';
    updateDisplay('');
  });
}

render();
