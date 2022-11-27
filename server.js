if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// require('dotenv').config()
console.log(process.env.DATABASE_URL)
const express= require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


const indexRouter = require('./routes/index')

app.set('view engine', 'ejs'); 
// set where our views are going to be comming from
app.set('views', __dirname + '/views');
// hookup expresslayout
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
// telling express where our public files are going to be (css,imgs, etc)
app.use(express.static('public'));

// connect to db
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongo'))

app.use('/', indexRouter) 

app.listen(process.env.PORT || 4000)