import React from "react"
import { Doughnut } from 'react-chartjs-2'

const ProductBreakdown = ({ data }) => {
  var dataCopy = JSON.parse(JSON.stringify(data))

  // console.log(dataCopy.filter(doctor => {
  //   return (doctor.product === "Cholecap")
  // }))




  const graphdata = {
    labels: [
      'Cholecap',
      'Zap-a-Pain',
      'Nasalclear',
      'Nova-itch'
    ],
    datasets: [{
      label: 'Product Breakdown',
      data: [
        dataCopy.filter(doctor => {
          return (doctor.product === "Cholecap")
        }).reduce((previousValue, currentValue) => previousValue + currentValue.total_rx.reduce((previousValue2, currentValue2) => previousValue2 + currentValue2, 0), 0),
        dataCopy.filter(doctor => {
          return (doctor.product === "Zap-a-Pain")
        }).reduce((previousValue, currentValue) => previousValue + currentValue.total_rx.reduce((previousValue2, currentValue2) => previousValue2 + currentValue2, 0), 0),
        dataCopy.filter(doctor => {
          return (doctor.product === "Nasalclear")
        }).reduce((previousValue, currentValue) => previousValue + currentValue.total_rx.reduce((previousValue2, currentValue2) => previousValue2 + currentValue2, 0), 0),
        dataCopy.filter(doctor => {
          return (doctor.product === "Nova-itch")
        }).reduce((previousValue, currentValue) => previousValue + currentValue.total_rx.reduce((previousValue2, currentValue2) => previousValue2 + currentValue2, 0), 0)
      ],
      backgroundColor: [
        '#F7981D',
        '#3D4959',
        '#7692FF',
        '#DB6015'
      ],
    }]
  };

  return (
    <Doughnut data={graphdata} />
  )
}

export default ProductBreakdown