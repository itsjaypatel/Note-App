const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


const fs = require('fs')
const mongoose = require('mongoose');

const noteRouter = require('./routes/noteRouter');
const userRouter = require('./routes/userRouter');

dotenv.config()
const app = express()
const port = process.env.PORT
const dbURI = process.env.DB_URI;


app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

mongoose
.connect(dbURI)
.then(res=>{
    console.log(`DB Connection Successfull ${res}`);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}).catch(err => {
    console.log(err);
})

app.get('/',(req,res)=>{
    res.redirect('notes');
})

app.use('/user', userRouter);
app.use(noteRouter);


app.use((req,res)=>{
    res.send('<h1>404 Note Foudn</h1>')
})