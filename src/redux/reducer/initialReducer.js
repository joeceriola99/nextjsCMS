import { ADD_CART } from '../actionTypes';

const INITIAL_STATE = {
  userDetails: null,
  authDetails: null,
  cartData: null,
  cartCount: 0,
};

const initialReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CART:
      console.log('payload on action type', action.payload);
      return {
        ...state,
        cartCount: state.cartCount + action.payload.count,
      };
    default:
      return state;
  }
};

export default initialReducer;
