const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.get('/post/:id', (request, response) => {
    const { id } = request.params

    const query = `select userName, comment from comments where postId = ${id}`
    db.query(query,(error, comment) => {
        response.send(utils.createResult(error, comment))
    })
})

router.post('/addComment',(request,response) => {
    const {userName, comment, postId, userId} = request.body

    const query = `insert into comments (userName, comment, postId, userId ) values ('${userName}','${comment}','${postId}','${userId}')`

    db.query(query,(error,comment) => {
        response.send(utils.createResult(error, comment))
    })
})

router.put('/comment/:id', (request, response) => {
    const {id} = request.params
    const {userName, comment} = request.body

    const query = `update comments set userName = '${userName}', comment='${comment}' where commentId='${id}'`
    db.query(query,(error,comment) => {
        response.send(utils.createResult(error, comment))
    })
})

router.delete('/comment/:id', (request, response) => {
    const { id } = request.params

    const query = `delete from comments where commentId = ${id}`
    
    db.query(query,(error, result) => {
        response.send(utils.createResult(error,result))
    })
})

module.exports = router