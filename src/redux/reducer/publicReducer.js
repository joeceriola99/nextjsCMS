import moment from "moment";
import {
  SET_USER,
  SET_MAIN_SEARCH,
  SET_CURRENT_RESTAURANT,
  SET_SEARCH,
  SET_RESTAURANT_PRODUCTS,
  SET_VOICE_PHONE_NUMBER,
  SET_VOICE_DELIVERY,
  SET_SELECTED_SERVICE_OPTION,
  SET_ORDER_PROCESSING_DATE,
  SET_SELECTED_ADDRESS,
} from "../actionTypes";
const initialState = {
  count: 0,
  user: null,
  search: "",
  filterBy: "",
  mainSearch: "",
  loading: false,
  currentRestaurant: "",
  bellCount: 0,
  restaurantProducts: [],
  voicePhoneNumber: "",
  voiceDelivery: false,
  shouldReload: false,
  orderProcessingDate: moment().add(20, "minutes"),
  orderProcessingType: true, //true pickup delivery false
  selectedAddress: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "COUNT_UP": {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case SET_CURRENT_RESTAURANT: {
      return {
        ...state,
        currentRestaurant: payload,
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }

    case SET_RESTAURANT_PRODUCTS: {
      return {
        ...state,
        restaurantProducts: payload,
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

    case "SET_LOADING": {
      return {
        ...state,
        loading: payload,
      };
    }

    case "UNLOAD": {
      return {
        ...state,
        loading: false,
      };
    }

    case "TOGGLE_DARKMODE": {
      return {
        ...state,
        darkMode: payload,
      };
    }

    case SET_SEARCH: {
      return {
        ...state,
        search: payload,
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        filterBy: payload,
      };
    }

    case SET_MAIN_SEARCH: {
      return {
        ...state,
        mainSearch: payload,
      };
    }

    case SET_VOICE_PHONE_NUMBER: {
      return {
        ...state,
        voicePhoneNumber: payload,
      };
    }

    case SET_VOICE_DELIVERY: {
      return {
        ...state,
        voiceDelivery: true,
      };
    }

    case SET_SELECTED_SERVICE_OPTION: {
      return {
        ...state,
        orderProcessingType: payload,
      };
    }

    default:
      return state;
  }
}
