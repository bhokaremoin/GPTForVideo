const OpenAI = require("langchain/llms/openai").OpenAI;
const OpenAIEmbeddings =
  require("langchain/embeddings/openai").OpenAIEmbeddings;
require("dotenv").config();
const PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
const loadQAStuffChain = require("langchain/chains").loadQAStuffChain;
const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const getAnswer = async (question) => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV,
  });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  const query = question;
  const docs = await vectorStore.similaritySearch(query);
  const llmA = new OpenAI();
  const chainA = loadQAStuffChain(llmA);
  const resA = await chainA.call({
    input_documents: docs,
    question: query,
  });
  return resA.text;
};
module.exports = getAnswer;
