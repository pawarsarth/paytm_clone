import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


const SignIn = () => {

        const usernameRef=useRef<any>('')
            const passwordRef=useRef<any>('')
            const navigate=useNavigate()
            
         async function signin2(e: { preventDefault: () => void; }) {
    e.preventDefault();
                try 
                {
                    const username=usernameRef.current.value;
                const password=passwordRef.current.value;

               const res= await axios.post(`${BACKEND_URL}/api/user/signin`,{
                    username,password
                })

                const jwt=res.data.token;
                localStorage.setItem("token",jwt)
                navigate('/dashbaord')
                }
                catch(e)
                {
                    alert('error in singn')
                }

        }   

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-semibold text-center mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access your account
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={signin2}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email" ref={usernameRef}
              placeholder="johndoe@example.com"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password" ref={passwordRef}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Sign In Button */}
           <button
  type="submit"
  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
>
  Sign in
</button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-5">
          Don't have an account?{" "}
          <Link to='/signin' className="text-black font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
