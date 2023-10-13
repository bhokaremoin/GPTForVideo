const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./database.js");
mongoDB(true);
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://askgpt-ize0.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  next();
});
app.use(express.json());
app.use("/api", require("./Routes/api.js"));
app.get("/", (req, res) => {
  res.send("Backend Server for AskGPT Application");
});
app.listen(port, () => {
  console.log(`Server Running at Port ${port}..`);
});
