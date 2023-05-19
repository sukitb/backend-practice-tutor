// import express มาใช้
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const decodeMiddleware = require('./middleware/decode')

const authenRouter = require('./api/authen/authen-router')
const activityRouter = require('./api/activity/activity-router')
// body-parser
app.use(express.json())

app.use('/authen', authenRouter)
app.use(decodeMiddleware)
app.use('/activity', activityRouter)



const start = async () => {
    await mongoose.connect(
        '<your db connection string>'
    ).then(()=> {
        console.log('connected')
    }).catch((err)=>{
        console.log(err)
    })

    app.listen(3000, () => {
        console.log('Start server at port 3000.')
    })
}

start()


// เปิด server
