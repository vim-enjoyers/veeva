import React, { useState } from 'react'
import MonthlyRx from './monthly-rx.js'
import PopularRx from './popular-rx.js'
import NewPopularRx from './newpopular-rx'
import CountryDrugGrowthRates from './CountryDrugGrowthRates.js'

const Report = ({ data }) => {
  const [drugFilter, setDrugFilter] = useState("Cholecap")
  const [stateFilter, setStateFilter] = useState("Illinois")

  const generateFilters = () => {
    return (<>
      {generateDrugFilters()}
      {generateStateFilters()}
    </>)
  }

  const generateDrugFilters = () => {
    const uniqueDrugs = [...new Set(data.map(item => item.product))].sort()
    uniqueDrugs = uniqueDrugs.filter(function (element) {
      return element !== undefined;
    })
    const drugs = uniqueDrugs.map(drug => (
      <><input type="radio" name="drugs" value={drug} checked={drugFilter === drug} onChange={event => { setDrugFilter(event.target.value) }} />&nbsp;{drug}</>
    ))

    return (<>
      <label htmlFor="drugs">Products:</label>
      <input type="radio" name="drugs" value="All" checked={drugFilter === "All"} onChange={event => setDrugFilter(event.target.value)} />&nbsp;All
      {drugs}
    </>)
  }

  const generateStateFilters = () => {
    const uniqueStates = [...new Set(data.map(item => item.state))].sort()
    uniqueStates = uniqueStates.filter(function (element) {
      return element !== undefined;
    })
    const states = uniqueStates.map(state => (
      <option key={state} value={state}>{state}</option>
    ))

    return (<>
      <label htmlFor="states">State:</label>
      <select name="states" value={stateFilter} onChange={event => setStateFilter(event.target.value)}>
        <option value="All">All</option>
        {states}
      </select>
    </>)
  }

  const filterIfNecessary = (data) => {
    let result = data
    // console.log("result before: ", result)
    if (drugFilter !== "All") {
      result = result.filter(doctor => {
        // console.log(drugFilter)
        // console.log('product: ' + doctor.product)
        return (doctor.product === drugFilter)
      })
      console.log("result after: ", result)
    }
    if (stateFilter !== "All") {
      result = result.filter(doctor => doctor.state === stateFilter)
    }
    // console.log(result)
    return result
  }

  const displayFirst = () => {
    const filteredData = filterIfNecessary(data)
    console.log(filteredData[0])
    return (
      <h4>The first doctor in the array is {filteredData[0].first_name} {filteredData[0].last_name}.</h4>
    )
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Prescriber Data Report</h1>
      <h3 className="text-lg font-bold" >Generated at {/* TODO: Add time of generation. */}</h3>
      {/* <p>The first doctor's name is {data[0].first_name}.</p> */}
      <h4>Filter</h4>

      {generateFilters()}

      {displayFirst()}

      <div className="grid md:grid-cols-2 gap-8 mt-8 text-center">
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold w-full">First doctor's monthly new prescriptions</p>
          <ShowNewMonthly data={data} />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">First doctor's monthly total prescriptions</p>
          <ShowTotalMonthly data={data} />
        </div>
        {/* <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">Average Growth Rate for each Drug</p>
          <PredictBestDrug data={data} />
        </div>
        {/* <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">Total Prescriptions Per Month</p>
          <CreateTotalMostPopularDrug data={data} />
        </div> */}
        {/* <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">New Prescriptions Per Month</p>
          <CreateNewMostPopularDrug data={data} />
        </div> */}
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-xs text-bold">Top-Selling Doctors</p>
          <GetBestDoctor data={data} />
        </div>
      </div>
    </div>
  )
}

const GetBestDoctor = ({ data }) => {

  console.warn(data)

  const reducer = (previousValue, currentValue) => previousValue + currentValue
  const sortedData = data.sort((a, b) => {
    if (a.total_rx.reduce(reducer, 0) > b.total_rx.reduce(reducer, 0)) {
      return -1
    } else {
      return 1
    }
  })

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
  var map = new Map()

  var drugTypes = new Array()

  for (let i = 0; i < data.length; i++) {
    if (!map.has(data[i].product)) {
      var nrx = new Array()
      for (let j = 0; j < data[i].new_rx.length; j++) {
        nrx[j] = data[i].new_rx[j]
      }
      map.set(data[i].product, nrx)
      drugTypes.push(data[i].product)
    }

    else {
      var temp = map.get(data[i].product)
      for (let j = 0; j < temp.length; j++) {
        //If it DID contain the product, update all values.
        temp[j] += data[i].new_rx[j]
      }

      map.set(data[i].product, temp)
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
      <PopularRx totalMap={totalMap} />
    </div>
  )
}

const CreateNewMostPopularDrug = ({ data }) => {
  const newMap = new Map();
  for (let i = 0; i < data.length; i++) {
    if (!(newMap.has(data[i].product))) {
      newMap.set(data[i].product, data[i].new_rx);
    }
    else {
      const tempNew = newMap.get(data[i].product);
      for (let j = 0; j < tempNew.length; j++) {
        tempNew[j] += data[i].new_rx[j];
      }
      newMap.set(data[i].product, tempNew);
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