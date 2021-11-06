import MonthlyRx from './monthly-rx.js'

const Report = ({ data }) => {
  return (
    <div>

      <p>The first doctor's name is {data[0].first_name}.</p>

      <ShowNewMonthly data={data} />
      <CreateMostPopularDrug data={data} />

    </div>

  )
}

const ShowNewMonthly = ({ data }) => {
  const doctor = data[0];
  return (
    <div>
      <MonthlyRx data={doctor.new_rx} />
    </div>
  )
}

const CreateMostPopularDrug = ({ data }) => {
  const totalMap = new Map();
  const newMap = new Map();
  for (let i = 0; i < data.length; i++) {
    if (!(totalMap.has(data[i].product))) {
      totalMap.set(data[i].product, data[i].total_rx);
      newMap.set(data[i].product, data[i].new_rx);
    }
    else {
      const tempTotal = totalMap.get(data[i].product)
      const tempNew = newMap.get(data[i].product)
      for (let j = 0; j < tempTotal.length; j++) {
        tempTotal += data[i].total_rx[j]
        tempNew += data[i].new_rx[j]
      }
      totalMap.set(data[i].product, tempTotal);
      newMap.set(data[i].product, tempNew)
    }
  }
  return (
    <div>
      <p>{totalMap.get('Cholecap')[0]}</p>
    </div>
  )
}


export default Report