import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading ,user} = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!input.email || !input.password || !input.role) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Handle successful login
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/"); // Navigate to a different route after login
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong during login."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
    if(user){
      navigate('/')

    }

  },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto p-2">
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 border border-gray-200 font-semibold rounded-md p-4 my-10 shadow-lg"
        >
          <h1 className="font-bold text-[#F83002] text-xl mb-5">Login</h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abhay@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              className="mt-1 w-full"
              disabled={loading}
            />
          </div>

          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              className="mt-1 w-full"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  disabled={loading}
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter" // Changed to lowercase for consistency
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  disabled={loading}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full hover:bg-blue-600 font-semibold py-2 px-4 rounded" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#6A38C2] hover:bg-blue-600 font-semibold py-2 px-4 rounded"
            >
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-600" to="/signup">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
