require('./models/db')

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const employeeController = require('./controllers/employeeController');

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

const handlebars = require('express-handlebars');
// const bodyParser = require('body-parser');
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs'
}));
// app.use(express.static('public'));

// app.get('/', (req,res)=>{
//     res.render('main',{layout:'index'});
// });

app.use('/employee',employeeController)

app.listen(3000, ()=>{
    console.log('App is listening')
})