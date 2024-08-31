import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';

export const App = (): ReactElement => {
  function render(): ReactElement {
    return (
      <Container maxWidth={false}>
        <Box>Hello, world!</Box>
      </Container>
    );
  }

  return render();
};
