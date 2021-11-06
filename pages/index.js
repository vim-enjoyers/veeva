import React, { Component, useState, useEffect } from 'react'
import Head from 'next/head'
import UploadButton from '../components/upload-button'
import Link from 'next/Link'
import Report from '../components/report'
import ShowNewMonthly from '../components/report'
import { useRouter } from 'next/router'

const Index = () => {
  const [viewingReport, setViewingReport] = useState(false)
  const [doctors, setDoctors] = useState()

  const router = useRouter()

  const handleOnFileLoad = (data) => {
    setDoctors(data)
  }

  // TODO: redirect to home if navigating directly to report
  // useEffect(() => {
  //   if (router.query.report) router.push('/', { shallow: true })
  // })

  useEffect(() => {
    setViewingReport(router.query.report)
  }, [router.query.report])

  return (
    <div className="">
      <Head>
        <title>Vim Enjoyers' Veeva Solution</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="p-12 text-center font-bold">
          <h1 className="text-4xl">Vim Enjoyers' Solution for Veeva's Challenge</h1>
          <h2 className="text-2xl text-gray-600">Hack Ohio 2021</h2>
        </div>
        {viewingReport ? (<ShowNewMonthly data={doctors} />) : (
          <div className="h-96 bg-gray-200">
            <UploadButton onFileLoad={handleOnFileLoad} />
            <div className="flex justify-center">
              <Link href="/?report=true" shallow>
                <a className="text-white font-bold px-4 py-4 text-md bg-gray-800 rounded">Generate Report</a>
              </Link>
            </div>
          </div>)}
      </main >

      <footer className="bg-gray-800 text-white h-16 absolute bottom-0 w-full flex items-center justify-center">
        <h1 className="font-bold text-lg">&copy; Vim Enjoyers 2021</h1>
      </footer>
    </div >
  )
}

export default Index