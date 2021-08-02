import React from 'react';
import Header from '../../components/Navigation/index';
import NavBar from '../../components/Navigation/navbar';
import Checkout from './checkout';
import { Container } from '@material-ui/core';

export default function checkout(props) {
  return (
    <>
      <Header />
      <Container>
        <NavBar />
        <Checkout />
      </Container>
    </>
  );
}
