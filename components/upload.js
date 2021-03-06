import React from 'react'
import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef();

export default class Upload extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log('RAW DATA')
    console.log(data)
    console.log('---------------------------')
    const doctorData = data.map(line => {
      const doctor = line.data
      let newRx = [], totalRx = [];
      for (const property in doctor) {
        if (property.substring(0, 3) === "NRx") {
          newRx.push(parseInt(doctor[property]))
        }
        if (property.substring(0, 3) === "TRx") {
          totalRx.push(parseInt(doctor[property]))
        }
      }
      const newDoctor = {
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        state: doctor.State,
        product: doctor.Product,
        new_rx: newRx,
        total_rx: totalRx
      }

      return newDoctor
    })
    console.log('PROCESSED DATA')
    console.log(doctorData)
    console.log('---------------------------')
    this.props.onFileLoad(doctorData)
    this.props.isFileReady(true)
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------')
    console.log(err)
    console.log('---------------------------')
    this.props.isFileReady(false)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
    this.props.isFileReady(false)
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  }

  render() {
    return (
      <CSVReader
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        style={{}}
        config={
          {
            header: true
          }
        }
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    )
  }
}