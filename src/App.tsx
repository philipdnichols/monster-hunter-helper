import { ReactElement } from 'react';
import { Rise } from './rise/Rise';

export const App = (): ReactElement => {
  function render(): ReactElement {
    return <Rise />;
  }

  return render();
};
