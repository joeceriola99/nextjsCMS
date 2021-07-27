import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navigation/navbar';
import Header from '../../components/Navigation/index';
import Card from './card';
// import Image from 'next/image';
import { Typography, Container } from '@material-ui/core';
import { db } from '../../../firebase';

export default function orderNow(props) {
  const categories = ['SLIDERS', 'SPECIAL IT', 'Daily Spec', 'DESSERTS'];
  const [products, setProducts] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);

  useEffect(async () => {
    console.log('USE EFFECT');
    if (currentCategory == null) {
      console.log('if part');
      let array = [];
      const productData = await db.collection('products').get();
      productData.docs.map((doc) => {
        let formatData = doc.data();
        array.push(formatData);
      });
      let finalData = array.filter((modifier) => modifier.IsModifier == 'False' && modifier.price > 0);
      // console.log(finalData);
      setProducts(finalData);
    } else {
      console.log('else part');
      let array = [];
      const productData = await db.collection('products').get();
      productData.docs.map((doc) => {
        let formatData = doc.data();
        array.push(formatData);
      });
      let finalDataCategoryWise = array.filter(
        (modifier) => modifier.IsModifier == 'False' && modifier.price > 0 && modifier.Department == currentCategory,
      );
      console.log(finalDataCategoryWise);
      setProducts(finalDataCategoryWise);
    }
  }, [currentCategory]);

  const categoryHandler = (data) => {
    setCurrentCategory(data);
  };

  const cartHandler = (data) => {
    setCartProducts(data);
  };

  return (
    <>
      <Header cart={cartProducts} />
      <Container maxWidth="lg">
        <NavBar handlerClick={categoryHandler} categoriesList={categories} />
        <Typography>{products && <Card products={products} />}</Typography>
      </Container>
    </>
  );
}
