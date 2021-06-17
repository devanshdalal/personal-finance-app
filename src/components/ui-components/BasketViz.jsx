import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import PortfolioOverview from '../dashboard-components/portfolio/PortfolioOverview';
import { get } from 'lodash';

const BasketViz = (props) => {
  // console.log('props', props);
  const basket = useSelector((state) => {
    const basketName = props.location.pathname.substring(1);
    // console.log('basketName', basketName);
    return get(state.baskets, basketName);
  });

  return basket && <PortfolioOverview portfolio={basket.schemes} />;
  // return <div>Welcome</div>;
};

export default BasketViz;
