import React from 'react';
import { useMemo } from 'react';
import { Pie, Bar, Radar, Doughnut } from 'react-chartjs-2';

const backgroundColor = ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'];
const hoverBackgroundColor = [
  '#501800',
  '#4B5000',
  '#175000',
  '#003350',
  '#35014F',
];

const ChartViz = ({ labels, weights, chart, description }) => {
  // console.log('labels', labels, 'weights', weights);
  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: description,
          backgroundColor: [...Array(labels.length)].map(
            (e, i) => backgroundColor[i % backgroundColor.length]
          ),
          hoverBackgroundColor: [...Array(labels.length)].map(
            (e, i) => hoverBackgroundColor[i % backgroundColor.length]
          ),
          data: weights,
        },
      ],
    };
  }, [labels, weights, description]);

  // console.log('chartData', chart);

  return (
    <div>
      {chart === 'bar' && (
        <div className='bar-chart'>
          <Bar
            data={chartData}
            options={{
              title: {
                display: true,
                text: description,
                fontSize: 20,
              },
              legend: {
                display: false,
                position: 'right',
              },
            }}
          />
        </div>
      )}
      {chart === 'pie' && (
        <div className='pie-chart'>
          <Pie
            data={chartData}
            options={{
              title: {
                display: true,
                text: description,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'bottom',
                maxWidth: 100,
              },
            }}
          />
        </div>
      )}
      {chart === 'doughnut' && (
        <div className='doughnut-chart'>
          <Doughnut
            data={chartData}
            options={{
              title: {
                display: true,
                text: description,
                fontSize: 20,
              },
              legend: {
                display: false,
                // position: 'right',
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChartViz;
