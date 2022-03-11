import {Schema, model, connect, connection} from "mongoose";

connect('mongodb://localhost:27017/wipDB');

connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

interface commentInterface {
  comment?: string,
  upload_date?: string,
  seen_by_state?: string,
  seen_by_user?: string
}

const commentSchema = new Schema<commentInterface>({
  comment: String,
  upload_date: String,
  seen_by_state: String,
  seen_by_user: String,
});

const Comments = model<commentInterface>('Comment', commentSchema);

interface cardInterface {
  img_url?: String;
  upload_date?: String;
  seen_by_state?: String;
  seen_by_user?: String;
  seen_by_date?: String;
  comments?: [typeof commentSchema];
  wipId?: Schema.Types.ObjectId
}

const cardSchema = new Schema<cardInterface>({
  img_url: String,
  upload_date: String,
  seen_by_state: String,
  seen_by_user: String,
  seen_by_date: String,
  comments: [commentSchema],
  wipId: Schema.Types.ObjectId
});

const Cards = model<cardInterface>('Card', cardSchema);

interface wipInterface {
  wip_title: string;
  wip_cards?: [typeof cardSchema];
  update_request?: string;
  update_request_date?: string;
}

const wipSchema = new Schema<wipInterface>({
  wip_title: {type: String, required: true},
  wip_cards: [cardSchema],
  update_request: String,
  update_request_date: String,
});

const Wips = model<wipInterface>('Wip', wipSchema);

module.exports = {Wips, Cards, Comments}
