const express = require("express");
const router = express.Router();
const getAnswer = require("../getAnswer");

router.post("/getAnswer", async (req, res) => {
  let question = req.body.question;
  try {
    const ans = await getAnswer(question);
    res.send({ success: true, answer: ans });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
module.exports = router;
