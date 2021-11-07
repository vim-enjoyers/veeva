import React, { useState } from 'react'
import MonthlyRx from './monthly-rx.js'
import PopularRx from './popular-rx.js'
import NewPopularRx from './newpopular-rx'
import CountryDrugGrowthRates from './CountryDrugGrowthRates.js'
import { forIn } from 'lodash'

const Report = ({ data }) => {
  const [drugFilter, setDrugFilter] = useState("All")
  const [stateFilter, setStateFilter] = useState("All")

  const generateFilters = () => {
    return (<>
      <div className="my-4 flex flex-col space-y-4">
        <h4>Filter Results</h4>
        <div className="flex flex-col">
          {generateDrugFilters()}
        </div>
        <div className="flex flex-col">
          {generateStateFilters()}
        </div>
      </div>
    </>)
  }

  const generateDrugFilters = () => {
    const uniqueDrugs = [...new Set(data.map(item => item.product))].sort()
    uniqueDrugs = uniqueDrugs.filter(function (element) {
      return element !== undefined;
    })
    const drugs = uniqueDrugs.map(drug => (
      <label className={`flex flex-row items-center border border-gray-500 py-1 px-4 rounded-lg ${drugFilter === drug ? "bg-blue-500 text-white border-transparent" : null}`}>
        <input className="appearance-none" type="radio" name="drugs" value={drug} checked={drugFilter === drug} onChange={event => { setDrugFilter(event.target.value) }} />
        <span>{drug}</span>
      </label>
    ))

    return (<>
      <label htmlFor="drugs">Products:</label>
      <div className="flex flex-row space-x-4">
        <label className={`flex flex-row items-center border border-gray-500 py-1 px-4 rounded-lg ${drugFilter === "All" ? "bg-blue-500 text-white border-transparent" : null}`}>
          <input className="appearance-none" type="radio" name="drugs" value="All" checked={drugFilter === "All"} onChange={event => setDrugFilter(event.target.value)} />
          <span>All</span>
        </label>
        {drugs}
      </div>
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
      <label htmlFor="states">State</label>
      <select className="border border-gray-500 py-1 px-4 rounded-lg w-min" name="states" value={stateFilter} onChange={event => setStateFilter(event.target.value)}>
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


      {generateFilters()}

      {/* {displayFirst()} */}

      <div className="grid md:grid-cols-2 gap-8 mt-16 text-center">
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
          <GetBestDoctor data={filterIfNecessary(data)} />
        </div>
      </div>
    </div>
  )
}

const GetBestDoctor = ({ data }) => {
  if (data.length == 0) {
    return <h3>No data available under current filters.</h3>
  }
  const reducer = (previousValue, currentValue) => previousValue + currentValue
  const sortedData = data.sort((a, b) => {
    if (a.total_rx.reduce(reducer, 0) > b.total_rx.reduce(reducer, 0)) {
      return -1
    } else {
      return 1
    }
  })

  const tabledata = () => {
    let result = []
    for (let i = 0; i < Math.min(sortedData.length, 5); i += 1) {
      result.push(
        <tr>
          <td className="font-bold px-4">{i + 1}</td>
          <td className="text-left px-4">{sortedData[i].first_name + " " + sortedData[0].last_name}</td>
          <td className="px-4">{sortedData[i].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
      )
    }
    return result
  }

  return (
    <div className="flex justify-center">
      <table className="table-auto border border-black p-4">
        <tr className="font-bold">
          <th className="px-4"></th>
          <th className="px-4">Doctor</th>
          <th className="px-4">Total Drugs Sold</th>
        </tr>
        {tabledata()}
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