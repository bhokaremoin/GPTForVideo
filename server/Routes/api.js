const express = require("express");
const router = express.Router();
require("dotenv").config();
const getAudio = require("../getAudio");
const compressAudio = require("../compressAudio");
const getAnswer = require("../getAnswer");
const createVectorStore = require("../createVectorStore");

const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const props = {
  openai_api_key: process.env.OPENAI_API_KEY,
  pinecone_api_key: process.env.PINECONE_API_KEY,
  pinecone_env: process.env.PINECONE_ENV,
  pinecone_index: process.env.PINECONE_INDEX,
};
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

router.post("/emptyIndex", async (req, res) => {
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: props.pinecone_api_key,
      environment: props.pinecone_env,
    });
    const index = pinecone.Index(props.pinecone_index);
    const namespaceIndex = index.namespace("Default");
    const res = await namespaceIndex.deleteAll();
    console.log(res);
  } catch (error) {
    console.error("Error emptying the index:", error);
  }
});
module.exports = router;
