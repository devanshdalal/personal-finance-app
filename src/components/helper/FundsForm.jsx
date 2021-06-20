import React, { useState, useRef, useEffect } from 'react';
import Table from './Table';
import FundInput from './FundInput';
import PortfolioOverview from '../dashboard-components/portfolio/PortfolioOverview';
import { get, omit } from 'lodash';
import SaveForm from '../dashboard-components/portfolio/SaveForm';
import { useDispatch } from 'react-redux';
import { putBasketAction } from '../../redux/actions';
import { TOKEN_KEY, HOSTED_UI } from '../../util/constants';
import lscache from 'lscache';

const upsert = (array, item) => {
  const i = array.findIndex((_item) => _item.name === item.name);
  if (i > -1) {
    const ret = array.slice();
    ret[i] = { ...item, id: i };
    return ret;
  }
  return [...array, { ...item, id: array.length + 1 }];
};

const FundsForm = (props) => {
  useEffect(() => {
    // console.log('props', props);
    const token = lscache.get(TOKEN_KEY);
    if (!token) {
      // console.log('HOSTED_UI:', HOSTED_UI);
      window.location.href = HOSTED_UI;
    }
  }, []);
  const [portfolio, setPortfolio] = useState([]);
  const [currentRow, setCurrentRow] = useState({
    name: '',
    wt: null,
  });
  const weightRef = useRef();
  const nameRef = useRef();
  const dispatch = useDispatch();

  const onChangeRow = (row) => {
    if (row) {
      // console.log('row', row);
      setCurrentRow({
        name: get(row, 'value', currentRow.name),
        wt: parseFloat(get(row, 'target.value', get(currentRow, 'wt')), 10),
      });
    }
  };

  const onSubmitRow = (event) => {
    event.preventDefault();
    const { name, wt } = currentRow;
    if (name && wt) {
      setPortfolio(upsert(portfolio, { name, wt }));
      setCurrentRow({
        name: '',
        wt: null,
      });
      weightRef.current.value = '';
      // console.log('nameRef.current', nameRef.current, portfolio);
      nameRef.current.select.clearValue();
    }
  };

  const deleteFund = (key) => {
    const newPortfolio = Array.from(portfolio);
    newPortfolio.splice(key, 1);
    setPortfolio(newPortfolio);
  };

  const saveHandler = (name) => {
    // const { basketsToName} = this.props
    // const basket = this.convertStateData(this.state.formIndex, this.state.form);
    const basket = {
      name,
      schemes: portfolio.map((key) => omit(key, 'id')),
    };
    // console.log('putBasket:', basket);
    dispatch(putBasketAction(basket));
    // this.props.putBasket({ name, schemes: basket, permanent: false });
  };

  return (
    <div>
      <FundInput
        weightRef={weightRef}
        nameRef={nameRef}
        currentRow={currentRow}
        onChange={onChangeRow}
        onSubmit={onSubmitRow}
      />
      {portfolio.length !== 0 && (
        <div>
          <Table elements={portfolio} deleteElement={deleteFund} />
          <PortfolioOverview portfolio={portfolio} />
          <SaveForm saveHandler={saveHandler} />
        </div>
      )}
      {/* <button
        type='submit'
        className='add-button'
        value='Submit'
        onClick={onSubmitTest}
      ></button> */}
    </div>
  );
};

export default FundsForm;

// UseSelector, UseDispach
