import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export const Balance = () => {

    const [balance,setBalance]=useState(0)

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage. Please log in.');
        return;  // Exit early if no token
    }
    axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
        headers: {
            token: `Bearer ${token}`  // Assuming your backend expects a 'token' header
        }
    }).then(res => {
        setBalance(res.data.balance);
        console.log(res.data.balance);
    }).catch(error => {
        console.error('Error fetching balance:', error);
        // Optional: Set balance to a default or show an error message to the user
    });
}, []);  // Empty array: runs only once on mount




    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
            
            
        </div>
    </div>
}