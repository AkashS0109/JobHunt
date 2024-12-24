import React, { useEffect } from 'react'
import Navbar from '../sharedf/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import store from '@/redux/store'
import { JOB_APPLY } from '@/utils/constant'

function Applicants() {
  const params=useParams();
  const dispatch =useDispatch();
  const {applicants} = useSelector(store=>store.application);
  useEffect(()=>{
  
    const fetchAllApplicants=async()=>{
    try {
      const res= await axios.get(`${JOB_APPLY}/${params.id}/applicants`,{withCredentials:true});
        dispatch(setAllApplicants(res.data.job))
    } catch (error) {
      console.log(error);
      
    }
  }
  fetchAllApplicants();
  },[]);
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl  mx-5 md:mx-10'>
      <h1 className='font-bold text-xl my-5'>Applicants{applicants?.applications?.length}</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants


//upto 11 57