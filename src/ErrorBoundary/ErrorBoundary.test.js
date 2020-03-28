import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import { render } from '@testing-library/react';

const Child = () => {
  throw Error('error happened');
};
// without this error swallower react will always display error when you run test on dev mode.
const swallowError = codeToRun => {
  const error = console.error;
  console.error = () => {};
  codeToRun();
  console.error = error;
};

it('catches error and display message', () => {
  swallowError(() => {
    const { getByText } = render(
      <ErrorBoundary render={() => <span>uh oh!</span>}>
        <Child />
      </ErrorBoundary>,
    );
    const errorMessage = getByText('uh oh!');
    expect(errorMessage).toBeDefined();
  });
});
