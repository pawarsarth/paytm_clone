import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

function userMiddleware(req,res,next)
{
   try{
     const token1 =req.headers['token']

    if(!token1)
    {
        return res.statuts(401).json({
            message:"token missing"
        })
        
    }
     const token = token1.split(" ")[1];
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