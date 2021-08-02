import React, { useEffect, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Cookies from 'js-cookie';

export default function checkout(props) {
  const [cartData, setCartData] = useState();
  const [tips, setTips] = useState(5);
  const [subtotal, setSubtotal] = useState();
  const [tax, setTax] = useState(10);
  const [total, setTotal] = useState();
  const [promoCode, setPromoCode] = useState();
  const [finalPromo, setFinalPromo] = useState('No Promo Applied');

  useEffect(() => {
    console.log(JSON.parse(Cookies.get('cartData')));
    setCartData(JSON.parse(Cookies.get('cartData')));
    getCartTotalValue();
  }, []);

  const getCartTotalValue = () => {
    let cartDetail = JSON.parse(Cookies.get('cartData'));
    let sum = 0;
    cartDetail.map((data) => {
      sum = sum + parseFloat(data.cost);
      console.log(sum);
    });
    setSubtotal(sum);
    setTotal(sum + (tax / 100) * sum);
  };

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
              {cartData && cartData.length != 0
                ? cartData.map((data) => {
                    console.log(data);
                    return (
                      <>
                        <div className="currentOrderImage">
                          <img src={data.url} />
                        </div>
                        <div className="currentOrderProduct">
                          <p>{data.productName}</p>
                          <p>{data.cost}</p>
                        </div>
                        <div className="currentOrderQnt">
                          <div>
                            <RemoveRoundedIcon />
                            {data.quantity}
                            <AddRoundedIcon />
                          </div>
                        </div>
                      </>
                    );
                  })
                : 'No Data'}
            </div>
          </div>

          <div className="promoWithTotal">
            <div className="promoWithTips">
              <ul>
                <li>
                  <b>Promo Code</b> {finalPromo}
                </li>
                <li>
                  <b>Tips</b>
                  <input type="number" step={5} defaultValue={5} onChange={(e) => setTips(e.target.value)}></input>
                </li>
              </ul>
            </div>
            <div className="totalWithTax">
              <ul>
                <li>
                  <b>Subtotal</b> <span>${subtotal.toFixed(2)}</span>
                </li>
                <li>
                  <b>Tax</b> <span>{tax}%</span>
                </li>
                <li>
                  <b>Total</b> <span>${parseFloat(total) + parseFloat(tips).toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="orderMessage">
            <b>Message to Kitchen!</b>
            <textarea defaultValue="I want my order well packed." />
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
              <input type="text" onChange={(e) => setPromoCode(e.target.value)} />
              <button className="promoApplyBtn" onClick={() => setFinalPromo(promoCode)}>
                Apply
              </button>
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
