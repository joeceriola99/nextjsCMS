import { SET_USER, SET_ORDER_PROCESSING_DATE, SET_SELECTED_ADDRESS } from '../actionTypes';

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};

export const setOrderProcessingDate = (payload) => {
  return {
    type: SET_ORDER_PROCESSING_DATE,
    payload,
  };
};

export const setSelectedAddress = (payload) => {
  return {
    type: SET_SELECTED_ADDRESS,
    payload,
  };
};
