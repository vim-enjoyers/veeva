import React from 'react'
import { render } from 'react-dom';
import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef();

export default class UploadButton extends React.Component {
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
    const doctorData = data.map((line, index) => {
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
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------')
    console.log(err)
    console.log('---------------------------')
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        config={
          {
            header: true
          }
        }
        style={{}}
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            className="py-8 flex justify-center"
          >
            <button
              type="button"
              className="bg-gray-800 text-white font-bold px-4 rounded ml-4"
              onClick={this.handleOpenDialog}
            >
              Browse file
            </button>
            <div
              className="mx-4"
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '40%',
              }}
            >
              {file && file.name}
            </div>
            <button
              className="bg-gray-800 text-white font-bold px-4 rounded mr-4"
              onClick={this.handleRemoveFile}
            >
              Remove
            </button>
          </aside>
        )}
      </CSVReader>
    )
  }
}