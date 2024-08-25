const sql=require('mssql');

const config={
    user:"sa",
    password:"Saloni@18",
    server:"CBLLAP2026\\MSSQL",
    database:"school",
    options:{
        trustServerCertificate:true,
        encrypt:false
    }
}

function sqldatabase(){
    sql.connect(config,function(err){
        if(err){
            console.log(err);  
        }
        console.log("database is connected");  
    })
}

function request(){
   const request= new sql.Request();
   return request;
}

module.exports={
    sqldatabase,request
}