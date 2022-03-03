const wip = require('./model');

exports.getWips = async (req, res) => {
  try {
    const results = await wip.find();
    res.send(results);
    res.status(200);
  } catch (e) {
    console.error('getWips is failing');
    res.status(500);
    res.end();
  }
};

exports.postWip = async (req, res) => {
  try {
    const post = await wip.create({
      wip_title: req.body.wip_title,
      wip_card: {
        img: req.body.wip_card.img,
        date: req.body.wip_card.date,
        seen: {
          state: req.body.wip_card.seen.state,
          user: req.body.wip_card.seen.user, 
          date: req.body.wip_card.seen.date
        }
      }
    });
    res.send(post);
    res.status(201);
  } catch (e) {
    console.error('postWip is failing');
    res.status(500);
    res.end();
  }
};

exports.deleteWip = async (req, res) => {
  try {
    const id = req.params.id;
    await topic.deleteWip({ _id: id });
    res.status(200).send();
  } catch (e) {
    console.error('delete is failing');
    res.status(500);
    res.end();
  }
};



