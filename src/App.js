import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { TodaysImage } from './Image';
import { Input } from './Input';
import { GuessList } from './GuessList';
import { DayCompletedDialog } from './DayCompletedDialog';
import { useGameState } from './context/GameStateContext';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [minimumWaitTimeComplete, setMinimumWaitTimeComplete] = useState(false);
  const hasRoomForGuessList = useMediaQuery('(min-height: 700px)');
  const verySmallScreen = useMediaQuery('(max-height: 400px)');
  const {
    gameData: { dayCompleted = false },
  } = useGameState();

  useEffect(() => {
    const minimumWaitTime = 1000;
    const loadingTimer = setTimeout(() => {
      setMinimumWaitTimeComplete(true);
    }, minimumWaitTime);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <Box sx={{ height: { xs: `calc(env(safe-area-inset-top) + env(safe-area-inset-bottom) + 100vh)` }, width: '100vw' }}>
      {(loading || !minimumWaitTimeComplete) && <Loading />}
      {!loading && minimumWaitTimeComplete && <DayCompletedDialog open={dayCompleted} />}
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: verySmallScreen ? 'row' : 'column',
          alignItems: verySmallScreen ? 'flex-start' : 'center',
          justifyContent: 'center',
          height: '100%',
          paddingTop: verySmallScreen ? '2rem' : 0,
        }}
      >
        <>
          <Grid item xs={4} sm={4}>
            <TodaysImage guessListShowing={hasRoomForGuessList} setLoading={setLoading} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input />
          </Grid>
          {hasRoomForGuessList && (
            <Grid item xs={12} sm={6}>
              <GuessList />
            </Grid>
          )}
        </>
      </Container>
    </Box>
  );
};

export default App;
