import React, { useEffect, useState } from 'react'
import Navbar from '@/Components/sharedf/Navbar'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import AdminTable from './AdminTable'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'


function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])
  return (
    <div>
      <Navbar />
      <div className=' max-w-6xl mx-3 md:mx-auto my-10'>
        <div className='flex items-center justify-between my-5 '>
          <Input 
            placeholder="Filter By name"
            onChange={(e) => setInput(e.target.value)}
           className="  focus:border-[#271db3] w-1/3 "
          />
          <Button className="bg-[#271db3]" onClick={() => navigate("/admin/jobs/create")} >Add New Job</Button>
        </div>
        <AdminTable />
      </div>
    </div>
  )
}

export default AdminJobs

