import React, { useState } from 'react'
import Navbar from '../sharedf/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API } from '@/utils/constant'

export default function CompanyCreate() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState()
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='w-full flex justify-center'>
            <div className='max-w-4xl    mx-5'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'> Your Company Name</h1>
                    <p className='text-gray-500'>What you would like to give your Company name? you can change this later</p>
                </div>

                <Label>Company Name</Label>
                <Input type="text"
                    className="my-2"
                    placegolder="JObConnect,Microsoft etc"
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => { navigate("/admin/companies") }}>Cancel</Button>
                    <Button className="bg-[#271db3]" onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
        </div>
    )
}
