const express = require("express");
const app = express();
const port = 3456;
const router = require("./router");
const cors = require("cors");

app.use(cors());
app.use(express.json()); //body parser
app.use(router);

app.get("/", (req, res) => {
  try {
    res.send("server is connected!");
  } catch {
    res.send("server failed to connect");
    res.status(404);
  }
});

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
});
