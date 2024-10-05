import { ReactElement } from 'react';
import { World } from './world/World';
import { BrowserRouter as Router } from 'react-router-dom';

export const App = (): ReactElement => {
  function render(): ReactElement {
    return (
      <Router>
        <World />
      </Router>
    );
  }

  return render();
};
