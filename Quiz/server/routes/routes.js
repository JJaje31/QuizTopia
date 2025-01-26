const express = require('express');
const router = express.Router()
const controller = require('../controller/controller')
const authMiddleware = require('./middleware')
const path = require("path")


router.get('/api/topics',(req,res) => {
    const filePath = path.join(__dirname, '../data', 'quizData.json')
    res.sendFile(filePath)
})

router.post('/signup',controller.signUp);

router.post('/signin',controller.login)

router.post('/api/topic/creator',authMiddleware,controller.quizMaker)

router.post('/api/user',authMiddleware,controller.userInfo)

router.delete('/api/delete/:itemId',authMiddleware,controller.deleted)

router.put('/api/updated/:itemId',authMiddleware,controller.updated)

module.exports = router;