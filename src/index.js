import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext';
import { GuessProvider } from './context/GuessContext';
import { GameStateProvider } from './context/GameStateContext';
import { Loading } from './Loading';
import './index.css';

const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <GameStateProvider>
        <UserProvider>
          <GuessProvider>
            <App />
          </GuessProvider>
        </UserProvider>
      </GameStateProvider>
    </Suspense>
  </React.StrictMode>
);
