import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'

import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

function CompanyTable() {
    const { companies ,searchCompanyByText} = useSelector(store => store.company)
    const [filterCompany,setFilterCompany]=useState(companies);
    const navigate=useNavigate()
    useEffect(()=>{
      const filteredCompany=companies.length>=0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        };
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
      setFilterCompany(filteredCompany)
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of Your Recent Registered Companies</TableCaption>
                <TableHeader>
                    <TableRow className="md:text-xl text-md ">
                        <TableHead className=''>Logo</TableHead>
                        <TableHead className=''>Name</TableHead>
                        <TableHead className='' >Date</TableHead>
                        <TableHead className='xl:text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} >
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage 
                                            className="md:w-10 w-5" 
                                            src={company.logo}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className='md:text-lg text-md lg:text-xl'>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='xl:text-right'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-39'>
                                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center md:gap-2 gap-1 w-fit'>
                                                <Edit2 className='md:w-4 w-3' />
                                                <span>Edit</span>
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

export default CompanyTable
