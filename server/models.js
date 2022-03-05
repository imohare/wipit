const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/wipDB', { useNewUrlParser: true, useUnifiedTopology: true });
  
mongoose.connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

const cardSchema = new Schema({
  img_url: String,
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
