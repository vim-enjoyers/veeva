const Report = ({ data }) => {
  return (
    <div>
      <p>The first doctor's name is {data[0].first_name}.</p>
    </div>
  )
}

export default Report