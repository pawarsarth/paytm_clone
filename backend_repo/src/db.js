import mongoose from 'mongoose'


const {Schema,Types}=mongoose;
const objectId=mongoose.Types.ObjectId;
mongoose.connect('mongodb+srv://pawarsarthak24:7M4Q5Dff96Sbsvg@cluster0.hfgknhp.mongodb.net/pytm_project')


const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowerCase:true,
        minLenght:3,
        maxLenght:30
    },
    password:{
           type:String,
           required:true,
           minLenght:3 
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLenght:30

    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLenght:40
    }

})



const User=mongoose.model('User',userSchema);

const accountSchema=new Schema({
    userId:{type:objectId,ref:User,required:true},
    balance:{type:Number,required:true}
})


const Account=mongoose.model('Account',accountSchema);



export{User,Account}