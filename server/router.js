const express = require('express');
const router = express.Router();
const methods = require('./controllers');

router.get('/wips', methods.getWips);
router.get('/wip/:wipId/cards', methods.getCards);
router.post('/wips', methods.addWip);
router.post('/wips/:wipId', methods.addCard);
router.delete('/wips/:wipId', methods.deleteWip); 
router.delete('/wips/:wipId/card/:cardId', methods.deleteCard); 
// router.patch('/wips/:wipId/:cardId', methods.updateCard);

module.exports = router;