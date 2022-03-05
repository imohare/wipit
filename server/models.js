const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/wipDB', { useNewUrlParser: true, useUnifiedTopology: true });
  
mongoose.connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

// .then(() => {
//   console.log('connected');
// })
// .catch((e) => {
//   console.error(e);
// });

// const wipSchema = new Schema({
//   wip_title: String,
//   wip_card: [
//     {
//       img_url: String,
//       date: String,
//       seen_by_state: String,
//       seen_by_user: String, 
//       seen_by_date: String,
//     }
//   ]
// });

const cardSchema = new Schema({
  img: String,
  upload_date: String,
  seen_by_state: String,
  seen_by_user: String, 
  seen_by_date: String,
});

const Cards = mongoose.model('Card', cardSchema);

const wipSchema = new Schema({
  wip_title: {type: String, required: true},
  wip_cards: [cardSchema]
});

const Wips = mongoose.model('Wip', wipSchema);


module.exports =  {Wips, Cards} ;
