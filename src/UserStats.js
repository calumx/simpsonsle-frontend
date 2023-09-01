import { useUser } from './context/UserContext';
import { Container, Paper, Stack, Typography } from '@mui/material';

export const UserStats = () => {
  const {
    userData: { totalPlayed, failed, ...stats },
  } = useUser();

  return (
    <Container sx={{ marginTop: '1rem' }} maxWidth='xs'>
      <Typography variant='h6' align='center'>
        Your Stats
      </Typography>

      <Stack direction='row' justifyContent='space-between'>
        <Typography>{`Played: ${totalPlayed}`}</Typography>
        <Typography>{`Failed: ${failed}`}</Typography>
      </Stack>

      {Object.keys(stats)?.map((guesses) => {
        const guessKey = guesses.split('guessedIn')[1];
        const guessCount = stats[`guessedIn${guessKey}`];

        return (
          <Stack key={`guessed-in-${guessKey}-display`} direction='row' alignItems='center' mb='0.5rem'>
            <Typography mr='1rem'>{guessKey}</Typography>
            <Paper
              square
              elevation={1}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                width: Math.floor((guessCount / totalPlayed) * 100) + '%',
                minWidth: guessCount ? '1rem' : 0,
                padding: !guessCount ? 0 : '0.25rem',
              }}
            >
              <Typography variant='caption'>{guessCount || null}</Typography>
            </Paper>
          </Stack>
        );
      })}
    </Container>
  );
};
