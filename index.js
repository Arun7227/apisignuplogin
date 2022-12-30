const express=require('express');
const cors=require('cors');
const app=express();
require('dotenv').config();

const usercontroller=require('./usercontroller')
app.use(express.json());
app.use(cors());
app.use('/api',usercontroller)
app.listen(5000,()=>{
    console.log('the application is running in the port 5000')
})