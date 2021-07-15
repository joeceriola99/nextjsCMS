import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navigation/navbar';
import Header from '../../components/Navigation/index';
import Card from './card';
// import Image from 'next/image';
import { Typography,  Container } from '@material-ui/core';

export default function orderNow(props) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <NavBar />
        <Typography>
          <Card />
        </Typography>
      </Container>
    </>
  );
}
