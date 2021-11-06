import React from 'react'
import { CSVReader } from 'react-papaparse'

const Upload = () => {
  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={this.handleOnDrop}
      onError={this.handleOnError}
      noClick
      noDrag
      config={{}}
      style={{}}
      onRemoveFile={this.handleOnRemoveFile}
    >
      {({ file }) => (
        <aside>
          <button
            type='button'
            onClick={this.handleOpenDialog}
          >
            Browe file
          </button>
          <div>
            {file && file.name}
          </div>
          <button onClick={this.handleRemoveFile}>Remove</button>
        </aside>
      )}
    </CSVReader>
  );
}

export default UploadButton;