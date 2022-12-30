const Mongoclient=require('mongodb').MongoClient;
//require('dotenv').config();
const url='mongodb+srv://techriends:chithraarun@arun.vefsy5e.mongodb.net/?retryWrites=true&w=majority'
let database;

const db= async()=>{
 const client=await Mongoclient.connect(url);
 database=client.db('freelance')
 return database;

}
module.exports={
    db
}