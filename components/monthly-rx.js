import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyRx = (doctor_data) => {

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
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Prescriptions',
        data: doctor_data.data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.3)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1.2,
      },
    ],
  };

  return (
    <>
      <div className="py-8">
        <div className="">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  )
};

export default MonthlyRx;