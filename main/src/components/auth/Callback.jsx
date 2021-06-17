import React from 'react';
import { extractQueryString, TOKEN_KEY } from '../../util/constants';
import lscache from 'lscache';
import { useHistory } from 'react-router';

const ACCESS_TOKEN = 'access_token';
const TOKEN_EXPIRY = 'expires_in';

// parseInt(queryParams[TOKEN_EXPIRY] * 1000
const Callback = (props) => {
  console.log('window', window.reload);
  // If a Cognito auth code is in the URL (could be a hash or query component), init the new session

  console.log('propsxxxxxx', props);
  if (props.location.pathname) {
    console.log('prop:', props);
    const queryParams = extractQueryString(props.location.pathname);
    console.log('queryParams', queryParams);
    if (ACCESS_TOKEN in queryParams) {
      lscache.set(TOKEN_KEY, queryParams[ACCESS_TOKEN]);
    } else {
      if (lscache.get(TOKEN_KEY)) {
        lscache.remove(TOKEN_KEY);
        window.location.reload();
      }
    }
  }

  return <div>Welcome</div>;
};

export default Callback;
