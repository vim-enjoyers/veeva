import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyRx = ({ doctor_data }) => {
  console.log(doctor_data)
  const dataCopy = JSON.parse(JSON.stringify(doctor_data))
  console.log(dataCopy)
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
        label: 'Total Prescriptions',
        data: dataCopy[0].total_rx,
        backgroundColor: [
          '#F7981D',
        ],
        borderColor: [
          '#F7981D',
        ],
        borderWidth: 1.2,
      },
      {
        label: 'New Prescriptions',
        data: dataCopy[0].new_rx,
        backgroundColor: [
          '#7692FF',
        ],
        borderColor: [
          '#7692FF',
        ],
        borderWidth: 1.2,
      },
    ],
  };

  return <Bar data={data} options={options} />

};

export default MonthlyRx;