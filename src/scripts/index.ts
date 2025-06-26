//indexing the data
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import * as dotenv from 'dotenv';
dotenv.config();

async function run(){
    const pdfLoader = new PDFLoader("./src/data/resume.pdf");
    const data = await pdfLoader.load();   
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 300, chunkOverlap: 100 });
    const documents = await splitter.splitDocuments(data);
    console.log(documents[0]);
    console.log("length", documents.length);
    const embeddings = new GoogleGenerativeAIEmbeddings({
    // try the experimental model for best quality, or "embedding-001"
            model: "embedding-001",
            apiKey: process.env.GOOGLE_API_KEY,
        }); 
    //created instance of pinecone to interact with pinecone vector store
     const pinecone = new PineconeClient({
        apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    await PineconeStore.fromDocuments(documents, embeddings, {
            pineconeIndex,
            // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
            maxConcurrency: 5,
    });
    console.log("successfully upserted embeddings into vector store");
    const queryVector = await embeddings.embedQuery(
    "where did he complete his masters?"
    );

    const queryResponse = await pineconeIndex
    .namespace("")  
    .query({
      vector: queryVector,
      topK: 2,
      includeMetadata: true,
    });
    for(const record of queryResponse.matches){
        console.log(record["metadata"])
    }
    // console.log(queryResponse);

}

run();