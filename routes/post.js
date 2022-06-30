const express =  require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

router.get('/allpost', (request, response) =>{
    const query = `select post.*,user.userName from post,user where post.userId=user.userId`

    db.query(query, (error, post) => {
        response.send(utils.createResult(error, post))
        })
})

router.get('/mypost/:id',(request, response) =>{
    const { id } = request.params

    const query = `select post.*,user.userName from post,user where post.userId= ${id}`

    db.query(query, (error, post) => {
        response.send(utils.createResult(error, post))
        })
})


router.get('/post/:id',(request, response) =>{
    const { id } = request.params

    const query = `select post.postId,post.title,post.description,post.thumbnail,user.userName from post,user where post.userId=user.userId and postId= ${id}`

    db.query(query, (error, post) => {
        response.send(utils.createResult(error, post))
        })
})

router.post('/', upload.single('thumbnail'), (request,response) => {
    const {title, description, id } = request.body

    const filename = request.file.filename

    const query=`insert into post(title, description, thumbnail, userId)
            values('${title}', '${description}', '${filename}' ,'${id}')`
    db.query(query,(error, post) => {
        response.send(utils.createResult(error, post))
    })
})

router.put('/post/:id', upload.single('thumbnail'), (request,response) => {
    const {title, description, id } = request.body

    const filename = request.file.filename

    const query=`update post set title = '${title}' , description = '${description}' , thumbnail = '${filename}' ,  userId ='${ userId}' where postId= '${id}'`
    
    db.query(query,(error, post) => {
        response.send(utils.createResult(error, post))
    })
})

router.delete('/:id',(request,response) => {
    const { id } = request.params

    const query = `delete from post where postId = ${id}`
    
    db.query(query,(error, result) => {
        response.send(utils.createResult(error,result))
    })
})

module.exports = router