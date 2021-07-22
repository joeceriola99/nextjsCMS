import React from 'react';
import { CookiesProvider } from 'react-cookie';

// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

// import '../styles/globals.css';
export default function App({ Component, PageProps }: any) {
  return (
    <CookiesProvider>
      <Component {...PageProps} />{' '}
    </CookiesProvider>
  );
}
