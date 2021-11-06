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
          newRx.push(doctor[property])
        }
        if (property.substring(0, 3) === "TRx") {
          totalRx.push(doctor[property])
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
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              Browse file
            </button>
            <div
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
                width: '60%',
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20,
              }}
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