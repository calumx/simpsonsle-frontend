import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Divider, useMediaQuery } from '@mui/material';

export const SearchResultsCard = ({ searchResults, handleResultClick }) => {
  const showListAbove = useMediaQuery('(min-height: 400px) and (max-height: 700px)');

  return (
    <List
      disablePadding
      sx={{
        backgroundColor: '#fff',
        width: '300px',
        boxShadow: '2px 2px 30px black',
        position: 'absolute',
        bottom: showListAbove ? '3.625rem' : null,
        top: !showListAbove ? '3.625rem' : null,
      }}
    >
      {searchResults.map((result, idx) => {
        return (
          <React.Fragment key={`episode-${result}`}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ '&:hover': { backgroundColor: 'lightgoldenrodyellow' } }}
                onClick={() => {
                  handleResultClick(result);
                }}
              >
                <ListItemText>{result}</ListItemText>
              </ListItemButton>
            </ListItem>
            {idx < 4 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
};
