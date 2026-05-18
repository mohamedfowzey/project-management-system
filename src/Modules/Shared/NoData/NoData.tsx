import React from 'react'
import noData from '../../../assets/Images/no-data.png'

export default function NoData() {
  return (
    <>
    <div data-aos="zoom-in" className='flex flex-col items-center justify-center my-3  '>
        <img src={noData} className='w-48' alt="No Data" />
        <h2 className='text-2xl font-bold text-gray-600'>No Data Available</h2>
        <p className='text-gray-500'>There is no data to display at the moment.</p>
    </div>
    </>
  )
}
