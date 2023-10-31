const PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
const PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
const RecursiveCharacterTextSplitter =
  require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const Document = require("langchain/document").Document;
const OpenAIEmbeddings =
  require("langchain/embeddings/openai").OpenAIEmbeddings;

const createVectorStore = async (props) => {
  return new Promise(async (resolve, reject) => {
    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: props.pinecone_api_key,
      environment: props.pinecone_env,
    });
    const pineconeIndex = pinecone.Index(props.pinecone_index);
    try {
      var data = {};
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 1,
      });
      const docOutput = await splitter.splitDocuments([
        new Document({ pageContent: data }),
      ]);
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
