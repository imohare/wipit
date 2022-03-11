import express from 'express';

const {Wips, Cards, Comments} = require('./models');

exports.getWips = async (req:express.Request, res:express.Response) => {
  try {
    const results: Array<typeof Wips> = await Wips.find();
    console.log(results)
    res.send(results);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('getWips is failing');
    res.status(500);
    res.end();
  }
};

exports.getAllCards = async (req:express.Request, res:express.Response) => {
  try {
    const results: Array<typeof Wips> = await Cards.find();
    res.send(results);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('getCards is failing');
    res.status(500);
    res.end();
  }
};

exports.getAllComments = async (req:express.Request, res:express.Response) => {
  try {
    const results: Array<typeof Comments> = await Comments.find();
    res.send(results);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('getComments is failing');
    res.status(500);
    res.end();
  }
};

exports.addWip = async (req:express.Request, res:express.Response) => {
  try {
    const post = await Wips.create({
      wip_title: req.body.wip_title,
      update_request: false,
      update_request_date: '',
      wip_cards: [],
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

exports.deleteWip = async (req:express.Request, res:express.Response) => {
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

exports.getCards = async (req:express.Request, res:express.Response) => {
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

exports.updateTitle = async (req:express.Request, res:express.Response) => {
  try {
    await Wips.findOneAndUpdate(
      {_id:req.params.wipId},
      {
        $set: {
          wip_title : req.body.wip_title
        }
      }
    );
    res.status(201).send();
  } catch (e) {
    console.log(e);
    console.error('updateTitle is failing');
    res.status(500);
    res.end();
  }
};

exports.updateRequest = async (req:express.Request, res:express.Response) => {
  try {
    await Wips.findOneAndUpdate(
      {_id:req.params.wipId},
      {
        $set: {
          update_request : req.body.update_request,
          update_request_date : req.body.update_request_date
        }
      }
    );
    res.status(201).send();
  } catch (e) {
    console.log(e);
    console.error('updateRequest is failing');
    res.status(500);
    res.end();
  }
};

exports.addCard = async (req:express.Request, res:express.Response) => {
  try {
    const wip = await Wips.findById(req.params.wipId).exec();
    const card = {
      img_url: req.body.img_url,
      upload_date: req.body.upload_date,
      seen_by_state: req.body.seen_by_state,
      seen_by_user: req.body.seen_by_user,
      seen_by_date: req.body.seen_by_date,
      comments: [],
      wipId: wip._id
    };
    const updatedCard = await Cards.create(card);
    await wip.wip_cards.push(updatedCard);
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

exports.deleteCard = async (req:express.Request, res:express.Response) => {
  try {
    const wipId = req.params.wipId;
    const cardId = req.params.cardId;
    await Wips.updateOne({_id: wipId}, {$pull: {wip_cards: {_id: cardId}} });
    await Cards.findByIdAndDelete(cardId);
    res.status(200).send();
  } catch (e) {
    console.log(e);
    console.error('deleteCard is failing');
    res.status(500);
    res.end();
  }
};

exports.updateCard = async (req:express.Request, res:express.Response) => {
  try {
    await Wips.updateMany(
      {_id:req.params.wipId, 'wip_cards._id' : req.params.cardId},
      {
        $set: {
          'wip_cards.$.seen_by_state' : req.body.seen_by_state,
          'wip_cards.$.seen_by_user' : req.body.seen_by_user,
          'wip_cards.$.seen_by_date' : req.body.seen_by_date
        }
      }
    );
    await Cards.updateOne(
      {_id:req.params.cardId},
      {
        $set: {
          'seen_by_state' : req.body.seen_by_state,
          'seen_by_user' : req.body.seen_by_user,
          'seen_by_date' : req.body.seen_by_date
        }
      }
    );
    res.status(201).send();
  } catch (e) {
    console.log(e);
    console.error('updateCard is failing');
    res.status(500);
    res.end();
  }
};

exports.addComment = async (req:express.Request, res:express.Response) => {
  try {
    const card = await Cards.findById(req.params.cardId);
    const wip = await Wips.findById(card.wipId);
    const comment = {
      comment: req.body.comment,
      upload_date: req.body.upload_date,
      seen_by_state: req.body.seen_by_state,
      seen_by_user: req.body.seen_by_user,
    };
    const updatedComment = await Comments.create(comment);
    await card.comments.push(updatedComment);
    const updated = await card.save();
    const card2 = await wip.wip_cards.filter((id:any) => id = card._id)[0];
    await card2.comments.push(updatedComment);
    await wip.markModified('wip_cards');
    await wip.save();
    res.json(updated);
    res.status(204);
  } catch (e) {
    console.log(e);
    console.error('addComment is failing');
    res.status(500);
    res.end();
  }
};

// exports.updateComment = async (req, res) => {
//   try {
//     await Wips.updateMany(
//       {'_id':req.params.wipId},
//       {
//         $set: {
//           'wip_cards.$[i].comments.$[j].seen_by_state' : req.body.seen_by_state,
//           'wip_cards.$[i].comments.$[j].seen_by_user' : '@ELIZA_BLAKEMORE',
//         }
//       }
//     );
//     await Cards.updateOne(
//       {_id:req.params.cardId, 'comments._id':req.params.commentId},
//       {
//         $set: {
//           'comments.$.seen_by_state' : req.body.seen_by_state,
//           'comments.$.seen_by_user' : '@ELIZA_BLAKEMORE'
//         }
//       }
//     );
//     await Comments.updateOne(
//       {_id:req.params.cardId},
//       {
//         $set: {
//           'seen_by_state' : req.body.seen_by_state,
//           'seen_by_user' : '@ELIZA_BLAKEMORE'
//         }
//       }
//     );
//     res.status(201).send();
//   } catch (e) {
//     console.log(e);
//     console.error('updateComment is failing');
//     res.status(500);
//     res.end();
//   }
// };
