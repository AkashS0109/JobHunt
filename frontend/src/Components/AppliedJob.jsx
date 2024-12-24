import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

export default function Appliedjobs() {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your Appliedjobs
                    
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs?.length > 0 ? (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.title}</TableCell>
                                <TableCell>{ "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        className={`${appliedJob?.status === "rejected"
                                                ? "border-e-red-500"
                                                : appliedJob?.status === "pending"
                                                    ? "bg-gray-400"
                                                    : "bg-green-400"
                                            }`}
                                    >
                                        {appliedJob?.status?.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                You haven't applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    );
}
