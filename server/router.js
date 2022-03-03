const express = require('express');
const router = express.Router();
const methods = require('./controllers');

//question: should I have two different urls here?
//one for wips and one for wipCards?

router.get('/wips', methods.getWips);
router.post('/wips', methods.postWip);
router.delete('/wips/:id', methods.deleteWip); 
router.delete('/wips/card/:id', methods.deleteWipCard);  //what should the url here be????


module.exports = router;