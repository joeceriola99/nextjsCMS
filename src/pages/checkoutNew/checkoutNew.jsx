import React, { useEffect, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Cookies from 'js-cookie';
import { Box } from '@material-ui/core';

export default function checkout(props) {
  const [cartData, setCartData] = useState();

  useEffect(() => {
    console.log(JSON.parse(Cookies.get('cartData')));
    setCartData(JSON.parse(Cookies.get('cartData')));
  }, []);

  return (
    <div>
      <div className="myOrderSec">
        <h3>My Order</h3>
        <div className="mainOrderSec">
          <div className="myOrderChangeOrder">
            <p>Change Address</p>
            <ul>
              <li>Joe Cerioia</li>
              <li>B23 L34 Avida Settings</li>
              <li>09193805423</li>
            </ul>
          </div>
          <div className="orderWithQnt">
            <div className="cartItems">
              <div className="currentOrderImage"></div>
              <div className="currentOrderProduct">
                <p>BBQ Chicken Slider</p>
                <p>$3.00</p>
              </div>
              <div className="currentOrderQnt">
                <div>
                  <RemoveRoundedIcon />1<AddRoundedIcon />
                </div>
              </div>
              <div className="currentOrderImage"></div>
              <div className="currentOrderProduct">
                <p>BBQ Chicken Slider</p>
                <p>$3.00</p>
              </div>
              <div className="currentOrderQnt">
                <div>
                  <RemoveRoundedIcon />1<AddRoundedIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="promoWithTotal">
            <div className="promoWithTips">
              <ul>
                <li>
                  <b>Promo Code</b> 10OFFSale
                </li>
                <li>
                  <b>Tips</b> $5.00 <button className="button">Change Tips</button>
                </li>
              </ul>
            </div>
            <div className="totalWithTax">
              <ul>
                <li>
                  <b>Subtotal</b> <span>$3.00</span>
                </li>
                <li>
                  <b>Tax</b> <span>10%</span>
                </li>
                <li>
                  <b>Total</b> <span>$8.00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="orderMessage">
              <b>Message to Kitchen!</b>
            <textarea defaultValue="I want my order well packed" />
          </div>

          <div className="selectedSecviceOptn">
              <b>Selected Service Option</b>
              <button className="button">Change</button>
            <p>Delivery -April 5,2021,9.30AM CST</p>
          </div>

          <div className="typesOfPayment">
              <b>Types of Payment</b>
            <ul>
              <li>Credit Cards</li>
              <li>Gift Cards</li>
              <li>Rewards</li>
            </ul>
          </div>

          <div className="modeOfPayment">
              <b>Selected Mode of Payment</b>
              Credit Card - <span>xxxxxxxxxx 2982</span>
          </div>

          <div className="promoCode">
              <b>Promo Code</b>
            <div style={{ position: 'relative' }}>
              <input type="text" />
              <button className="promoApplyBtn">Apply</button>
            </div>
          </div>
          <div className="placeOrder">
            <button className="placeOrderBtn">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
