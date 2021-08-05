import { StarRate } from '@material-ui/icons';
import {
  SET_CART,
  SET_PROMO_CODE,
  SET_SELECTED_MODE_PAYMENT,
  SET_TIP,
  SET_TOTAL_PRICE,
  SET_CART_COUNT,
  SET_DELIVERY_OPTION,
  REDUCE_CART_ITEM,
  ADD_CART_ITEM,
} from '../actionTypes';

const INITIAL_STATE = {
  cartItems: [],
  totalPriceItems: 0,
  tips: 0,
  selectedPayment: null,
  promoCode: null,
  cartCount: 0,
  deliveryOption: null,
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CART: {
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
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
      return {
        ...state,
        cartCount: state.cartCount + payload,
      };
    }
    case SET_DELIVERY_OPTION: {
      return {
        ...state,
        deliveryOption: payload,
      };
    }
    case REDUCE_CART_ITEM: {
      // console.log("REDUCE_CART_ITEM")
      let myArray = state.cartItems;
      let objIndex = myArray.findIndex((obj) => obj.productID == payload);
      // console.log('Before update: ', myArray[objIndex].quantity);
      myArray[objIndex].quantity = myArray[objIndex].quantity - 1;
      return {
        ...state,
        cartItems: myArray,
        cartCount: state.cartCount - 1,
      };
    }
    case ADD_CART_ITEM: {
      let myArray = state.cartItems;
      let objIndex = myArray.findIndex((obj) => obj.productID == payload);
      myArray[objIndex].quantity = myArray[objIndex].quantity + 1;
      return {
        ...state,
        cartItems: myArray,
        cartCount: state.cartCount + 1,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
