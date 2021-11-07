import React from "react";
import { Bar } from 'react-chartjs-2';

const CountryDrugGrowthRates = (growth_rates) => {

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: ['Drug 1', 'Drug 2', 'Drug 3', 'Drug 4'],
    datasets: [
      {
        label: 'Average NRx Growth Rate',
        data: growth_rates.data,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className='header'>

      </div>
      {/* {console.log(growth_rates)} */}
      <Bar data={data} options={options} />
    </>
  )
};

export default CountryDrugGrowthRates