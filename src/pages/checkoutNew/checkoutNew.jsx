import React, { useEffect, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
export default function checkout(props) {
  return (
    <div>
      <div className="myOrderSec">
        <div className="mainOrderSec">
          <h3>My Order</h3>
          <div className="myOrderChangeOrder">
            <p>Change Address</p>
            <ul>
              <li>Joe Cerioia</li>
              <li>B23 L34 Avida Settings</li>
              <li>09193805423</li>
            </ul>
          </div>
          <div className="orderWithQnt">
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
          <div className="promoWithTotal">
            <div className="promoWithTips">
              <ul>
                <li>
                  <b>Promo Code</b> 10OFFSale
                </li>
                <li>
                  <b>Tips</b> $5.00 <small>Change Tips</small>
                </li>
              </ul>

              <p></p>
              <p></p>
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
            <p>
              <b>Message to Kitchen!</b>
            </p>
            <textarea className>I want my chicken well done</textarea>
          </div>

          <div className="selectedSecviceOptn">
            <p>
              <b>Selected Service Option</b> <span>Change</span>
            </p>
            <p>Delivery -April 5,2021,9.30AM CST</p>
          </div>

          <div className="typesOfPayment">
            <p>
              <b>Types of Payment</b>
            </p>
            <ul>
              <li>Credit Cards</li>
              <li>Gift Cards</li>
              <li>Rewards</li>
            </ul>
          </div>

          <div className="modeOfPayment">
            <p>
              <b>Selected Mod of Payment</b>
            </p>
            <p>
              Credit Card - <span>xxxxxxxxxx 2982</span>
            </p>
          </div>

          <div className="promoCode">
            <p>
              <b>Promo Code</b>
            </p>
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
