/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Sidebar from '../components/sidebar/sidebar.jsx';
import Footer from '../components/footer/footer.jsx';
import ThemeRoutes from '../routes/routing.jsx';
import {
  getFundsAction,
  putBasketAction,
  getBasketsAction,
} from '../redux/actions';
import BasketViz from '../components/ui-components/BasketViz.jsx';
import FundsForm from '../components/helper/FundsForm.jsx';

const Fulllayout = (props) => {
  /*--------------------------------------------------------------------------------*/
  /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
  /*--------------------------------------------------------------------------------*/
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const basketsModifiedAt = useSelector((state) => state.basketsModifiedAt);
  const baskets = useSelector((state) => state.baskets);

  props.history.listen((location, action) => {
    if (
      window.innerWidth < 767 &&
      document
        .getElementById('main-wrapper')
        .className.indexOf('show-sidebar') !== -1
    ) {
      document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }
  });

  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  useEffect(() => {
    const updateDimensions = () => {
      let element = document.getElementById('main-wrapper');
      setWidth(window.innerWidth);
      if (width < 1170) {
        element.setAttribute('data-sidebartype', 'mini-sidebar');
        element.classList.add('mini-sidebar');
      } else {
        element.setAttribute('data-sidebartype', 'full');
        element.classList.remove('mini-sidebar');
      }
    };
    if (document.readyState === 'complete') {
      updateDimensions();
    }
    window.addEventListener('resize', updateDimensions.bind(this));
    window.addEventListener('load', updateDimensions.bind(this));
    return () => {
      window.removeEventListener('load', updateDimensions.bind(this));
      window.removeEventListener('resize', updateDimensions.bind(this));
    };
  }, [width]);

  /*--------------------------------------------------------------------------------*/
  /*Functions that handles fetching the funds from backend                          */
  /*--------------------------------------------------------------------------------*/
  useEffect(() => {
    dispatch(getFundsAction());
  }, []);
  useEffect(() => {
    dispatch(getBasketsAction());
  }, [basketsModifiedAt]);

  const routes = useMemo(() => {
    let r = [];
    // console.log('baskets', baskets);
    Object.keys(baskets).forEach((key) => {
      r.push({
        path: '/' + key,
        name: key,
        icon: 'mdi mdi-adjust',
        component: BasketViz,
      });
    });
    r.push({
      path: '/ui-components/FundsForm',
      name: 'Add...',
      icon: 'mdi mdi-image-filter-vintage',
      component: FundsForm,
    });
    return r;
  }, [baskets]);
  console.log('ThemeRoutes: ', ThemeRoutes);

  /*--------------------------------------------------------------------------------*/
  /* Theme Setting && Layout Options wiil be Change From Here                       */
  /*--------------------------------------------------------------------------------*/
  return (
    <div
      id='main-wrapper'
      data-theme='light'
      data-layout='vertical'
      data-sidebartype='full'
      data-sidebar-position='fixed'
      data-header-position='fixed'
      data-boxed-layout='full'
    >
      {/*--------------------------------------------------------------------------------*/}
      {/* Header                                                                         */}
      {/*--------------------------------------------------------------------------------*/}
      <Header />
      {/*--------------------------------------------------------------------------------*/}
      {/* Sidebar                                                                        */}
      {/*--------------------------------------------------------------------------------*/}
      <Sidebar {...props} routes={routes /*ThemeRoutes*/} />
      {/*--------------------------------------------------------------------------------*/}
      {/* Page Main-Content                                                              */}
      {/*--------------------------------------------------------------------------------*/}
      <div className='page-wrapper d-block'>
        <div className='page-content container-fluid'>
          <Switch>
            {
              /*ThemeRoutes*/ [...routes, ...ThemeRoutes].map((prop, key) => {
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                } else {
                  // console.log('prop', prop);
                  return (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                }
              })
            }
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Fulllayout;
