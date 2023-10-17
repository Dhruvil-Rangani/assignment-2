import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://dhruvil:dhruvil007@cluster0.ca70xf0.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let connection;
try{
    connection = await client.connect();
    console.log("connected");
} catch(e){
    console.error(e);
}

let db = connection.db("marketplace");

export default db;