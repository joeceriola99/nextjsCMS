import React, { useEffect, Fragment, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import {  Container, Toolbar } from '@material-ui/core';
import Gallery from './Gallery';
import parse from 'html-react-parser';
import { db } from '../../../firebase';

const Home = () => {
  const [home, setHome] = useState(null);
  useEffect(async () => {
    let array = [];
    const homeData = await db.collection('page').doc('Home').collection('data').orderBy('sort', 'asc').get();
    homeData.docs.map((doc) => {
      let formatData = doc.data();
      array.push(formatData);
      console.log(array);
    });

    setHome(array);
  });

  return (
    <Fragment>
      {home &&
        home.map((data) => {
          return data.type === 'carousel' ? (
            <Carousel>
              {data.collection.map((image, i) => {
                return <Item key={i} item={image} />;
              })}
            </Carousel>
          ) : data.type === 'gallery' ? (
            <Gallery gallery={data.collection} />
          ) : data.type === 'custom-html' ? (
            <Container>{parse(data.data)}</Container>
          ) : null;
        })}
      <Toolbar />
      <Toolbar />
    </Fragment>
  );
};

export default Home;
