import React from 'react'
import HomeIcon from '@/src/shared/icons/HomeIcon'
import UsersIcon from '@/src/shared/icons/UsersIcon'

export default function VisionGeneral({ totalCitizens, totalHouseholds, totalCitizensLoading, totalHouseholdsLoading }:{ totalCitizens:number | null, totalHouseholds:number | null, totalCitizensLoading:boolean, totalHouseholdsLoading:boolean }) {
  return (
    <>
    <h3 className='text-main font-bold'>Visión general</h3>
    <div className='flex flex-row justify-around items-center mt-2'>
      <div className="h-24 flex flex-row justify-around items-center w-2/5 bg-slate-100 m-auto p-5 rounded-xl">
        <div className='w-2/5'>
          <UsersIcon
            size={50}
            fill='#13709e'
          />
        </div>
        <div className='w-3/5'>
          <p className='text-gray-400'>Total ciudadanos</p>
          <span className='font-bold text-3xl text-second'>
            {
              totalCitizensLoading ? 
                <div className="animate-pulse space-y-4 p-4 w-full">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              :
                totalCitizens
            }</span>
        </div>
      </div>

      <div className="h-24 flex flex-row justify-around items-center w-2/5 bg-slate-100 m-auto p-5 rounded-xl">
        <div className='w-2/5'>
          <HomeIcon
            size={50}
            fill='#13709e'
          />
        </div>
        <div className='w-3/5'>
          <p className='text-gray-400 '>Total<br /> hogares</p>
          <span className='font-bold text-3xl text-second'>{
              totalHouseholdsLoading ? 
                <div className="animate-pulse space-y-4 p-4 w-full">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              :
                totalHouseholds
            }</span>
        </div>
      </div>
    </div>
    </>
  )
}
