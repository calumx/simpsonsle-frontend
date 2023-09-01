import { createContext, useCallback, useContext, useEffect } from 'react';
import { useGameState } from './GameStateContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const {
    updateGameData,
    gameReady,
    gameData: { userData, dayCompleted },
  } = useGameState();

  useEffect(() => {
    if (gameReady && !userData) {
      return updateGameData({ userData: { totalPlayed: 0, guessedIn1: 0, guessedIn2: 0, guessedIn3: 0, guessedIn4: 0, guessedIn5: 0, failed: 0 } });
    }
  }, [userData, updateGameData, dayCompleted, gameReady]);

  const updateUserData = useCallback(
    (todayGuessAmount) => {
      const { totalPlayed, failed, ...guesses } = userData;
      const resultToday =
        todayGuessAmount < 6 ? { [`guessedIn${todayGuessAmount}`]: guesses[`guessedIn${todayGuessAmount}`] + 1 } : { failed: failed + 1 };
      const newData = {
        ...userData,
        ...resultToday,
        totalPlayed: totalPlayed + 1,
      };
      updateGameData({ userData: newData });
    },
    [userData, updateGameData]
  );

  return <UserContext.Provider value={{ userData, updateUserData }}>{children}</UserContext.Provider>;
};
