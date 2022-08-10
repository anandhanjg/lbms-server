require('dotenv').config();
const mongoose=require('mongoose');
const DB_NAME="lbms"
const DB_URL=true?`mongodb://localhost:27017/${DB_NAME}`:`mongodb://domain:27017/${DB_NAME}?authSource=admin`
const {MONGO_USER,MONGO_PASS,ENV}=process.env;
const options=(ENV=="PROD")?{
    user:MONGO_USER,
    pass:MONGO_PASS,
    keepAlive:true,
    keepAliveInitialDelay:400000,
    useNewUrlParser:true,
    useUnifiedTopology: true
    }:{
        useNewUrlParser:true,
        useUnifiedTopology:true
    };
mongoose
    .connect(DB_URL, options)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => {console.log("Auth Error");console.log(err.message)});

module.exports = mongoose;
