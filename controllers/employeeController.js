const express = require('express');
const mongoose= require('mongoose');
const Employee = mongoose.model('Employee');

var router = express.Router();

router.get('/', (req,res)=>{
  res.render('main',{layout:'index'});
});

router.post('/',(req,res)=>{
  if(req.body._id == ''){
  insertRecord(req,res);
  }
  else{
    updateRecord(req,res);
  }
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

function updateRecord(req,res){
  mongoose.set('useFindAndModify', false);
  Employee.findOneAndUpdate({_id:req.body._id}, req.body,{new:true}, (err,doc)=>{
    if(!err){
      res.redirect('employee/list');
    }
  })
}

router.get('/list/', (req,res)=>{
  Employee.find({}).lean().exec((err,docs)=>{
    if(!err){
      res.render('layouts/list',{lst:docs, layout:'index'})

    }
    else{
      console.log('error:'+ err);
    }
  });
})

router.get('/edit/:id/', (req,res)=>{
  Employee.findById(req.params.id).lean().exec((err,doc)=>{
    if(!err){
      res.render('main',{ viewTitle:"Update Employee", virtuals: true, employee:doc, layout:'index'})
    }
    else{
      res.send(err);
    }
  })
})

router.get('/delete/:id', (req,res)=>{
  Employee.findByIdAndRemove(req.params.id).lean().exec((err,doc)=>{
    if(!err){
      res.redirect('/employee/list');
    }
    else{res.send(err)}
  })
})

// router.get('/:id', (req,res)=>{
//   Employee.findById(req.params.id,(err,doc)=>{
//     console.log(req.params.id)
//     // if(!err){
//     //   res.render('employee/',{
//     //     viewTitle : "update Employee",
//     //     employee: doc
//     //   });
//     // }
//   })
// })


module.exports = router;