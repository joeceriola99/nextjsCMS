import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import '../styles/globals.css';
export default function App({ Component, PageProps }: any) {
  return <Component {...PageProps} />;
}
