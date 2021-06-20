import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS,
  GET_FUNDS,
  PUT_BASKET,
  DELETE_BASKET,
  GET_BASKETS_SUCCESS,
  PUT_BASKET_SUCCESS,
  DELETE_BASKET_SUCCESS,
} from '../constants/actionTypes';
import get from 'lodash/get';
import assert from 'assert';
import dbClient from '../../util/cachingClient';
import lscache from 'lscache';
import { TOKEN_KEY } from '../../util/constants';

const getTokenOpts = () => {
  const accessToken = lscache.get(TOKEN_KEY)
  return {
    path: accessToken? '': '/noauth',
    headers : {Authorization: accessToken}
  }
}

const deleteLocalToken = (err) => {
  console.log('err', err)
  if (lscache.get(TOKEN_KEY)) {
    lscache.remove(TOKEN_KEY)
  }
}

export const getBaskets = (state) => state.baskets;
// export const getBasketsToName = (state) => state.basketsToName;

export function* GetFundsOp() {
  const tokenOpts = getTokenOpts()
  const options = {
    method: 'get',
    path : tokenOpts.path,
    queryParams: {table: "funds"},
    headers: tokenOpts.headers,
    handler: deleteLocalToken
  };
  const res = yield call(dbClient, options);
  yield put({
    type: GET_FUNDS_SUCCESS,
    payload: res.data,
  });
}

export function* GetBasketsOp() {
  const tokenOpts = getTokenOpts()
  const options = {
    method: 'get',
    path : tokenOpts.path,
    queryParams: {table: "baskets"},
    headers: tokenOpts.headers,
    handler: deleteLocalToken
  };
  const res = yield call(dbClient, options);
  yield put({
    type: GET_BASKETS_SUCCESS,
    payload: res.data,
  });
}

export function* PutBasketOp(action) {
  const tokenOpts = getTokenOpts()
  console.log('action:', action);

  // const basketsToName = yield select(getBasketsToName);
  const options = {
    method: 'put',
    path : tokenOpts.path + '/basket',
    headers: tokenOpts.headers,
    data: action.payload
  };
  // if (key in basketsToName) {
  //   const oldName = basketsToName[key];
  //   if (!get(baskets[oldName], 'permanent')) {
  //     console.log('deleting the item by key', oldName);
  //     options.method = 'DELETE';
  //     options.name = oldName;
  //     const res = yield call(dbClient, options);
  //     console.log('res', res);
  //     yield put({
  //       type: DELETE_BASKET_SUCCESS,
  //       payload: oldName,
  //     });
  //   }
  // }
  const res = yield call(dbClient, options);
  console.log('res', res);
  yield put({
    type: PUT_BASKET_SUCCESS,
    payload: action.payload,
  });
}

export function* DeleteBasketOp(action) {
  // DELETE_BASKET
  const name = action.payload;
  const baskets = yield select(getBaskets); // <-- get the baskets
  assert(name in baskets);
  if (baskets[name].permanent) {
    return;
  } else {
    action['permanent'] = false;
  }
  const options = {
    method: 'delete',
    path : '/basket',
    data: {name: action.payload},
  };
  const res = yield call(dbClient, options);
  yield put({
    type: DELETE_BASKET_SUCCESS,
    payload: action.payload,
  });
}

export default function* root() {
  yield all([
    takeLatest([GET_FUNDS], () => GetFundsOp()),
    takeLatest([GET_BASKETS], () => GetBasketsOp()),
    // takeLatest([PUT_BASKET], () => PutBasketOp({})),
    takeEvery([PUT_BASKET], (action) => PutBasketOp(action)),
    takeLatest([DELETE_BASKET], (action) => DeleteBasketOp(action)),
  ]);
}
