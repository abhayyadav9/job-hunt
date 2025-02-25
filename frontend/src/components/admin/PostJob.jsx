import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
    location: "",
    position: "",
    experience: "",
    jobType: "",
    companyId: "",
  });
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const ChangeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({
        ...input,
        companyId: selectedCompany._id,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/admin/jobs");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => navigate("/admin/jobs")} className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow">
            Back
          </Button>
          <h1 className="text-3xl font-bold text-purple-700">Create A New Job</h1>
        </div>

        <form onSubmit={submitHandler} className="bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-gray-700 font-semibold">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Enter Job Title"
                value={input.title}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-700 font-semibold">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Enter Job Description"
                value={input.description}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="salary" className="text-gray-700 font-semibold">Salary</Label>
              <Input
                id="salary"
                type="number"
                name="salary"
                placeholder="Enter Salary"
                value={input.salary}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="requirements" className="text-gray-700 font-semibold">Requirement</Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                placeholder="Enter Requirements"
                value={input.requirements}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-gray-700 font-semibold">Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                placeholder="Enter Location"
                value={input.location}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="position" className="text-gray-700 font-semibold">No. of Positions</Label>
              <Input
                id="position"
                type="number"
                name="position"
                placeholder="Enter Position"
                value={input.position}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="experience" className="text-gray-700 font-semibold">Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                name="experience"
                placeholder="Enter Experience Level"
                value={input.experience}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="jobType" className="text-gray-700 font-semibold">Job Type</Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                placeholder="Enter Job Type"
                value={input.jobType}
                onChange={ChangeEventHandler}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="w-full">
              <Label className="text-gray-700 font-semibold">Select Company</Label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {companies.map((company, index) => (
                    <SelectItem key={index} value={company.name.toLowerCase()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <Button className="w-full bg-purple-600 hover:bg-purple-700 font-semibold py-3 rounded-lg flex justify-center items-center" disabled>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Posting Job...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 font-semibold py-3 rounded-lg">
                Post Job
              </Button>
            )}
          </div>
        </form>

        {companies.length === 0 && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              No company registered yet.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Register your company to post job listings.
            </p>
            <Link to="/register-company" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-200">
              Register Company
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PostJob;
