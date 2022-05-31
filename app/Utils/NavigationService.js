import * as React from 'react';

export const navigationRef = React.createRef();

export function GoBack() {
  navigationRef.current?.goBack();
}
export function Navigate(name, params) {
  console.log(`navigationRef`, navigationRef.current);

  navigationRef.current?.navigate(name, params);
}
