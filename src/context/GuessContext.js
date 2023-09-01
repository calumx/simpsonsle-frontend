import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useGameState } from './GameStateContext';

const GuessContext = createContext();

export const useGuess = () => useContext(GuessContext);

export const GuessProvider = ({ children }) => {
  const [wrongGuessAnimationRunning, setWrongGuessAnimationRunning] = useState(false);
  const { updateUserData } = useUser();
  const {
    updateGameData,
    gameData: { guessesToday, todaysEpisode, dayCompleted },
  } = useGameState();

  const updateGuesses = useCallback(
    (guess) => {
      updateGameData({ guessesToday: [...guessesToday, guess] });
    },
    [guessesToday, updateGameData]
  );

  const triggerWrongGuessAnimation = () => {
    setWrongGuessAnimationRunning(true);
    setTimeout(() => setWrongGuessAnimationRunning(false), 1000);
  };

  useEffect(() => {
    if (dayCompleted || !guessesToday?.length) return;
    //handle success & failure
    const correctGuess = guessesToday?.includes(todaysEpisode?.name);
    if (correctGuess) {
      updateGameData({ dayCompleted: true, resultToday: 'success' });
      return updateUserData(guessesToday.length);
    }
    if (!correctGuess) triggerWrongGuessAnimation();
    if (guessesToday?.length === 5 && !correctGuess) {
      updateGameData({ dayCompleted: true, resultToday: 'failure' });
      return updateUserData(6);
    }
  }, [dayCompleted, guessesToday, todaysEpisode, updateGameData, updateUserData]);

  return <GuessContext.Provider value={{ updateGuesses, wrongGuessAnimationRunning }}>{children}</GuessContext.Provider>;
};
