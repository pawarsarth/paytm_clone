import express from 'express'
import zod, { string } from 'zod'
import { Account, User } from '../src/db.js'
import { JWT_SECRET } from '../config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userMiddleware } from './middleware.js'


const userRouter = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    lastName: zod.string(),
    firstName: zod.string()

})

userRouter.post('/signup', async (req, res) => {

    const success = signupBody.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: "make input in correct order"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 2)


    try {
       const us1= await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,

        })

            const userId=us1._id;

            await Account.create({
                    userId,
                    balance:1+Math.random()*1000
            })

        res.json({
            message: "user created done here"
        })
    }

    catch (e) {
        res.status(411).json({
            message: "error occured"
        })
    }

})


userRouter.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const oneman = await User.findOne({
            username: username
        })

        if (!oneman) {
            res.status(403).json({
                message: "user already exits username"
            })
        }

        const passwordMatch = await bcrypt.compare(password, oneman.password)

        if (!passwordMatch) {
            res.status(403).json({
                message: "incorrect password"
            })
        }
        const token = jwt.sign({
            id: oneman._id
        }, JWT_SECRET)

        
        res.status(200).json({
            message: "login  successfull",
            token
        })



    }
    catch (e) {
        res.status(500).json({
            message: "internale server error"
        })
    }
})

userRouter.put('/', userMiddleware, async (req, res) => {
    try {
        const updateBody = zod.object({
            password: zod.string().optional(),
            firstName: zod.string().optional(),
            lastName: zod.string().optional(),
        })

        const { success } = updateBody.safeParse(req.body)
        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }

        await User.updateOne({
            _id: req.userId
        }, req.body)

        res.json({
            message: "update done here"
        })
    }
    catch(e)
    {
        res.json({
            message:"error catch "
        })
    }

    
})

userRouter.get('/bulk',async (req,res)=>{

    const filter=req.query.filter||""

    const users= await User.find({
        $or:[{
            firstName:{"$regex":filter}
        },
    {
        lastName:{"$regex":filter}
    }]    
    })

     res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})






export { userRouter }
