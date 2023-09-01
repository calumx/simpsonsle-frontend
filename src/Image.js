import { Box } from '@mui/material';
import { useGameState } from './context/GameStateContext';
import { useGuess } from './context/GuessContext';

export const Image = ({ guessListShowing }) => {
  const { wrongGuessAnimationRunning } = useGuess();
  const shouldAnimate = !guessListShowing && wrongGuessAnimationRunning;
  const {
    gameData: { todaysEpisode, dayCompleted, guessesToday },
  } = useGameState();

  return (
    <Box sx={{ ...containerStyles, animation: shouldAnimate ? 'shake 0.5s' : null }}>
      {shouldAnimate && <ErrorOverlay />}
      {!dayCompleted && <ImgHider numberOfGuesses={guessesToday?.length} />}
      {todaysEpisode && (
        <img
          src={`https://image.tmdb.org/t/p/original${todaysEpisode.still_path}?t=${Date.now()}`}
          alt="today's episode"
          width='100%'
          height='auto'
          style={{ display: 'block' }}
        />
      )}
    </Box>
  );
};
const ImgHider = ({ numberOfGuesses }) => {
  return [1, 2, 3, 4].map((num) => {
    return (
      <div
        id={`img-hider-bar-${num}`}
        key={`img-hider-bar-${num}`}
        style={{
          position: 'absolute',
          left: `${num * 20}%`,
          visibility: numberOfGuesses < num ? 'visible' : 'hidden',
          borderRight: num !== 4 ? '1px solid black' : null,
          height: '100%',
          width: '20%',
          color: '#fff',
          backgroundColor: 'var(--simpsons-yellow)',
        }}
      ></div>
    );
  });
};

const ErrorOverlay = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        animation: 'img-flash-red 750ms ease',
      }}
    ></div>
  );
};

const containerStyles = {
  borderRadius: '5px',
  overflow: 'hidden',
  boxShadow: 'rgba(255, 255, 255, 0.4) 0px 7px 29px 0px',
  marginBottom: '2rem',
  position: 'relative',
  minWidth: '300px',
  maxWidth: '400px',
};
