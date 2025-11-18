import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import axios from "axios";

export function Signup() {
    const navigate=useNavigate()
    const firstnameRef=useRef<any>('')
    const lastnameRef=useRef<any>('')
    const emailRef=useRef<any>('')
    const passwordRef=useRef<any>('')

  async function signup1(e: { preventDefault: () => void; }) {
    e.preventDefault(); // ⛔ stop form reload

    const firstName = firstnameRef.current.value;
    const lastName = lastnameRef.current.value;
    const username = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
        const res = await axios.post(`${BACKEND_URL}/api/user/signup`, {
            firstName,
            lastName,
            username,
            password,
        });

        alert("You have signed in");
        navigate("/signin");

    } catch (error) {
        console.error(error);
        alert("Signup failed");
    }
}


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[350px]">
        
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <p className="text-gray-500 text-center text-sm mt-1">
          Enter your information to create an account
        </p>

        {/* FORM */}
      <form className="mt-6 flex flex-col gap-4" onSubmit={signup1}>

          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text" ref={firstnameRef}
              
              placeholder="John"
              className="w-full border rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text" ref={lastnameRef}
              placeholder="Doe"
              className="w-full border rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email" ref={emailRef}
              placeholder="johndoe@example.com"
              className="w-full border rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password" ref={passwordRef}
              className="w-full border rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Button */}
        <button
  type="submit"
  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
>
  Sign Up
</button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="#" className="font-medium text-black underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
