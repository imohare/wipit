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
      wip_date: req.body.wip_date,
      wip_img: req.body.wip_img,
      wip_seen: {
        state: req.body.state,
        user: req.body.user,
        date: req.body.date
      },
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



