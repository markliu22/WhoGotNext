const express = require("express");
// UNINSTALL
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse requests of type application.json
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("wahoo");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
