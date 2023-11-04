const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
async function speechToText(key) {
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fs.createReadStream("compressedAudio.mp3"),
    "whisper-1"
  );
  return resp.data.text;
}
async function generateTranscribe(props) {
  return new Promise(async (resolve, reject) => {
    const jsonContent = await speechToText(props.openai_api_key);
    const jsonString = JSON.stringify(jsonContent);
    fs.writeFile("transcript.txt", jsonString, function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        reject();
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  });
}
module.exports = generateTranscribe;
