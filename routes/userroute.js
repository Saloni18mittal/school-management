const express=require('express');
const {request}=require('../db')
const router=express.Router();
const sql=require('mssql')


router.post('/addSchool',(req,res)=>{
        const {id,name,address,latitude,longitude}=req.body;
        if (typeof id !=='number' || !name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.send({ error: 'Invalid input data' });
        }
        request().input('id',sql.Int,id).input('name',sql.VarChar(255),name)
        .input('address',sql.VarChar(255),address).input('latitude',sql.Float,latitude)
        .input('longitude',sql.Float,longitude)
        .query('INSERT INTO schools (id,name,address,latitude,longitude) VALUES (@id,@name,@address,@latitude,@longitude)')

        res.send("added")
    })

router.get('/listSchools',(req,res)=>{
    const {latitude,longitude}=req.query
    request().query('SELECT * FROM schools',function(err,recordsets){
        if(err){
            console.log(err);
            
        }
        const schools = recordsets.recordset.map((school )=> {
            const distance = Math.sqrt(
                Math.pow(latitude - school.latitude, 2) + Math.pow(longitude - school.longitude, 2)
            );
            return { ...school, distance };
        });
        schools.sort((a, b) => a.distance - b.distance);
        res.send(schools);
    });
});

module.exports=router;