const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect('mongodb://localhost:27017/wipDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected');
  })
  .catch((e) => {
    console.error(e);
  });

const wipSchema = new Schema({
  wip_title: String,
  wip_cards: [{ type: Schema.Types.ObjectId, ref: 'WipCard' }],
});

const wipCardSchema = new Schema({
  img: String,
  date: String,
  seen_by: [
    {
      state: Boolean,
      users: String, 
      date: String
    }
  ]
});

const Wip = mongoose.model('wip', wipSchema);
const WipCard = mongoose.model('wip-card', wipCardSchema);


module.exports = { Wip, WipCard };
