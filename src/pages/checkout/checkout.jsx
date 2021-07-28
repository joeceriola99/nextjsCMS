import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { db } from '../../../firebase';

export default function checkout(props) {
  const [cartData, setCartData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // let finalData = [];
    // console.log(JSON.parse(Cookies.get('cartData')));
    // let array = JSON.parse(Cookies.get('cartData'));
    // // setCartData(JSON.parse(Cookies.get('cartData')));
    // await array.map(async (data) => {
    //   let docRef = await db.collection('products').doc(data.productID);
    //   await docRef
    //     .get()
    //     .then((doc) => {
    //       if (doc.exists) {
    //         let insertData = { ...data, ...doc.data() };
    //         console.log('data to be inserted', insertData);
    //         finalData.push(insertData);
    //         console.log('the final data to be set in state', finalData);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log('Error getting document:', error);
    //     });
    // });
    // await setCartData(finalData);
    let a = await _getSyncData();
    console.log('Daaraa', [...a]);
  };

  function _getSyncData() {
    let finalData = [];
    console.log(JSON.parse(Cookies.get('cartData')));
    let array = JSON.parse(Cookies.get('cartData'));

    return new Promise((resolve, reject) => {
      array.map((data) => {
        let docRef = db.collection('products').doc(data.productID);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              let insertData = { ...data, ...doc.data() };
              console.log('data to be inserted', insertData);
              finalData.push(insertData);
              console.log('the final data to be set in state', finalData);
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      });
      return resolve(finalData);
      // return reject('error');
    });
  }

  console.log('HHH', cartData);
  return (
    <div className="container text-center">
      <div className="col-md-12 col-sm-12">
        <ul>
          <li className="row columnCaptions">
            <div>QTY</div>
            <div>ITEM</div>
            <div>Price</div>
          </li>
          {cartData?.length != 0 ? (
            cartData?.map((data) => {
              console.log('Cart Data Mapped', data);
              return (
                <li key={data.productID} className="row">
                  <div className="quantity">{data.quantity}</div>
                  <div className="itemName">{data.ItemDescription}</div>
                  <div className="price">${data.cost}</div>
                </li>
              );
            })
          ) : (
            <h1>No Items In Cart</h1>
          )}
          <li className="row totals">
            <div className="itemName">Total:</div>
            <div className="price">$1694.43</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
