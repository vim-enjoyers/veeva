import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyRx = ( doctor_data ) => {

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: doctor_data.data,
        borderWidth: 1,
      },
    ],
  };

  return (
  <>
    <div className='header'>

    </div>
    <Bar data={data} options={options} />
  </>
)};

export default MonthlyRx;