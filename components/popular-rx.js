import React from 'react';
import { Bar } from 'react-chartjs-2';

const PopularRx = ({ totalMap, newMap }) => {

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
                data: totalMap.get('Cholecap'),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className='header'>

            </div>
            {console.log(totalMap)}
            <Bar data={data} options={options} />
        </>
    )
};

export default PopularRx;