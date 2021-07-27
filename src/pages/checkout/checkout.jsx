import React, { useEffect, useState } from 'react';

export default function checkout(props) {
  return (
    <div className="container text-center">
      <div className="col-md-12 col-sm-12">
        <ul>
          <li className="row columnCaptions">
            <div>ITEM</div>
            <div>QTY</div>
            <div>Price</div>
          </li>
          <li className="row">
            <div className="quantity">1</div>
            <div className="itemName">Birthday Cake</div>

            <div className="price">$49.95</div>
          </li>
          <li className="row">
            <div className="quantity">50</div>
            <div className="itemName">Party Cups</div>

            <div className="price">$5.00</div>
          </li>
          <li className="row">
            <div className="quantity">20</div>
            <div className="itemName">Beer kegs</div>

            <div className="price">$919.99</div>
          </li>
          <li className="row">
            <div className="quantity">18</div>
            <div className="itemName">Pound of beef</div>

            <div className="price">$269.45</div>
          </li>
          <li className="row">
            <div className="quantity">1</div>
            <div className="itemName">Bullet-proof vest</div>
            <div className="price">$450.00</div>
          </li>
          <li className="row totals">
            <div className="itemName">Total:</div>
            <div className="price">$1694.43</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
