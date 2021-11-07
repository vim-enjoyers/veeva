import React, { useState } from 'react'
import MonthlyRx from './monthly-rx.js'
import PopularRx from './popular-rx.js'
import NewPopularRx from './newpopular-rx'
import DrugGrowthRates from './drug-growth-rates.js'
import { forIn } from 'lodash'

const Report = ({ data }) => {
  const [drugFilter, setDrugFilter] = useState("All")
  const [stateFilter, setStateFilter] = useState("All")
  const [futureMonths, setFutureMonths] = useState(6)

  const clearFilters = () => {
    setDrugFilter("All")
    setStateFilter("All")
  }

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
        {drugFilter !== stateFilter ? <a className="text-sm underline cursor-pointer" onClick={clearFilters}>Clear Filters</a> : null}
      </div>
    </>)
  }

  const generateDrugFilters = () => {
    const uniqueDrugs = [...new Set(data.map(item => item.product))].sort()
    uniqueDrugs = uniqueDrugs.filter(function (element) {
      return element !== undefined;
    })
    const drugs = uniqueDrugs.map(drug => (
      <label className={`flex flex-row items-center border border-gray-500 py-1 px-4 rounded-lg ${drugFilter === drug ? "bg-orange text-white border-transparent" : null}`}>
        <input className="appearance-none" type="radio" name="drugs" value={drug} checked={drugFilter === drug} onChange={event => { setDrugFilter(event.target.value) }} />
        <span>{drug}</span>
      </label>
    ))

    return (<>
      <label htmlFor="drugs">Products:</label>
      <div className="flex flex-row space-x-4">
        <label className={`flex flex-row items-center border border-gray-500 py-1 px-4 rounded-lg ${drugFilter === "All" ? "bg-orange text-white border-transparent" : null}`}>
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
    var dataCopy = JSON.parse(JSON.stringify(data));

    let result = dataCopy
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
    const filteredData = filterIfNecessary(dataCopy)
    console.log(filteredData[0])
    return (
      <h4>The first doctor in the array is {filteredData[0].first_name} {filteredData[0].last_name}.</h4>
    )
  }

  return (
    <div className="w-full">
      <h1 className="">Prescriber Data Report</h1>
      <h3 className="" >Generated at {/* TODO: Add time of generation. */}</h3>
      {/* <p>The first doctor's name is {data[0].first_name}.</p> */}


      {generateFilters()}

      {/* {displayFirst()} */}
      <div className="mt-16 w-full flex flex-col space-y-12">
        <div>
          <h2>Top-Prescribing Doctors</h2>
          <GetBestDoctor data={filterIfNecessary(data)} />
        </div>
        <div>
          <h2>Trending Doctors</h2>
          <select className="my-2 border border-gray-500 py-1 px-4 rounded-lg w-min" name="trendingterm" value={futureMonths} onChange={event => setFutureMonths(event.target.value)}>
            <option value={1}>Short Term (1 month)</option>
            <option value={6}>Medium Term (6 months)</option>
            <option value={12}>Long Term (12 months)</option>
          </select>
          <div className="">
            <table className="report-table">
              <tr className="font-bold">
                <th className="pl-4"></th>
                <th className="px-4 ">Name</th>
                <th className="px-4">Predicted New Prescriptions in {futureMonths} Months</th>
              </tr>
              <FindLinearRegressions data={filterIfNecessary(data)} future={futureMonths} />
            </table>
          </div>
        </div>
        <div>
          <h2>Total Prescriptions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-center w-full">
            <div className="flex flex-col space-y-4 w-full">
              <CreateTotalMostPopularDrug data={data} drugFilter={drugFilter} />
              <h6 className="uppercase text-xs text-bold">Total Prescriptions Per Month</h6>
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <CreateNewMostPopularDrug data={data} drugFilter={drugFilter} />
              <h6 className="uppercase text-xs text-bold">New Prescriptions Per Month</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GetBestDoctor = ({ data }) => {
  var dataCopy = JSON.parse(JSON.stringify(data));

  if (dataCopy.length == 0) {
    return <h3>No data available under current filters.</h3>
  }
  const reducer = (previousValue, currentValue) => previousValue + currentValue
  const sortedData = dataCopy.sort((a, b) => {
    if (a.total_rx.reduce(reducer, 0) > b.total_rx.reduce(reducer, 0)) {
      return -1
    } else {
      return 1
    }
  })

  const tabledata = () => {
    let result = []
    for (let i = 0; i < Math.min(sortedData.length, 10); i += 1) {
      result.push(
        <tr>
          <td className="font-bold pr-4">{i + 1}.</td>
          <td className="px-4">{sortedData[i].first_name + " " + sortedData[i].last_name}</td>
          <td className="px-4">{sortedData[i].total_rx.reduce((a, b) => a + b, 0)}</td>
        </tr>
      )
    }
    return result
  }

  return (
    <div className="">
      <table className="report-table">
        <tr className="font-bold">
          <th className="pr-4"></th>
          <th className="px-4">Name</th>
          <th className="px-4">Total Prescriptions</th>
        </tr>
        {tabledata()}
      </table>
    </div>
  )
}

/* FUNCTION TO FIND THE AVERAGE GROWTH RATES OF NRx PER DRUG, COUNTRYWIDE. */
const PredictBestDrug = (data) => {

  //Key: Product, Value: Sums of Each Month

  var dataCopy = JSON.parse(JSON.stringify(data))

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
      <DrugGrowthRates data={growth_rates} />
    </div>
  )
}

/* HELPER FUNCTION: REDIRECTS TO GRAPH CREATION OF DOCTOR NRx VALUES. */
const ShowNewMonthly = ({ data }) => {
  const doctor = data[0]
  return (
    <div>
      <MonthlyRx data={doctor.new_rx} />
    </div>
  )
}

/* HELPER FUNCTION: REDIRECTS TO GRAPH CREATION OF DOCTOR TRx VALUES. */
const ShowTotalMonthly = ({ data }) => {
  const doctor = data[0];
  return (
    <div>
      <MonthlyRx data={doctor.total_rx} />
    </div>
  )
}

/* CALCULATES A MAP<PRODUCT, Total TRx> FOR EACH DRUG. REDIRECTS TO GRAPH CREATION. */
const CreateTotalMostPopularDrug = ({ data, drugFilter }) => {
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
      <PopularRx totalMap={totalMap} drugFilter={drugFilter} />
    </div>
  )
}

