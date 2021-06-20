import React from 'react';
import { extractQueryString, TOKEN_KEY } from '../../util/constants';
import lscache from 'lscache';
import { useHistory } from 'react-router';

const ACCESS_TOKEN = 'access_token';
const TOKEN_EXPIRY = 'expires_in';

// parseInt(queryParams[TOKEN_EXPIRY] * 1000
const Callback = (props) => {
  console.log(
    'REACT_APP_AUTH_CALLBACK_URL',
    process.env.REACT_APP_AUTH_CALLBACK_URL
  );
  // If a Cognito auth code is in the URL (could be a hash or query component), init the new session

  // console.log('propsxxxxxx', props);
  if (props.location.pathname) {
    // console.log('props.location', props.location);
    if (props.location.search === '?logout') {
      if (lscache.get(TOKEN_KEY)) {
        lscache.remove(TOKEN_KEY);
        window.location.reload();
      }
    } else {
      const queryParams = extractQueryString(props.location.pathname);
      console.log('queryParams', queryParams);
      if (ACCESS_TOKEN in queryParams) {
        lscache.set(TOKEN_KEY, queryParams[ACCESS_TOKEN]);
      }
    }
  }

  return (
    <div>
      <p>
        The trend of investing in mutual funds in developing economies has been
        observed to shift towards less and less avtively managed instruments,
        i.e. index ETF, stocks, index investing. &nbsp;
        <a href='https://www.investopedia.com/articles/investing/030916/buffetts-bet-hedge-funds-year-eight-brka-brkb.asp'>
          Buffett&rsquo;s Bet Win
        </a>
        &nbsp; provides some postivive validations for this.
      </p>
      <figure className='quote'>
        <blockquote>
          The AUM of the Indian MF Industry has grown from ₹ 7.31 trillion as on
          May 31, 2011 to ₹33.06 trillion as on May 31, 2021 more than{' '}
          <strong>4½</strong> fold increase in a span of 10 years.
        </blockquote>
        <figcaption>
          &mdash;{' '}
          <a href='https://www.amfiindia.com/indian-mutual'>AMFI India</a>{' '}
        </figcaption>
      </figure>
      <p>
        In developing economies like India, with average 1% asset management fee
        for direct funds, there is a strong need of asset fee light and
        risk-averse investing instruments. For e.g., there is no real small cap
        index to follow, so one is left with only market indices for investing.
        But, here you can create weighted baskets of managed mutual funds to
        track their portfolio and possibly mirror them yourself. Some of them
        are already created for instance.
      </p>
    </div>
  );
};

export default Callback;
