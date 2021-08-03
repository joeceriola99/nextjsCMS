import {
  SET_USER,
  SET_MAIN_SEARCH,
  SET_LOADING,
  SET_CURRENT_RESTAURANT,
  SET_BELL_COUNT,
  SET_SEARCH,
  SET_RESTAURANT_PRODUCTS,
  SET_VOICE_PHONE_NUMBER,
  SET_VOICE_DELIVERY,
  SET_SHOULD_RELOAD,
  SET_SELECTED_SERVICE_OPTION,
  SET_ORDER_PROCESSING_DATE,
  SET_SELECTED_ADDRESS,
} from "../actionTypes";
export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};

export const setMainSearch = (payload) => {
  return {
    type: SET_MAIN_SEARCH,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setRestaurantProducts = (payload) => {
  return {
    type: SET_RESTAURANT_PRODUCTS,
    payload,
  };
};
export const setBellCount = (payload) => {
  return {
    type: SET_BELL_COUNT,
    payload,
  };
};

export const setCurrentRestaurant = (payload) => {
  return {
    type: SET_CURRENT_RESTAURANT,
    payload,
  };
};

export const setSearch = (payload) => {
  return {
    type: SET_SEARCH,
    payload,
  };
};

export const setVoicePhoneNumber = (payload) => {
  return {
    type: SET_VOICE_PHONE_NUMBER,
    payload,
  };
};

export const setVoiceDelivery = (payload) => {
  return {
    type: SET_VOICE_DELIVERY,
    payload,
  };
};

export const setShouldReload = (payload) => {
  return {
    type: SET_SHOULD_RELOAD,
    payload,
  };
};

export const setSelectedServiceOption = (payload) => {
  return {
    type: SET_SELECTED_SERVICE_OPTION,
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
