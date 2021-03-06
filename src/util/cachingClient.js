// import lscache from 'lscache';

import axios from 'axios';

const APP_HOST = process.env.REACT_APP_HOST;

// const LSCACHE_TIMEOUT = 1; // minutes

const dbClient = (options) => {
  console.log('dbClient.options:', options);
  const { method, queryParams = {}, /*cache,*/ path = '', headers = {}, data={}, handler } = options;

  const p = axios({
    method: method,
    baseURL: APP_HOST,
    url: path,
    params: queryParams,
    data: data,
    headers
  })
  p.catch(err => {
    console.log('err', err)
    handler(err)
  })
  return p
};

export default dbClient;
