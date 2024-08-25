const express =require('express');
const indexroutes=require('./routes/userroute')
const {sqldatabase}=require('./db')
const app=express();
const PORT=3000

app.use(express.json());

app.use('/',indexroutes);

app.listen(PORT,()=>{
    console.log("server is running");
     sqldatabase();
})