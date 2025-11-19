import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

function userMiddleware(req,res,next)
{
   try{
     const token =req.headers['token']

    if(!token)
    {
        return res.statuts(401).json({
            message:"token missing"
        })
        
    }
    const decodedData=jwt.verify(token,JWT_SECRET)

        req.userId=decodedData.id
        next();
   }
   catch(e)
   {
    res.json({
        message:"toke error"
    })
   }
}

export {userMiddleware}