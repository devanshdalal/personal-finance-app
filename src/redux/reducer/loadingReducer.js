import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS_SUCCESS,
  PUT_BASKET,
  PUT_BASKET_SUCCESS,
  DELETE_BASKET,
  DELETE_BASKET_SUCCESS,
} from '../constants/actionTypes';

import omit from 'lodash/omit';

const initialState = {
  funds: {},
  baskets: {},
  basketsModifiedAt: new Date(),
};

const makeNamedState = (table) => {
  let mapped = {};
  table.Items.forEach((e) => {
    mapped[e.name] = omit(e, 'name');
  });
  return mapped;
};

// const computeBasketsToName = (baskets) => {
//   let mapped = {};
//   Object.keys(baskets).forEach((e) => {
//     const { schemes } = baskets[e];
//     mapped[JSON.stringify(schemes)] = e;
//   });
//   return mapped;
// };

const loadingReducer = (state = initialState, action) => {
  console.log('loadingReducer: ', action);
  switch (action.type) {
    case GET_FUNDS_SUCCESS: {
      return { ...state, funds: makeNamedState(action.payload) };
    }
    case GET_BASKETS_SUCCESS: {
      const baskets = makeNamedState(action.payload);
      return {
        ...state,
        baskets,
      };
    }
    case PUT_BASKET_SUCCESS: {
      // const { name, schemes, permanent } = action.payload;
      // console.log('schemes', schemes);
      // const key = JSON.stringify(schemes);
      return Object.assign({}, state, {
        basketsModifiedAt: new Date(),
      });
    }
    case DELETE_BASKET_SUCCESS: {
      // const { schemes } = state.baskets[action.payload];
      // const key = JSON.stringify(schemes);
      return Object.assign({}, state, {
        basketsModifiedAt: new Date(),
      });
    }
    default: {
      return state;
    }
  }
};

export default loadingReducer;
