import React from 'react';
import 'styles/bootstrap.min.css';
import 'styles/custom.css';

export default function App({ Component, PageProps }: any) {
  return <Component {...PageProps} />;
}
