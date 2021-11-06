import MonthlyRx from './monthly-rx.js'

const Report = ({ data }) => {
  return (
    <div>
      
      <p>The first doctor's name is {data[0].first_name}.</p>

      <ShowNewMonthly data={data} />

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

export default Report