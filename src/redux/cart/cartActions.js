import {
  SET_CART,
  SET_TOTAL_PRICE,
  SET_TIP,
  SET_SELECTED_MODE_PAYMENT,
  SET_PROMO_CODE,
  SET_CART_COUNT,
} from '../actionTypes';

export function setCart(payload) {
  return { type: SET_CART, payload };
}

export function setTotalPrice(payload) {
  return { type: SET_TOTAL_PRICE, payload };
}

export function setTip(payload) {
  return { type: SET_TIP, payload };
}

export function setModeOfPayment(payload) {
  return {
    type: SET_SELECTED_MODE_PAYMENT,
    payload,
  };
}

export function setPromoCode(payload) {
  return {
    type: SET_PROMO_CODE,
    payload,
  };
}

export function setCartCount(payload) {
  console.log("triggered")
  return {
    type: SET_CART_COUNT,
    payload,
  };
}
