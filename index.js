const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/key");
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URI);

require("./mondels/User");
require("./mondels/Post");

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

//mongodb connect
mongoose.connection.on("connected", () => {
  console.log("MongoDB was connected succesfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connnecting to MongoDB", err);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
