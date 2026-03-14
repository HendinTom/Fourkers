import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import LearningPage from './pages/LearningPage';
import LessonPage from './pages/LessonPage';
import ConnectPage from './pages/ConnectPage';

export default function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="app-body">
        <Routes>
          {/* Default route → Learn */}
          <Route path="/" element={<Navigate to="/learn" replace />} />

          {/* Learn routes */}
          <Route path="/learn"           element={<LearningPage />} />
          <Route path="/learn/:lessonId" element={<LessonPage />} />

          {/* Connect */}
          <Route path="/connect" element={<ConnectPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/learn" replace />} />
        </Routes>
      </main>
    </div>
  );
}
