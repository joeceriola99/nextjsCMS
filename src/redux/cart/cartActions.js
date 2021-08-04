import {
  SET_CART,
  SET_CART_COUNT,
  SET_TOTAL_PRICE,
  SET_TIP,
  SET_SELECTED_MODE_PAYMENT,
  SET_PROMO_CODE,
  SET_DELIVERY_OPTION,
  REDUCE_CART_ITEM,
  ADD_CART_ITEM,
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
  return {
    type: SET_CART_COUNT,
    payload,
  };
}

export function reduceCartCountofProduct(payload) {
  return {
    type: REDUCE_CART_ITEM,
    payload,
  };
}

export function addCartCountofProduct(payload) {
  return {
    type: ADD_CART_ITEM,
    payload,
  };
}

export const setDeliveryOption = (payload) => {
  return {
    type: SET_DELIVERY_OPTION,
    payload,
  };
};
