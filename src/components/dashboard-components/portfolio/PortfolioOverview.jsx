import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../util/cachingClient';
import { Bar } from 'react-chartjs-2';
import { getBasketPortfolio } from '../../../util/weightedPortfolio';
import ChartViz from './ChartViz';
import { Row, Col } from 'reactstrap';

const PortfolioOverview = ({ portfolio }) => {
  const funds = useSelector((state) => state.funds);

  const [labels, weights, sectorLabels, sectorWt] = useMemo(() => {
    if (funds && portfolio) {
      const { overview, sectorDist } = getBasketPortfolio(portfolio, funds);
      return [
        overview.map((v) => v.stock),
        overview.map((v) => v.wt),
        sectorDist.map((v) => v.sector),
        sectorDist.map((v) => v.wt),
      ];
    }
  }, [funds, portfolio]);

  // console.log('portfolio', portfolio);

  const [flabels, fweights] = useMemo(() => {
    if (portfolio) {
      return [portfolio.map((v) => v.name), portfolio.map((v) => v.wt)];
    }
  }, [portfolio]);

  return (
    <div>
      <Row>
        <Col sm={6} lg={6}>
          <ChartViz
            labels={flabels}
            weights={fweights}
            chart={'pie'}
            description={'Basket Portfolio'}
          />
        </Col>
        <Col sm={6} lg={6}>
          <ChartViz
            labels={sectorLabels}
            weights={sectorWt}
            chart={'doughnut'}
            description={'Sectors'}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ChartViz
            labels={labels}
            weights={weights}
            chart={'bar'}
            description={'Major Stock Composition'}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PortfolioOverview;
