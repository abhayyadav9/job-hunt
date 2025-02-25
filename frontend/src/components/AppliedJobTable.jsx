import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <Table>
        <TableCaption>A list of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You Dont applied job yet</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob?._id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job.title}</TableCell>
                <TableCell>{appliedJob?.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={` ${appliedJob?.status ==="accepted"?"bg-green-400 text-black":"bg-red-400 text-black"} p-1`}>
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};


export default AppliedJobTable;
