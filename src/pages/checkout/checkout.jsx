import React, { useEffect, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Typography, Button, Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { reduceCartCountofProduct, addCartCountofProduct, setDeliveryOption } from '../../redux/cart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../../firebase';
import uniqid from 'uniqid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  productMod: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formLabel: {
    color: 'black',
    fontWeight: 600,
    height: '20px',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function checkout(props) {
  const [tips, setTips] = useState(5);
  const [subtotal, setSubtotal] = useState();
  const [tax, setTax] = useState(10);
  const [total, setTotal] = useState();
  const [promoCode, setPromoCode] = useState();
  const [finalPromo, setFinalPromo] = useState('No Promo Applied');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { cartItems, deliveryOption } = useSelector((state) => state.cartData);
  const { user } = useSelector((state) => state.public);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(user);

  const removeOneItem = (id) => {
    dispatch(reduceCartCountofProduct(id));
  };

  const addOneItem = (id) => {
    dispatch(addCartCountofProduct(id));
  };

  useEffect(() => {
    console.log('Use Effect Called');
    getCartTotalValue();
  }, [removeOneItem]);

  const getCartTotalValue = () => {
    let cartDetail = cartItems;
    let sum = 0;
    cartDetail.map((data) => {
      sum = sum + +data.cost * data.quantity;
    });
    setSubtotal(sum.toFixed(2));
    setTotal(sum + (tax / 100) * sum);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const pickUpHandler = () => {
    dispatch(setDeliveryOption('Pick Up'));
    setOpen(false);
  };

  const deliveryHandler = () => {
    dispatch(setDeliveryOption('Delivery'));
    setOpen(false);
  };

  const orderHandler = () => {
    var docData = {
      emailAddress: 'test@gmail.com',
      name: 'Joe Cerioia',
      phoneNumber: '09193805423',
      address: 'B23 L34 Avida Settings',
      modeofPayment: { type: 'Credit Card', info: ' 4568150022882982' },
      serviceOption: deliveryOption,
      orderData: cartItems,
      tips: tips,
      orderTotal: total,
      // promoCode: promoCode,
      message: 'I want my order well packed.',
    };
    db.collection('orders')
      .doc(uniqid())
      .set(docData)
      .then(() => {
        toast.success('Order Placed Successfully');
        setTimeout(() => router.push('/home'), 1500);
      });
  };

  return (
    <div className="orderMultiSec">
      <ToastContainer autoClose={5000} hideProgressBar={true} closeOnClick draggable pauseOnHover />
      <div className="myOrderSec orderMainLeftSec">
        <h3>My Order</h3>
        <div className="mainOrderSec">
          {/* Address Section  */}

          <div className="myOrderChangeOrder">
            <p className="button">Change Address</p>
            <ul>
              <li>{user?.fullName}</li>
              <li>B23 L34 Avida Settings</li>
              <li>{user?.phoneNumber}</li>
            </ul>
          </div>

          {/* Delivery Section  */}

          <div className="selectedSecviceOptn">
            <b>Selected Service Option</b>

            {/* CUSTOMISED MODAL */}
            <div>
              {deliveryOption ? (
                <button className="button" onClick={handleOpen}>
                  Change your Option
                </button>
              ) : (
                <button className="button" onClick={handleOpen}>
                  Choose your Option
                </button>
              )}

              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Select a Delivery Options
                </DialogTitle>
                <DialogContent dividers>
                  <Box padding="1rem" position="relative" overflow="auto">
                    <div className="w-100 d-flex justify-content-center">
                      <Button variant="contained" onClick={pickUpHandler}>
                        Pick Up
                      </Button>
                      <Button variant="contained" onClick={deliveryHandler}>
                        Delivery
                      </Button>
                    </div>
                  </Box>
                  <DatePicker selected={date} onChange={(date) => setDate(date)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* CUSTOMISED MODAL  ENDS*/}

            {deliveryOption ? <p>{deliveryOption}</p> : ''}
          </div>

          {/* Payment Section  */}

          <div className="typesOfPayment">
            <b>Types of Payment</b>
            <ul>
              <li>
                <Image src={'/CARDICONS.png'} height={20} width={100} alt="Credit Card" />
                <br />
                <br />
                Credit Cards
              </li>
              <li>
                <Image src={'/GIFTCARD.png'} height={30} width={30} alt="Gift Cards" />
                <br />
                <br />
                Gift Cards
              </li>
              <li>
                <Image src={'/COIN.png'} height={30} width={30} alt="Coin" />
                <br />
                <br />
                Rewards
              </li>
            </ul>
          </div>

          <div className="modeOfPayment">
            <p>
              <b>Selected Mode of Payment</b>
            </p>
            <p>
              Credit Card - <span>xxxxxxxxxx 2982</span>
            </p>
          </div>

          {/* Submit Order Button  */}

          <div className="placeOrder">
            <button className="placeOrderBtn" onClick={orderHandler}>
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Cart Section  */}

      <div className="myOrderRightSec">
        <h3>Cart</h3>
        <div className="orderWithQnt">
          {cartItems && cartItems.length != 0
            ? cartItems.map((data, index) => {
                return (
                  <>
                    <div className="cartItems" key={index}>
                      <div className="currentOrderImage">
                        <img src={data.url} />
                      </div>
                      <div className="currentOrderProduct">
                        <p>{data.productName}</p>
                        <p>${data.cost}</p>
                      </div>
                      <div className="currentOrderQnt">
                        <div>
                          <RemoveRoundedIcon onClick={() => removeOneItem(data.productID)} />
                          {data.quantity}
                          <AddRoundedIcon onClick={() => addOneItem(data.productID)} />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : 'No Data In Cart'}
        </div>
        <div className="promoWithTotal">
          <div className="promoWithTips">
            <ul>
              <li>
                <b>Promo Code</b> {finalPromo}
              </li>
              <li>
                <b>Tips</b>
                <input
                  style={{ width: '40px', marginLeft: '10px', textAlign: 'center' }}
                  type="number"
                  step={5}
                  defaultValue={5}
                  onChange={(e) => setTips(e.target.value)}
                ></input>
              </li>
            </ul>
          </div>
          <div className="totalWithTax">
            <ul>
              <li>
                <b>Subtotal</b> <span>${subtotal}</span>
              </li>
              <li>
                <b>Tax</b> <span>{tax}%</span>
              </li>
              <li>
                <b>Total</b> <span>${Number.parseFloat(total) + Number.parseFloat(tips)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="orderMessage">
          <b>Message to Kitchen!</b>
          <textarea defaultValue="I want my order well packed." />
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
      </div>
    </div>
  );
}
