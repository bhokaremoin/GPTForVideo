const express = require("express");
const router = express.Router();
require("dotenv").config();
const getAudio = require("../getAudio");
const compressAudio = require("../compressAudio");
const generateTranscribe = require("../generateTranscribe");
const getAnswer = require("../getAnswer");
const createVectorStore = require("../createVectorStore");
// console.log(props);
router.post("/setup", async (req, res) => {
  console.log("API HIT");
  let youtubeURL = req.body.url;
  try {
    // await getAudio(youtubeURL);
    // console.log("Video Downloaded Successfully !!");
    // await compressAudio();
    // console.log("Video to Audio Converted Successfully !!");
    // await generateTranscribe(props);
    // console.log("Audio to Text Converted" Successfully !!");
    await createVectorStore();
    // console.log("Vector Store Created Successfully !!");
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
