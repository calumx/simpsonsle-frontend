import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
  const [gameReady, setGameReady] = useState(false);
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    const GameStateObj = { ...localStorage };
    for (let key in GameStateObj) {
      if (!key.startsWith('simpsonsle_')) continue;
      const keyWithoutPrefix = key.replace('simpsonsle_', '');
      const camelKey = keyWithoutPrefix.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      setGameData((prev) => {
        return { ...prev, [camelKey]: JSON.parse(GameStateObj[key]) };
      });
    }
    setGameReady(true);
  }, []);

  const updateGameData = useCallback((newData) => {
    for (let key in newData) {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      const prefix = 'simpsonsle_';
      localStorage.setItem(prefix + snakeKey, JSON.stringify(newData[key]));
      setGameData((prev) => {
        return { ...prev, ...newData };
      });
    }
  }, []);

  useEffect(() => {
    if (!gameReady) return;

    const getNewEpisode = async () => {
      const res = await fetch(process.env.REACT_APP_EPISODE_ROUTE).catch((e) => console.error(e));
      const epData = await res.json();
      return updateGameData({ todaysEpisode: epData, expiryDate: epData.expiryDate, dayCompleted: false, guessesToday: [], resultToday: null });
    };

    if (!gameData.expiryDate || Date.now() > gameData.expiryDate) getNewEpisode();
  }, [gameData, updateGameData, gameReady]);

  return <GameStateContext.Provider value={{ gameData, gameReady, updateGameData }}>{children}</GameStateContext.Provider>;
};
