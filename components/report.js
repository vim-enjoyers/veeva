import MonthlyRx from './monthly-rx.js'

const Report = ({ data }) => {
  return (
    <div className="px-12">
      
      <p>The first doctor's name is {data[0].first_name}.</p>

      <p>First doctor's monthly new prescriptions</p>
      <ShowNewMonthly data={data}/>


      <p>First doctor's monthly total prescriptions</p>
      <ShowTotalMonthly data={data} />


    </div>

  )
}

const ShowNewMonthly = ({ data }) => {
  const doctor = data[0];
  return (
    <div>
      <MonthlyRx data={doctor.new_rx}/>
    </div> 
  )
}

const ShowTotalMonthly = ({ data }) => {
  const doctor = data[0];
  return (
    <div>
      <MonthlyRx data={doctor.total_rx}/>
    </div> 
  )
}

export default Report