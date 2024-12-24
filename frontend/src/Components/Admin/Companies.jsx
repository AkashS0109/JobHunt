import React, { useEffect, useState } from 'react'
import Navbar from '../sharedf/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText} from '@/redux/companySlice'


function Companies() {
  const [input,setInput] =useState("");
  useGetAllCompanies();
  const navigate=useNavigate();
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
      <Navbar/>
       <div  className="w-full xl:flex xl:justify-center xl:items-center xl:flex-col ">
      <div className='xl:w-8/12  lg:mx-8 my-10 m-5  md:m-10  '>
      <div className='flex items-center justify-between my-5 '>
      <Input className="lg:w-fit w-1/3 md:w-1/4 "
        placeholder="Filter By name"
        onChange={(e)=>setInput(e.target.value)}
      />
      <Button onClick={()=>navigate("/admin/companies/create")} className="w-1/3  bg-[#271db3] md:w-1/4"> New Company</Button>
      </div>
 <CompanyTable/>
      </div>
      </div>
    </div>
  )
}

export default Companies
