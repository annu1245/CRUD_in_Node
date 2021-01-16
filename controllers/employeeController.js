const express = require('express');
const mongoose= require('mongoose');
const Employee = mongoose.model('Employee');

var router = express.Router();

router.get('/', (req,res)=>{
  res.render('main',{layout:'index'});
});

router.post('/',(req,res)=>{
  // console.log(req.body);
  insertRecord(req,res);
});

function insertRecord(req,res){
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc)=>{
    if(!err){
      res.redirect('employee/list');
    }
    else{
      console.log("error during insert record", + err);
    }
  });
}

router.get('/list/', (req,res)=>{
  Employee.find((err,docs)=>{
    if(!err){
      console.log(docs);
      res.render('layouts/list',{list:docs, layout:false})

    }
    else{
      console.log('error:'+ err);
    }
  });
  
})


module.exports = router;