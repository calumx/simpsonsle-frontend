import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = () => {
  return (
    <Box
      sx={{
        zIndex: 2,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#71d0f5',
        color: '#f4c518',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <CircularProgress variant='indeterminate' color='inherit' size={100} sx={{ height: '50vh' }} />
      <Typography variant='h1' color='#fff' fontSize={['2rem', '2.75rem', '3.5rem']} fontWeight={700}>
        Simpsonsle is loading...
      </Typography>
    </Box>
  );
};
