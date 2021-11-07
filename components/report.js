import MonthlyRx from './monthly-rx.js'
import PopularRx from './popular-rx.js'

const Report = ({ data }) => {
  return (
    <div className="px-12">

      <p>The first doctor's name is {data[0].first_name}.</p>

      <p>First doctor's monthly new prescriptions</p>
      <ShowNewMonthly data={data} />


      <p>First doctor's monthly total prescriptions</p>
      <ShowTotalMonthly data={data} />

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

const ShowTotalMonthly = ({ data }) => {
  const doctor = data[0];
  return (
    <div>
      <MonthlyRx data={doctor.total_rx} />
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
      const tempNew = newMap.get(data[i].product);
      for (let j = 0; j < tempTotal.length; j++) {
        tempTotal[j] += data[i].total_rx[j];
        tempNew[j] += data[i].new_rx[j];
      }
      totalMap.set(data[i].product, tempTotal);
      newMap.set(data[i].product, tempNew);
      // console.log(totalMap);
      // console.log(newMap);
    }
  }
  return (
    <div>
      <PopularRx totalMap={totalMap} newMap={newMap} />
    </div>
  )
}


export default Report