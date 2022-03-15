import express from "express";

const router = express.Router();
const methods = require("./controllers");

router.post("/register", methods.registerUser);
router.post("/login", methods.loginUser);
router.post("/wipcollections", methods.addWipCollection);
router.post("/wip", methods.addWip);
/*router.post('/wips/:wipId', methods.addCard);
router.get('/wips', methods.getWips);
router.get('/cards', methods.getAllCards);
router.get('/wip/:wipId/cards', methods.getCards);
router.delete('/wips/:wipId', methods.deleteWip);
router.delete('/wips/:wipId/card/:cardId', methods.deleteCard);
router.patch('/wips/updateRequest/:wipId', methods.updateRequest);
router.patch('/wips/updateTitle/:wipId', methods.updateTitle);
router.patch('/wips/updateCard/:wipId/:cardId', methods.updateCard);*/

module.exports = router;
