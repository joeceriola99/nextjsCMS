import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navigation/navbar';
import Header from '../../components/Navigation/index';
import Card from './card';
import { db } from '../../../firebase';
import Image from 'next/image';
import { Typography, Box, Container } from '@material-ui/core';

// const myLoader = ({ src, width, quality }) => {
//   return `https://ajsliders.com/images/${src}?w=${width}&q=${quality || 75}`;
// };

export default function orderNow(props) {
  // const [products, setProducts] = useState(null);

  // useEffect(async () => {
  //   console.log('use effect');
  //   let array = [];
  //   const productData = await db.collection('products').get();
  //   productData.docs.map((doc) => {
  //     let formatData = doc.data();
  //     array.push(formatData);
  //   });
  //   let finalData = array.filter((modifier) => modifier.IsModifier == 'False' && modifier.price > 0);
  //   console.log(finalData);
  //   setProducts(finalData);
  // }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <NavBar />
        <Typography>
          {/* {products &&
            products.map((data, index) => {
              const img = data.FileName.replace(/ /g, '-');
              return (
                <div className="card mb-4 g-4" style={{ maxWidth: '540px' }} key={index}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <Image
                        loader={myLoader}
                        src={img}
                        alt={data.title}
                        className="img-fluid rounded-start"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <h5 className="card-title">{data.price}</h5>
                        <p className="card-text">{data.fulltext}</p>
                        <p className="card-text">
                          <small className="text-muted">{data.ItemID}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })} */}
          {/* <Box display="flex" justifyContent="center" m={2} p={2} bgcolor="background.paper"> */}
            <Card />
          {/* </Box> */}
        </Typography>
      </Container>
    </>
  );
}
