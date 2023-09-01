import { Typography, Grid, Container } from '@mui/material';
import { useGameState } from './context/GameStateContext';
import { useGuess } from './context/GuessContext';

export const GuessList = () => {
  const { wrongGuessAnimationRunning } = useGuess();
  const {
    gameData: { guessesToday },
  } = useGameState();
  return (
    <Container maxWidth='sm' sx={{ marginTop: '3rem' }}>
      <Grid container spacing={2} alignItems='center' direction='column'>
        {[1, 2, 3, 4, 5].map((prevGuessNum) => {
          const titleGuessed = guessesToday?.[prevGuessNum - 1];

          return (
            <Grid
              item
              key={`prev-guess-${prevGuessNum}`}
              xs={8}
              bgcolor={titleGuessed ? 'rgb(252, 108, 108)' : 'transparent'}
              sx={{
                width: '45%',
                minWidth: '250px',
                border: '2px solid #000',
                padding: '1rem',
                marginBottom: '0.5rem',
                borderRadius: '1px',
                animation: wrongGuessAnimationRunning && titleGuessed?.length ? 'flash-red 1s ease-out forwards, shake 0.5s' : null,
              }}
            >
              <Typography noWrap>{`${prevGuessNum}.\u00a0\u00a0${titleGuessed || ''}`}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
