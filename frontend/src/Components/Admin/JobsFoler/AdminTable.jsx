import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/Components/ui/table'
import { Popover,PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '@/redux/store'
import { setSearchCompanyByText } from '@/redux/companySlice'

function AdminTable() {
    const { companies ,searchCompanyByText} = useSelector(store => store.company)
     const {allAdminJobs,searchJobByText} =useSelector(store=>store.job)
    const [filterJobs,setFilterJobs]=useState(allAdminJobs);
    const navigate=useNavigate();


    useEffect(()=>{
      const filteredJobs=allAdminJobs.length>=0 && allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true
        };
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      })
      setFilterJobs(filteredJobs)
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of Your Recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-xl'>Company Name</TableHead>
                        <TableHead className='text-xl'>Role</TableHead>
                        <TableHead className='text-xl'>Date</TableHead>
                        <TableHead className=' text-xl'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                    
                                <TableCell className=''>{job?.company?.name}</TableCell>
                                <TableCell className=''>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='pl-8'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-full'>
                                            <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit'>
                                                <Edit2 className='w-4 ' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 mt-2'>
                                                <Eye className='w-4 cursor-auto'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
            }
                </TableBody>
            </Table>
        </div>
    )
}

export default  AdminTable

