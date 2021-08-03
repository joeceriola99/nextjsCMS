import {
  SET_CART,
  SET_PROMO_CODE,
  SET_SELECTED_MODE_PAYMENT,
  SET_TIP,
  SET_TOTAL_PRICE,
  SET_CART_COUNT,
} from '../actionTypes';

const INITIAL_STATE = {
  cartItems: [],
  totalPriceItems: 0,
  tips: 0,
  selectedPayment: null,
  promoCode: null,
  cartCount: 0,
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CART: {
      return {
        ...state,
        cartItems: payload,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPriceItems: payload,
      };
    }
    case SET_TIP: {
      return {
        ...state,
        tips: payload,
      };
    }
    case SET_SELECTED_MODE_PAYMENT: {
      return {
        ...state,
        selectedPayment: payload,
      };
    }
    case SET_PROMO_CODE: {
      return {
        ...state,
        promoCode: payload,
      };
    }
    case SET_CART_COUNT: {
      console.log('Cart Count Payload', payload);
      return {
        ...state,
        cartCount: state.cartCount + payload,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
