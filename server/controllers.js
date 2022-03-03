const { Wip, WipCard } = require('./models');


// get wips (you only need to get wips and not
// wip cards bc you will only be accessing wip
// cards through a wip)
// question: will this get the wip and the wipCard?
// if so, how do you acess the wip card?

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

// // create wip

// exports.postWipAndCard = async (req, res) => {
//   try {
//     const postCard = await wipCard.create({
//       img: req.body.img,
//       date: req.body.date,
//       seen_by: [
//         {
//           state: req.body.state,
//           users: req.body.users, 
//           date: req.body.date
//         }
//       ]
//     });

//     const postWip = await wip.create({
//       title: req.body.title,
//       wip_card: wipCard._id,
//     });

//     res.send(postCard, postWip);
//     res.status(201);
//   } catch (e) {
//     console.error('postWipAndCard is failing');
//     res.status(500);
//     res.end();
//   }
// };
//first create a card so that it gets an id from db
//second you create the new work and in the wip_cards you use that id


// delete wip

// exports.deleteWip = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await topic.deleteWip({ _id: id });
//     res.status(200).send();
//   } catch (e) {
//     console.error('delete is failing');
//     res.status(500);
//     res.end();
//   }
// };

// create card

exports.postWipCard = async (req, res) => {
  try {
    const post = await WipCard.create({
      img: req.body.img,
      date: req.body.date,
      seen_by: [
        {
          state: req.body.seen_by.state,
          users: req.body.seen_by.users, 
          date: req.body.seen_by.date
        }
      ]
    });
    res.send(post);
    res.status(201);
  } catch (e) {
    console.log(e);
    console.error('postWipCard is failing');
    res.status(500);
    res.end();
  }
};

// delete card




