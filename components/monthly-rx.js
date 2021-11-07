import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyRx = (doctor_data) => {

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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

  return <Bar data={data} options={options} />

};

export default MonthlyRx;