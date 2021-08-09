import moment from 'moment';
import { SET_USER, SET_ORDER_PROCESSING_DATE, SET_SELECTED_ADDRESS } from '../actionTypes';
const initialState = {
  user: null,
  currentRestaurant: '',
  orderProcessingDate: moment().add(20, 'minutes'),
  selectedAddress: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }

    case SET_ORDER_PROCESSING_DATE: {
      return {
        ...state,
        orderProcessingDate: payload,
      };
    }

    case SET_SELECTED_ADDRESS: {
      return {
        ...state,
        selectedAddress: payload,
      };
    }

    default:
      return state;
  }
}
