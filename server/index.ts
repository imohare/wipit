import express from 'express';
import cors from 'cors';
import db from './models/index';

const router = require('./router');

const app = express();
const port = 3456;

app.use(cors());
app.use(express.json()); //body parser
app.use(router);

app.get('/', (req:express.Request, res:express.Response) => {
  try {
    res.send("server is connected!");
  } catch {
    res.send("server failed to connect");
    res.status(404);
  }
});

async function bootstrap(){
  await db.sequelize.sync()
  app.listen(port, () => {
    console.log(`I'm listening on port ${port}`)
  });
};

bootstrap();
