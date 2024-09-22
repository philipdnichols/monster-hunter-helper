import { ReactElement } from 'react';
import { World } from './world/World';

export const App = (): ReactElement => {
  function render(): ReactElement {
    return <World />;
  }

  return render();
};
