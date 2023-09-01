import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useGameState } from './context/GameStateContext';

export const ShareScore = ({ guesses }) => {
  const [copied, setCopied] = useState(false);
  const {
    gameData: { todaysEpisode },
  } = useGameState();

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  let emojiArr = [];

  for (let i = 1; i <= 5; i++) {
    if (i < guesses) emojiArr.push({ id: `emoji-${i}`, char: '\u{1F7E5}' }); //red square
    if (i === guesses) emojiArr.push({ id: `emoji-${i}`, char: '\u{1F7E9}' }); //green square
    if (i > guesses) emojiArr.push({ id: `emoji-${i}`, char: '\u{2B1B}' }); //black square
  }

  const emojisToShare = [
    `Simpsonsle ${todaysEpisode?.simpsonsleNumber ? '#' + todaysEpisode?.simpsonsleNumber : ''} \n`,
    ...emojiArr.map((emoji) => emoji.char),
  ].join('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', marginTop: '1rem' }}>
        {emojiArr.map((emoji) => {
          return (
            <div key={emoji.id} style={{ marginRight: '0.25rem' }}>
              {emoji.char}
            </div>
          );
        })}
      </div>
      <Button
        variant='contained'
        className='share-btn'
        sx={{ minWidth: '10em' }}
        onClick={() => {
          navigator.clipboard.writeText(emojisToShare);
          setCopied(true);
        }}
      >
        {copied ? 'COPIED' : 'SHARE'}
      </Button>
    </div>
  );
};