const CreateNewMostPopularDrug = ({ data, drugFilter }) => {
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

      <NewPopularRx newMap={newMap} drugFilter={drugFilter} />
    </div>
  )
}

/* UTILIZES LINEAR REGRESSION TO FIND THE DOCTOR WHOSE LIKELY TO BE A VERY POPULAR PRESCRIBER IN THE FUTURE. */
/* ASSUMES ALL DOCTORS ARE UNIQUE */
const FindLinearRegressions = ({ data, future }) => {
  var dataCopy = JSON.parse(JSON.stringify(data))
  /* K= [Last,First] V=[slope, intercept] */
  var namesAndEquations = new Array()
  var pairs = new Array()
  var months = new Array()
  var NRx = new Array()
  var slopeAndIntercept = new Array()

  for (let i = 0; i < dataCopy.length; i++) {
    for (let j = 0; j < dataCopy[i].new_rx.length; j++) {
      months[j] = j
      NRx[j] = dataCopy[i].new_rx[j]
    }
    slopeAndIntercept = LinearRegression(months, NRx);
    namesAndEquations.push([dataCopy[i].first_name, dataCopy[i].last_name, slopeAndIntercept[0], slopeAndIntercept[1]])
  }

  console.log(namesAndEquations)

  //TODO: IMPLEMENT FUNCTION TO GRAPH(?)
  return <PredictGrowingDoctors namesAndEquations={namesAndEquations} months={future} />
}

const PredictGrowingDoctors = ({ namesAndEquations, months }) => {
  console.log(months)
  var prediction;
  var slope;
  var intercept;
  var firstName;
  var lastName;
  var nameAndPrediction = new Array();
  var fullName;

  // console.log(namesAndEquations);
  // console.log(name)
  for (let i = 0; i < namesAndEquations.length; i++) {
    slope = namesAndEquations[i][2];
    intercept = namesAndEquations[i][3];
    firstName = namesAndEquations[i][0];
    lastName = namesAndEquations[i][1];

    prediction = (slope * (months + 6)) + intercept;
    fullName = firstName + " " + lastName;
    nameAndPrediction.push([fullName, prediction]);
  }

  const sortedPredictions = nameAndPrediction.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    } else {
      return 1
    }
  })

  // console.log(sortedPredictions);

  const tabledata = () => {
    let result = []
    for (let i = 0; i < Math.min(sortedPredictions.length, 10); i += 1) {
      result.push(
        <tr>
          <td className="font-bold pr-4">{i + 1}.</td>
          <td className="px-4">{sortedPredictions[i][0]}</td>
          <td className="px-4">{sortedPredictions[i][1].toFixed(2)}</td>
        </tr>
      )
    }
    return result
  }

  return tabledata()
}

function LinearRegression(x, y) {
  var slope;
  var intercept;
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (let i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i] * y[i]);
    sum_xx += (x[i] * x[i]);
    sum_yy += (y[i] * y[i]);
  }

  slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  intercept = (sum_y - slope * sum_x) / n;

  //R^2 may be useful later.

  return [slope, intercept];
}

export default Report