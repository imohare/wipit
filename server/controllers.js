const {Wips, Cards}  = require('./models');

exports.getWips = async (req, res) => {
  try {
    const results = await Wips.find();
    res.send(results);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('getWips is failing');
    res.status(500);
    res.end();
  }
};

exports.addWip = async (req, res) => {
  try {
    const post = await Wips.create({
      wip_title: req.body.wip_title,
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

exports.deleteWip = async (req, res) => {
  try {
    const id = req.params.wipId;
    await Wips.deleteOne({ _id: id });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    console.error('deleteWip is failing');
    res.status(500);
    res.end();
  }
};

exports.getCards = async (req, res) => {
  try {
    const id = req.params.wipId;
    const wip = await Wips.findById(id);
    const results = await wip.wip_cards;
    res.send(results);
    res.status(200);
  } catch (e) {
    console.error('getCards is failing');
    res.status(500);
    res.end();
  }
};

exports.addCard = async (req, res) => {
  try {
    const wip = await Wips.findById(req.params.wipId).exec();
    const card = {
      img_url: req.body.img_url,
      upload_date: req.body.upload_date,
      seen_by_state: req.body.seen_by_state,
      seen_by_user: req.body.seen_by_user,
      seen_by_date: req.body.seen_by_date
    };
    await wip.wip_cards.push(card);
    const updated = await wip.save();
    res.json(updated);
    res.status(204);
  } catch (e) {
    console.log(e);
    console.error('addCard is failing');
    res.status(500);
    res.end();
  }
};

// exports.updateCard = async (req, res) => {
//   try {
//     const id = req.params.cardId;
//     console.log(req.body);
//     await Cards.updateOne({'_id': id},  
//       {
//         $set: {
//           seen_by_state: req.body.seen_by_state, 
//           seen_by_user: req.body.seen_by_user,
//           seen_by_date: req.body.seen_by_date
//         }
//       });
//     res.status(201).send();
//   } catch (e) {
//     console.log(e);
//     console.error('updateCard is failing');
//     res.status(500);
//     res.end();
//   }
// };

exports.deleteCard = async (req, res) => {
  try {
    const wipId = req.params.wipId;
    const cardId = req.params.cardId;
    await Wips.updateOne({_id: wipId}, {$pull: {wip_cards: {_id: cardId}} });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    console.error('deleteCard is failing');
    res.status(500);
    res.end();
  }
};