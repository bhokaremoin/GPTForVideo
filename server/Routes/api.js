const express = require("express");
const router = express.Router();
require("dotenv").config();
const getAudio = require("../getAudio");
const compressAudio = require("../compressAudio");
const getAnswer = require("../getAnswer");
const createVectorStore = require("../createVectorStore");
router.post("/setup", async (req, res) => {
  console.log("API HIT");
  let youtubeURL = req.body.url;
  console.log(youtubeURL);
  try {
    await getAudio(youtubeURL);
    await compressAudio();
    await createVectorStore();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
});

router.post("/getAnswer", async (req, res) => {
  let question = req.body.question;
  try {
    const ans = await getAnswer(question);
    res.status(200).send({ success: true, answer: ans });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
});
module.exports = router;
