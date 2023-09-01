import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Box
      sx={{
        height: { xs: `calc(env(safe-area-inset-top) + env(safe-area-inset-bottom) + 100vh)` },
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#71d0f5',
      }}
    >
      <CircularProgress variant='indeterminate' />
    </Box>
  );
};
