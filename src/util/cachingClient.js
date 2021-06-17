// import lscache from 'lscache';

import axios from 'axios';

const APP_HOST = process.env.REACT_APP_HOST;

// const LSCACHE_TIMEOUT = 1; // minutes

const dbClient = (options) => {
  console.log('dbClient.options', options);
  const { method, queryParams = {}, /*cache,*/ path = '', headers = {}, data={}, handler } = options;

  try {
    return axios({
      method: method,
      baseURL: APP_HOST,
      url: path,
      params: queryParams,
      data: data,
      headers
    })
    
    // lscache.set(table, response, LSCACHE_TIMEOUT);
  } catch (err) {
    if(handler) handler(err)
  }
};

export default dbClient;
