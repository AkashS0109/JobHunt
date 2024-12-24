import React, { useEffect } from 'react'
import Navbar from '../sharedf/Navbar'
import Job from '../Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/Hooks/useGetAllJobs'


export default function browse() {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => (
      dispatch(setSearchQuery(""))
    )
  }, [])
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto xl:my-10  '>
        <h1 className='font-bold text-xl m-5 xl:my-10 '>Search Result({allJobs.length})</h1>
         <div className=''>
        <div className='flex  flex-wrap  items-center justify-center'>
          {

            allJobs.map((job) => (
              <div className=' flex sm:w-1/3  w-[350px] xl-1/2' key={job?._id}>
                <Job job={job} />
              </div>)
            
        
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
