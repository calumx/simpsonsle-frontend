import { useEffect, useCallback, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useGameState } from './context/GameStateContext';

export const CountdownTimer = () => {
  const [timeUntilNewEp, setTimeUntilNewEp] = useState(null);
  const [timerStopped, setTimerStopped] = useState(false);
  const {
    gameData: { expiryDate },
  } = useGameState();

  const countdownToNextEp = useCallback(() => {
    const remainingTime = expiryDate - new Date().getTime();
    if (remainingTime <= 0) {
      return setTimerStopped(true);
    } else {
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, '0');
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, '0');
      return setTimeUntilNewEp(`${hours}:${minutes}:${seconds}`);
    }
  }, [expiryDate]);

  useEffect(() => {
    if (timerStopped) return;
    countdownToNextEp();

    const interval = setInterval(() => {
      return countdownToNextEp();
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownToNextEp, timerStopped]);

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography>{`Next Simpsonsle ${timerStopped ? 'ready!' : 'in:'}`}</Typography>
      <Paper
        elevation={2}
        onClick={timerStopped ? () => window.location.reload() : null}
        sx={{
          backgroundColor: 'var(--simpsons-blue)',
          padding: '0.5rem',
          width: '25%',
          minWidth: '100px',
          textAlign: 'center',
          cursor: timerStopped ? 'pointer' : 'default',
        }}
      >
        {timerStopped ? <Typography variant='button'>{`CLICK HERE`}</Typography> : <Typography variant='button'>{timeUntilNewEp}</Typography>}
      </Paper>
    </Box>
  );
};
