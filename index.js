const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app=express();
app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


const routerUser = require('./routes/user')
const routerPost = require('./routes/post')
const routerComment = require('./routes/comment')

app.use('/user', routerUser)
app.use('/posts', routerPost)
app.use('/comments', routerComment)


app.use(express.static('uploads'))

app.listen(4000,'0.0.0.0',()=>{
    console.log('server has started on port 4000')
});