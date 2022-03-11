const mainExpress = require('express');
const app = mainExpress();
const port = 3456;
const mainRouter = require('./router');
const cors = require('cors');

app.use(cors());
app.use(mainExpress.json()); //body parser
app.use(mainRouter);

app.get('/', (req:any, res:any) => {
  try {
    res.send('server is connected!')
  } catch {
    res.send('server failed to connect')
    res.status(404)
  }
});

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`)
})
