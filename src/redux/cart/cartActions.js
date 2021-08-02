import { ADD_CART } from '../actionTypes';

export const addtoCart = (params) => {
  console.log('Cart Action addrocart', params);
  return async (dispatch) => {
    dispatch({
      type: ADD_CART,
      payload: { count: params },
    });
  };
};
