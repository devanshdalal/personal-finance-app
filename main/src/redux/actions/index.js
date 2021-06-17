import {
  GET_FUNDS,
  PUT_BASKET,
  DELETE_BASKET,
  GET_BASKETS,
} from '../constants/actionTypes';

export const getFundsAction = () => ({
  type: GET_FUNDS,
});

export const getBasketsAction = () => ({
  type: GET_BASKETS,
});

export const putBasketAction = (payload) => ({
  type: PUT_BASKET,
  payload,
});

export const deleteBasketAction = (payload) => ({
  type: DELETE_BASKET,
  payload,
});
