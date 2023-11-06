const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
const RecursiveCharacterTextSplitter =
  require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const Document = require("langchain/document").Document;
const OpenAIEmbeddings =
  require("langchain/embeddings/openai").OpenAIEmbeddings;
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const axios = require("axios");
const props = {
  openai_api_key: process.env.OPENAI_API_KEY,
  pinecone_api_key: process.env.PINECONE_API_KEY,
  pinecone_env: process.env.PINECONE_ENV,
  pinecone_index: process.env.PINECONE_INDEX,
  pinecone_delete: process.env.PINECONE_DELETE,
};
async function speechToText(key) {
  console.log("speech to Text function called");
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  console.log("sending api request to openai");
  const resp = await openai.createTranscription(
    fs.createReadStream("compressedAudio.mp3"),
    "whisper-1"
  );
  console.log("Api response recieved");
  return resp.data.text;
}
const createVectorStore = async () => {
  return new Promise(async (resolve, reject) => {
    console.log("createVectorStore Function called");
    const jsonContent = await speechToText(props.openai_api_key);
    const jsonString = JSON.stringify(jsonContent);
    // const jsonString = "This is moin";
    console.log("Transcribe JSON Ready");
    fs.writeFile("transcript.txt", jsonString, function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        reject();
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: props.pinecone_api_key,
      environment: props.pinecone_env,
    });
    const pineconeIndex = pinecone.Index(props.pinecone_index);
    await pineconeIndex._delete({
      deleteRequest: {
        deleteAll: true,
      },
    });
    //
    console.log("PineCone setup");
    try {
      var data = jsonString;
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 1,
      });
      console.log("Data Reading...");
      const docOutput = await splitter.splitDocuments([
        new Document({ pageContent: data }),
      ]);
      console.log("Pinecone api for embedding");
      await PineconeStore.fromDocuments(docOutput, new OpenAIEmbeddings(), {
        pineconeIndex,
      });
      console.log("Vector Created Successfully");
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};
module.exports = createVectorStore;
