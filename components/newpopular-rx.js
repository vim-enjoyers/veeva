import React from 'react';
import { Line } from 'react-chartjs-2';

const NewPopularRx = ({ newMap, drugFilter }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const allDatasets = [
    {
      label: 'Cholecap',
      data: newMap.get('Cholecap'),
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
      data: newMap.get('Zap-a-Pain'),
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
      data: newMap.get('Nasalclear'),
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
      data: newMap.get('Nova-itch'),
      backgroundColor: [
        'rgba(255, 205, 102, 0.3)',
      ],
      borderColor: [
        'rgba(255, 205, 102, 1)',
      ],
      borderWidth: 1,
    },
  ].filter(dataset => {
    return (drugFilter === "All" || dataset.label === drugFilter)
  })

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: allDatasets,
  };

  return (
    <>
      <div className='header'>

      </div>
      {/* {console.log(newMap)} */}
      <Line data={data} options={options} />
    </>
  )
};

export default NewPopularRx;