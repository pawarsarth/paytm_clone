import express from 'express'
import { userMiddleware } from './middleware.js';
import { Account } from '../src/db.js';
import mongoose from 'mongoose';

const accountRouter=express.Router();



accountRouter.get('/balance', userMiddleware, async (req, res) => {
    const acc = await Account.findOne({ userId: req.userId });

    if (!acc) {
        return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: acc.balance });
});

accountRouter.post("/transfer",userMiddleware,async (req,res)=>{

        const session =await mongoose.startSession()

        session.startTransaction();

        const {amount,to}=req.body;

        const account=await Account.findOne({
            userId:req.userId
        }).session(session)


        if(!account||account.balance<amount)
        {
            await session.abortTransaction();

            return res.json({
                message:"insuffiecnt balance"
            })

        }
        const toAccount=await Account.findOne({
            userId:to
        }).session(session)


        if(!toAccount)
        {
            await session.abortTransaction();
            return res.status.json({
                message:"invalid account"
            })
        }

        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)

        await Account.updateOne({userId:to},{$inc:{balance:+amount}})

        await session.commitTransaction();

        res.json({
            message:"transfer done"
        })

})




export {accountRouter}