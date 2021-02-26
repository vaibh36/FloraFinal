export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";
export const CLEAR_CART = "CLEAR_CART";
export const LOGIN_MODAL = "LOGIN_MODAL";
export const PLANT_TYPE = 'PLANT_TYPE';

export const addItems =(payload) => {
    console.log('Payload id to be added is:-', payload);
    return { type: ADD_ITEM, payload }
  };

  export const removeItem =(payload) => {
    console.log('Payload id to be removed is:-', payload);
    return { type: REMOVE_ITEM, payload }
  };

  export const clearCart =() => {
    console.log('Payload id to be removed is:-');
    return { type: CLEAR_CART }
  };

  export const setUser =(payload) => {
    console.log('Payload of the user is:-', payload);
    return { type: SET_USER,
    payload,
    }
  }

  export const setLoginModal =() => {
    console.log('Payload id to be removed is:-');
    return { type: LOGIN_MODAL }
  };

  export const setPlantType = (payload)=>{
    console.log('Plants data in action is:-', payload);
    return {
        type: PLANT_TYPE,
        payload
    }
  }