import express from 'express'

const router = express.Router()
const methods = require('./controllers')

router.post('/register', methods.registerUser)
router.post('/login', methods.loginUser)
router.post('/wipcollections', methods.addWipCollection)
router.post('/wip', methods.addWip)
router.post('/userwipcollections', methods.getWipCollectionByUser)
router.post('/follower', methods.addFollower)
router.post('/followers', methods.getFollowers)
router.post('/followees', methods.getFollowees)
router.get('/wipcollections', methods.getWipCollection)

module.exports = router
