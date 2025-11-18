import express, { json } from 'express'
import { router } from './routes/index.js';
import { userRouter } from './routes/user.js';
import cors from 'cors'
import { accountRouter } from './routes/account.js';

const app=express();
app.use(cors())
app.use(express.json())

app.use('/api/v1',router)
app.use('/api/user',userRouter)
app.use('/api/v1/account',accountRouter)

app.listen(3000)


