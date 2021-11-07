import MonthlyRx from './monthly-rx.js'
import PopularRx from './popular-rx.js'
import NewPopularRx from './newpopular-rx'
import CountryDrugGrowthRates from './CountryDrugGrowthRates.js'

const Report = ({ data }) => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Prescriber Data Report</h1>
      <h3 className="text-lg font-bold" >Generated at {/* TODO: Add time of generation. */}</h3>
      {/* <p>The first doctor's name is {data[0].first_name}.</p> */}
      <div className="grid md:grid-cols-2 gap-8 mt-8 text-center">
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold w-full">First doctor's monthly new prescriptions</p>
          <ShowNewMonthly data={data} />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">First doctor's monthly total prescriptions</p>
          <ShowTotalMonthly data={data} />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">Average Growth Rate for each Drug</p>
          <PredictBestDrug data={data} />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">Total Prescriptions Per Month</p>
          <CreateTotalMostPopularDrug data={data} />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">New Prescriptions Per Month</p>
          <CreateNewMostPopularDrug data={data} />
        </div>
        <div className="flex flex-col space-y-4">
        <p className="uppercase text-xs text-bold">Top-Selling Doctors</p>
          <GetBestDoctor data={data} />
        </div>
      </div>
    </div>
  )
}

const GetBestDoctor = ( {data} ) => {

  console.warn(data)

  const reducer = (previousValue, currentValue) => previousValue + currentValue
  const sortedData = data.sort((a,b)=>{
    if (a.total_rx.reduce(reducer, 0) > b.total_rx.reduce(reducer, 0)) {
      return -1
    } else {
      return 1
  }})

  return (
    <div className="flex justify-center">
      <table className="table-auto border border-black">
        <tr className="font-bold">
          <th>Doctor</th>
          <th>Total Drugs Sold</th>
        </tr>
        <tr>
          <td>{sortedData[0].first_name + " " + sortedData[0].last_name}</td>
          <td>{sortedData[0].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
        <tr>
          <td>{sortedData[1].first_name + " " + sortedData[1].last_name}</td>
          <td>{sortedData[1].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
        <tr>
          <td>{sortedData[2].first_name + " " + sortedData[2].last_name}</td>
          <td>{sortedData[2].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
        <tr>
          <td>{sortedData[3].first_name + " " + sortedData[3].last_name}</td>
          <td>{sortedData[3].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
        <tr>
          <td>{sortedData[4].first_name + " " + sortedData[4].last_name}</td>
          <td>{sortedData[4].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
      </table>
    </div>
  )
}

const PredictBestDrug = (data) => {

  //Key: Product, Value: Sums of Each Month

  var dataCopy = JSON.parse(JSON.stringify(data));

  var map = new Map()

  var drugTypes = new Array()

  for (let i = 0; i < dataCopy.length; i++) {
    if (!map.has(dataCopy[i].product)) {
      var nrx = new Array()
      for (let j = 0; j < dataCopy[i].new_rx.length; j++) {
        nrx[j] = dataCopy[i].new_rx[j]
      }
      map.set(dataCopy[i].product, nrx)
      drugTypes.push(dataCopy[i].product)
    }

    else {
      var temp = map.get(dataCopy[i].product)
      for (let j = 0; j < temp.length; j++) {
        //If it DID contain the product, update all values.
        temp[j] += dataCopy[i].new_rx[j]
      }

      map.set(dataCopy[i].product, temp)
    }

    var growth_rates = new Array()
    var nrxSums

    for (let p = 0; p < map.length; p++) {
      nrxSums = map.get(drugTypes[p])

      sum = 0
      for (let k = 0; k < nrxSums.length - 1; k++) {
        sum += ((nrxSums[k + 1] - nrxSums[k]) / nrxSums[k])
      }
      growth_rates.push((sum / 5))
    }
  }

  return (
    <div>
      <CountryDrugGrowthRates data={growth_rates} />
    </div>
  )
}

const ShowNewMonthly = ({ data }) => {
  const doctor = data[0]
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

const CreateTotalMostPopularDrug = ({ data }) => {
  var dataCopy = JSON.parse(JSON.stringify(data));

  const totalMap = new Map();
  const newMap = new Map();
  for (let i = 0; i < dataCopy.length; i++) {
    if (!(totalMap.has(dataCopy[i].product))) {
      totalMap.set(dataCopy[i].product, dataCopy[i].total_rx);
      newMap.set(dataCopy[i].product, dataCopy[i].new_rx);
    }
    else {
      const tempTotal = totalMap.get(dataCopy[i].product)
      const tempNew = newMap.get(dataCopy[i].product);
      for (let j = 0; j < tempTotal.length; j++) {
        tempTotal[j] += dataCopy[i].total_rx[j];
        tempNew[j] += dataCopy[i].new_rx[j];
      }
      totalMap.set(dataCopy[i].product, tempTotal);
      newMap.set(dataCopy[i].product, tempNew);
      // console.log(totalMap);
      // console.log(newMap);
    }
  }
  return (
    <div>
      <PopularRx totalMap={totalMap} />
    </div>
  )
}

const CreateNewMostPopularDrug = ({ data }) => {
  var dataCopy = JSON.parse(JSON.stringify(data));

  const newMap = new Map();
  for (let i = 0; i < dataCopy.length; i++) {
    if (!(newMap.has(dataCopy[i].product))) {
      newMap.set(dataCopy[i].product, dataCopy[i].new_rx);
    }
    else {
      const tempNew = newMap.get(dataCopy[i].product);
      for (let j = 0; j < tempNew.length; j++) {
        tempNew[j] += dataCopy[i].new_rx[j];
      }
      newMap.set(dataCopy[i].product, tempNew);
      // console.log(totalMap);
      // console.log(newMap);
    }
  }
  return (
    <div>

      <NewPopularRx newMap={newMap} />
    </div>
  )
}

export default Report