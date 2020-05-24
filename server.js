const express = require("express");
const http = require("http");
const path = require("path");
const router = express.Router();

const port = process.env.PORT || 80;

router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

const app = express();
app.use(router);
app.use(express.static("public"));

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
