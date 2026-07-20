import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ThreadPage from './features/threads/pages/ThreadPage';
import ThreadDetailPage from './features/threads/pages/ThreadDetailPage';
import LeaderboardPage from './features/leaderboard/pages/LeaderboardPage';
import { useAppDispatch, useAppSelector } from './states/hooks';
import { asyncPreloadProcess } from './states/isPreload/action';
import Loading from './components/common/Loading';

function App() {
  const { authUser = null, isPreload = false } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/threads" replace />} />
      <Route path="/threads" element={<ThreadPage />} />
      <Route path="/threads/:id" element={<ThreadDetailPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
    </Routes>
  );
}

export default App;
