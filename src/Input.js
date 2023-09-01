import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import { SearchResultsCard } from './SearchResultsCard';
import { useGuess } from './context/GuessContext';
import allEpisodes from './episodeNames.json';
import { useGameState } from './context/GameStateContext';

export const Input = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [guessString, setGuessString] = useState('');
  const inputRef = useRef(null);
  const verySmallScreen = useMediaQuery('(max-height: 400px)');
  const { updateGuesses } = useGuess();
  const {
    gameData: { guessesToday },
  } = useGameState();

  const handleTextInput = (string) => {
    const searchForGuessString = () => {
      const results = allEpisodes.filter((episode) => {
        return episode.toLowerCase().includes(string.toLowerCase()) && !guessesToday.includes(episode);
      });
      setSearchResults(results.splice(0, 5));
    };

    setGuessString(string);

    if (string.length > 2) {
      searchForGuessString(string);
    } else setSearchResults([]);
  };
  const handleResultClick = (guess) => {
    setGuessString('');
    setSearchResults([]);
    return updateGuesses(guess);
  };

  useEffect(() => {
    const clearResults = () => {
      inputRef.current.focus();
      setGuessString('');
      return setSearchResults([]);
    };
    window.addEventListener('click', clearResults);
    return () => window.removeEventListener('click', clearResults);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <input
        type='text'
        style={{ ...inputStyles, width: verySmallScreen ? '250px' : '300px', marginLeft: verySmallScreen ? '2rem' : null }}
        ref={inputRef}
        onChange={(e) => handleTextInput(e.target.value)}
        value={guessString}
        placeholder='Type your guess here...'
        autoComplete='off'
        autoFocus
      />
      {searchResults.length ? <SearchResultsCard searchResults={searchResults} handleResultClick={handleResultClick} /> : null}
    </div>
  );
};

const inputStyles = {
  padding: '1rem 0.75rem',
  borderRadius: '2px',
  outline: 0,
  border: 'none',
  boxShadow: 'rgba(254, 212, 57, 0.24) 0px 3px 8px',
};
