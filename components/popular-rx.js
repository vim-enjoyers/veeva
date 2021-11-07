import React from 'react';
import { Line } from 'react-chartjs-2';

const PopularRx = ({ totalMap }) => {

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Cholecap',
        data: totalMap.get('Cholecap'),
        backgroundColor: [
          'rgba(54, 162, 235, 0.3)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Zap-a-Pain',
        data: totalMap.get('Zap-a-Pain'),
        backgroundColor: [
          'rgba(225, 84, 84, 0.3)',
        ],
        borderColor: [
          'rgba(225, 84, 84, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Nasalclear',
        data: totalMap.get('Nasalclear'),
        backgroundColor: [
          'rgba(111,222, 84, 0.3)',
        ],
        borderColor: [
          'rgba(111,222, 84, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Nova-itch',
        data: totalMap.get('Nova-itch'),
        backgroundColor: [
          'rgba(255, 205, 102, 0.3)',
        ],
        borderColor: [
          'rgba(255, 205, 102, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className='header'>

      </div>
      {console.log(totalMap)}
      <Line data={data} options={options} />
    </>
  )
};

export default PopularRx;