import React from 'react';
import '../styles/globals.css';
export default function App({ Component, PageProps }: any) {
  return <Component {...PageProps} />;
}
