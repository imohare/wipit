const  Wip  = require('./models');


// get wips
exports.getWips = async (req, res) => {
  try {
    const results = await Wip.find();
    res.send(results);
    res.status(200);
  } catch (e) {
    console.error('getWips is failing');
    res.status(500);
    res.end();
  }
};

// create wip
exports.addWip = async (req, res) => {
  try {
    const post = await Wip.create({
      wip_title: req.body.wip_title,
      wip_card: [
        {
          img: req.body.wip_card.img,
          date: req.body.wip_card.date,
          seen_by_state: req.body.wip_card.seen_by_state,
          seen_by_user: req.body.wip_card.seen_by_user, 
          seen_by_date: req.body.wip_card.seen_by_date,
        }
      ]
    });
    res.send(post);
    res.status(201);
  } catch (e) {
    console.log(e);
    console.error('addWip is failing');
    res.status(500);
    res.end();
  }
};


// delete wip
exports.deleteWip = async (req, res) => {
  try {
    const id = req.params.id;
    await Wip.deleteOne({ _id: id });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    console.error('deleteWip is failing');
    res.status(500);
    res.end();
  }
};

//delete card
exports.deleteCard = async (req, res) => {
  try {
    const id = req.params.cardId;
    await Wip.updateOne({}, {$pull: {wip_card: {_id: id}} });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    console.error('deleteCard is failing');
    res.status(500);
    res.end();
  }
};

// add card
exports.addCard = async (req, res) => {
  try {
    const id = req.params.wipId;
    await Wip.findOneAndUpdate(
      {_id: id}, 
      {$push: {
        wip_card: [
          {
            img: req.body.wip_card.img,
            date: req.body.wip_card.date,
            seen_by_state: req.body.wip_card.seen_by_state,
            seen_by_user: req.body.wip_card.seen_by_user, 
            seen_by_date: req.body.wip_card.seen_by_date
          }
        ]
      }});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    console.error('addCard is failing');
    res.status(500);
    res.end();
  }
};

// update seen_by_state, seen_by_user, seen_by_date
//how on earth do you loop into the right card
// exports.updateCard = async (req, res) => {
//   try {
//     const id = req.params.wipId;
//     await Wip.findByIdAndUpdate( {_id : id}, 
//       {$set: {'wip_card.seen_by_state': req.body.seen_by_state}});
//   } catch (e) {
//     console.log(e);
//     console.error('updateCard is failing');
//     res.status(500);
//     res.end();
//   }
// };











