import React, { useEffect, Fragment, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import { Container, Toolbar } from '@material-ui/core';
import Gallery from './Gallery';
import parse from 'html-react-parser';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';

const Home = () => {
  const [home, setHome] = useState(null);
  const userData = useSelector((state) => state.initial);
  useEffect(async () => {
    let array = [];
    const homeData = await db.collection('page').doc('Home').collection('data').orderBy('sort', 'asc').get();
    homeData.docs.map((doc) => {
      let formatData = doc.data();
      array.push(formatData);
    });

    setHome(array);
  }, []);

  return (
    <Fragment>
      {home &&
        home.map((data, index) => {
          return data.type === 'carousel' ? (
            <Carousel key={index}>
              {data.collection.map((image, i) => {
                return <Item key={i} item={image} />;
              })}
            </Carousel>
          ) : data.type === 'gallery' ? (
            <Gallery key={index} gallery={data.collection} />
          ) : data.type === 'custom-html' ? (
            <Container key={index}>{parse(data.data)}</Container>
          ) : null;
        })}
      <Toolbar />
      <Toolbar />
    </Fragment>
  );
};

export default Home;
