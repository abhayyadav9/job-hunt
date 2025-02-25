import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setGetStatus } from "@/redux/applicationSlice";
import { Badge } from "../ui/badge";

const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const { applicants, getStatus } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data?.success) {
        toast.success(res.data.message || "Status updated successfully");
        dispatch(setGetStatus({ status, id })); // Update the status in Redux or refetch if necessary
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the status"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto shadow-lg rounded-lg overflow-hidden">
        <Table className="min-w-full leading-normal border">
          <TableCaption className="bg-blue-100 text-black font-semibold py-4">
            A list of recently applied users
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-600 hover:bg-blue-500 text-white">
              <TableHead className="px-4 py-2 text-white">Full Name</TableHead>
              <TableHead className="px-4 py-2 text-white">Email</TableHead>
              <TableHead className="px-4 py-2 text-white">Contact</TableHead>
              <TableHead className="px-4 py-2 text-white">Resume</TableHead>
              <TableHead className="px-4 py-2 text-white">Date</TableHead>
              <TableHead className="px-4 py-2 text-white text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-red-40">
            {applicants &&
              applicants?.applications?.map((item) => (
                <TableRow key={item._id} className="border-b hover:bg-gray-100">
                  <TableCell className="px-4 py-2 text-gray-700">
                    {item?.applicant?.fullname}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-700">
                    {item?.applicant?.email}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-700">
                    {item.applicant.phoneNumber}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-blue-600">
                    {item.applicant.profile?.resume ? (
                      <a
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-500">
                    {new Date(item.applicant.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <Popover>
                      <PopoverTrigger>
                        <Badge
                      // className={`${
                      //   // item.status === "Rejected"
                      //   //   ? "bg-red-600 text-white"
                      //   //   : "bg-green-600 text-white"
                      //   bl
                      // } rounded-full px-4 py-2 text-sm font-semibold`}
                      className="to-blue-400 p-2"
                      
                        >
                          {getStatus.id === item._id
                            ? getStatus.status.charAt(0).toUpperCase() +
                              getStatus.status.slice(1)
                            : item.status
                            ? item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)
                            : "Pending"}
                        </Badge>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 border shadow-md rounded-lg">
                        <div
                          onClick={() => statusHandler("Accepted", item._id)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm text-gray-600"
                        >
                          Accepted
                        </div>
                        <div
                          onClick={() => statusHandler("Rejected", item._id)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm text-gray-600"
                        >
                          Rejected
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
