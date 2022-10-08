const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} = require("./config/config");

const app = express();

// const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb`;

// mongoose.connect(``, { autoIndex: false });

const connectWithRetry = () => {
  mongoose
    // .connect(mongoUrl, {
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    //   // useFindAndModify: false
    // })
    .connect(mongoUrl).then(() => console.log("SUCCESSFULLY CONNECTED TO DB"))
    .catch((e) => {
      console.log("FAILED TO CONNECT DB: ", e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h2>HI1234</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
