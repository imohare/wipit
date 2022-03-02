const express = require('express');
const router = express.Router();
const methods = require('./controllers');

router.get('/wips', methods.getWips);
router.post('/wips', methods.postWip);
router.delete('/wips/:id', methods.deleteWip); 

module.exports = router;