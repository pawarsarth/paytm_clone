import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const Balance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please login.");
            return;
        }

       axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
}) .then(res => {
            setBalance(res.data.balance);
            console.log("Balance:", res.data.balance);
        })
        .catch(err => {
            console.error("Error fetching balance:", err);
        });
    }, []);

    return (
        <div className="flex gap-2 text-lg font-semibold">
            <div>Your Balance:</div>
            <div>₹ {balance}</div>
        </div>
    );
};
