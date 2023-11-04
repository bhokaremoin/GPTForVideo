const express = require("express");
const router = express.Router();
require("dotenv").config();
const getAudio = require("../getAudio");
const compressAudio = require("../compressAudio");
const generateTranscribe = require("../generateTranscribe");
const getAnswer = require("../getAnswer");

const props = {
  openai_api_key: process.env.OPENAI_API_KEY,
  pinecone_api_key: process.env.PINECONE_API_KEY,
  pinecone_env: process.env.PINECONE_ENV,
  pinecone_index: process.env.PINECONE_INDEX,
};
// console.log(props);
router.post("/setup", async (req, res) => {
  console.log("API HIT");
  let youtubeURL = req.body.url;
  try {
    // await getAudio(youtubeURL);
    // await compressAudio();
    await generateTranscribe(props);
    await createVectorStore(props);
    console.log("Transcript setup Completed !!");
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
