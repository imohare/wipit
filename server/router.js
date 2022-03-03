const express = require('express');
const router = express.Router();
const methods = require('./controllers');

router.get('/wips', methods.getWips);
router.post('/wips', methods.postWip);
router.post('/wips/:id', methods.postCard);
router.delete('/wips/:id', methods.deleteWip); 
router.delete('/wips/card/:id', methods.deleteCard); 


module.exports = router;