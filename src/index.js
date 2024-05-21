import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext';
import { GuessProvider } from './context/GuessContext';
import { GameStateProvider } from './context/GameStateContext';
import './index.css';

const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameStateProvider>
      <UserProvider>
        <GuessProvider>
          <App />
        </GuessProvider>
      </UserProvider>
    </GameStateProvider>
  </React.StrictMode>
);
