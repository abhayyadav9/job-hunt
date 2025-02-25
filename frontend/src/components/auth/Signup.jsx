import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";

import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader } from "lucide-react";

const Signup = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const {loading} =useSelector(store=>store.auth)
    const [input, setInput] = useState({
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      file: null,
    });

    const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
      setInput({ ...input, file: e.target.files?.[0] });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!input.fullname || !input.email || !input.password || !input.phoneNumber || !input.role) {
        alert("All fields are required!");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(input.email)) {
        alert("Please enter a valid email!");
        return;
      }

      const formData = new FormData(); 
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("role", input.role);

      if (input.file) {
        formData.append("file", input.file);
      }

      try {
        dispatch(setLoading(true))
        const response = await axios.post(
            `${USER_API_END_POINT}/register`,
            formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          navigate("/login"); 
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message || "Registration failed!");
        }
      } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Something went wrong during registration.");
      }finally{
        dispatch(setLoading(false))
      }
    };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto p-2">
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 border border-gray-200 font-semibold rounded-md p-4 my-10 shadow-lg"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              placeholder="Abhay Yadav"
              value={input.fullname}
              onChange={changeEventHandler}
              name="fullname"
              className="mt-1 w-full"
            />
          </div>
          <div className="my-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="abhay@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              className="mt-1 w-full"
            />
          </div>
          <div className="my-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="number"
              placeholder="98xxxxxxx"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              name="phoneNumber"
              className="mt-1 w-full"
            />
          </div>
          <div className="my-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              className="mt-1 w-full"
            />
          </div>

          <div className="flex items-center justify-between gap-4 my-5">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button  className="w-full hover:bg-blue-600 font-semibold py-2 px-4 rounded">
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full hover:bg-blue-600 font-semibold py-2 px-4 rounded"
            >
         Sign Up
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
