const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/Student").then(() => {
    console.log("MongoDb Conection Done")
}).catch((err) => { console.log(err) });