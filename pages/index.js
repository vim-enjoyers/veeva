import React, { Component, useState, useEffect } from 'react'

import Upload, { readDefaultData } from '../components/upload'
import Link from 'next/Link'
import Report from '../components/report'
import ShowNewMonthly from '../components/report'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

const Index = () => {
  const [viewingReport, setViewingReport] = useState(false)
  const [doctors, setDoctors] = useState()
  const [fileReady, setFileReady] = useState(false)

  const router = useRouter()

  const handleOnFileLoad = (data) => {
    setDoctors(data)
  }

  const handleFileReadyChange = (isReady) => {
    setFileReady(isReady)
  }

  // TODO: redirect to home if navigating directly to report
  // useEffect(() => {
  //   if (router.query.report) router.push('/', { shallow: true })
  // })
  // useEffect(() => {
  //   if (router.query.report && !fileReady){
  //     router.push('/', { shallow: true })
  //   }
  // })

  useEffect(() => {
    setFileReady(false)
    setViewingReport(router.query.report)
  }, [router.query.report])

  return (
    <Layout>
      {viewingReport ? (<Report data={doctors} />) : (
        <div className="h-full  flex flex-col items-center space-y-4">
          <div className="p-4 w-5/6 flex-1 max-w-lg">
            <Upload onFileLoad={handleOnFileLoad} isFileReady={handleFileReadyChange} />
          </div>
          <div className="w-full max-w-lg flex justify-end flex-none p-4 pt-0">
            <span className="text-gray-800 text-xs">
              or,&nbsp;
              <a href="/prescriber_data.csv" className="cursor-pointer hover:underline text-black" download>
                click here to download default data
              </a>
              .
            </span>
          </div>
          {fileReady ? (
            <div className="flex justify-center pb-4">
              <Link href="/?report=true" shallow>
                <a className="text-white font-bold px-4 py-4 text-md bg-gray-800 rounded-lg shadow hover:shadow-lg">Generate Report</a>
              </Link>
            </div>
          ) : null}
        </div>)}
    </Layout>
  )
}

export default Index