const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {homeRouter} = require('./routes/home');
const {schoolRouter} = require('./routes/school');
const {studentsRouter} = require("./routes/students");

const app = express();


//CONFIGURATION:

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.engine('.hbs', hbs.engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/school', schoolRouter);
app.use('/school/students', studentsRouter);

app.listen(3000, 'localhost', ()=> {
    console.log(`Listening on http://localhost:3000`)
} )