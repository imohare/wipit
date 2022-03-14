import express from 'express';

const router = express.Router();
const methods = require('./controllers');

router.post('/register', methods.registerUser)
router.get('/wips', methods.getWips);
router.get('/cards', methods.getAllCards);
router.get('/comments', methods.getAllComments);
router.get('/wip/:wipId/cards', methods.getCards);
router.post('/wips', methods.addWip);
router.put('/wips/addComment/:cardId', methods.addComment);
router.post('/wips/:wipId', methods.addCard);
router.delete('/wips/:wipId', methods.deleteWip);
router.delete('/wips/:wipId/card/:cardId', methods.deleteCard);
router.patch('/wips/updateRequest/:wipId', methods.updateRequest);
router.patch('/wips/updateTitle/:wipId', methods.updateTitle);
router.patch('/wips/updateCard/:wipId/:cardId', methods.updateCard);
// router.patch('/wips/updateComment/:wipId/:cardId/:commentId', methods.updateComment);


module.exports = router;
