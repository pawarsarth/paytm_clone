import React, { useEffect, useRef, useState } from "react";
import queryString, { type ParsedQuery } from "query-string";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const SendMoney = () => {

        const [params,setParams]=useState<ParsedQuery<string>>();
        const amountRef=useRef<any>('')
        const token=localStorage.getItem('token')
        const naviagte =useNavigate();

        useEffect(()=>{
                try{
                    const parsed=queryString.parse(window.location.search)
                    setParams(parsed)

                }
                catch(e)
                {
                    console.log(e)
                }

        },[])

    async function sendMon()
    {
        console.log('button click')
        const res=  await   axios.post(`${BACKEND_URL}/api/v1/account/transfer`,
                {
                     to: params?.id,
                     amount: amountRef.current.value
                },
                   {
                    headers:{
                    token 
                    
                }
            })
            console.log('api done '+res)
            alert((await res).data.message)
            naviagte('/dashbaord')

    }
    

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">A</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{params?.name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        
                    >
                        Amount (in Rs)
                    </label>
                    <input
                    ref={amountRef}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button 
                    onClick={sendMon}
                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}