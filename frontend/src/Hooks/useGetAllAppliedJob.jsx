import React, { useEffect } from 'react'
import axios from "axios"
import {userEffect} from "react"
import { useDispatch } from 'react-redux'
import { JOB_APPLY } from '@/utils/constant'
import { setAllAppliedJobs } from '@/redux/jobSlice'
function useGetAllAppliedJob() {
    const dispatch = useDispatch();
 
    useEffect(()=>{
       const fetchAppliedJobs=async ()=>{
        try {
           const res = await axios.get(`${JOB_APPLY }/get`,{withCredentials:true});
           if(res.data.success){
            dispatch(setAllAppliedJobs(res.data.application))
           }
        } catch (error) {
            console.log(error);
        }
       } 
       fetchAppliedJobs();
    },[])
}

export default useGetAllAppliedJob;
