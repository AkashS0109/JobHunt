import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { setSearchQuery } from '@/redux/jobSlice';
 import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const searchQueryHandler=()=>{
    dispatch(setSearchQuery(query));
    navigate("/browse")
  }
  return (
    <div className='text-center py-10  md:mt-10   flex flex-col justify-center items-center'>
       <h1 className='md:text-5xl md:leading-tight xl:text-6xl md:py-6 text-3xl font-bold   leading-tight  w-5/6 md:w-3/4  hover:drop-shadow-3xl'> Discover New Opportunities  &<br/> and Achieve Your <span
     className='text-red-600 animate-pulse'>Dream Jobs</span></h1>
       <p className='text-xl  lg:text-4xl  py-4 lg:w-[60%] w-[80%]  font-medium'>Your Next Career Move Starts Here Explore Thousands of Opportunities! </p>
       <div className='flex lg:w-[30%] shadow-lg shadow-violet-200  rounded-2xl items-center  mx-auto md:my-10'>
        <input
          type='text'
           placeholder='Search here'
           className='   w-full rounded-l-full p-1 md:p-2 border-violet-500'
           onChange={(e)=>{setQuery(e.target.value)}}
          />
          <Button className='rounded-r-full bg-violet-500 ' onClick={searchQueryHandler}>
            <Search className='md:h-5 md:w-5 w-4' />
          </Button>
       </div>
     </div>
  )
}
  