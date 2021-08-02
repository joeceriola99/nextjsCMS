import React from 'react';
import 'styles/bootstrap.min.css';
import 'styles/custom.css';
import { store } from '../redux/store/store';
import { Provider } from 'react-redux';

export default function App({ Component, PageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...PageProps} />
    </Provider>
  );
}
