const express = require('express');
const router = express.Router();
const methods = require('./controllers');

router.get('/wips', methods.getWips);
router.post('/wips', methods.postWip);
router.post('/wips/:id', methods.postCard);
router.delete('/wips/:wipId', methods.deleteWip); 
router.delete('/wips/card/:id', methods.deleteCard); 
router.put('/wips/:wipId/:cardId', methods.updateCard);

module.exports = router;