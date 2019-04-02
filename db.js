const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

const options = {
useNewUrlParser: true,
useCreateIndex: true,
reconnectTries: Number.MAX_VALUE,
reconnectInterval: 500, 
connectTimeoutMS: 10000,
};  

//setting up web environment
const PORT = process.env.PORT || 3000;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const mongooseConnect = (app)=>{
  mongoose.connect(url, options).then( function() {
    console.log('MongoDB is connected');
    app.listen(PORT, console.log('Connected to port: ', PORT));
  })
    .catch( function(err) {
    console.log(err);
  });

  const db = mongoose.connection;
  db.on('reconnectFailed', ()=> {
      throw new Error('Connection lost with db');
  })
}
module.exports ={
  url,
  mongooseConnect
}