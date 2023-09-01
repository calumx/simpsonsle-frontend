import { Dialog, DialogTitle, Typography } from '@mui/material';
import { ShareScore } from './ShareScore';
import { CountdownTimer } from './CountdownTimer';
import { UserStats } from './UserStats';
import { useGameState } from './context/GameStateContext';

export const DayCompletedDialog = ({ open }) => {
  const {
    gameData: { guessesToday, todaysEpisode, resultToday },
  } = useGameState();
  const result = resultToday;
  const pluralise = guessesToday?.length > 1;
  const userWasSuccessful = result === 'success';
  const successMsg = `You guessed today's episode in ${guessesToday?.length} guess${pluralise ? 'es' : ''}.`;
  const failureMsg = `You were unable to guess today's episode. It was "${todaysEpisode?.name}".`;
  return (
    <Dialog
      open={open}
      scroll='paper'
      maxWidth='false'
      PaperProps={{
        style: {
          gap: '1rem',
          minWidth: 'min(750px, 90vw)',
          backgroundColor: 'var(--simpsons-yellow)',
          alignItems: 'center',
          padding: '1rem',
        },
      }}
    >
      <DialogTitle>{userWasSuccessful ? 'CONGRATULATIONS!' : 'COMMISERATIONS.'}</DialogTitle>
      <Typography align='center'>{userWasSuccessful ? successMsg : failureMsg}</Typography>
      <ShareScore guesses={!userWasSuccessful ? 6 : guessesToday?.length || 0} />
      <CountdownTimer />
      <UserStats />
    </Dialog>
  );
};
