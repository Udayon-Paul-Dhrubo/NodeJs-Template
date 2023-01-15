const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = () => {

    // Database connection 🥳
    mongoose
        .connect(process.env.MONGO_CONNECTION_URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("connection successful"))
        .catch((err) => console.log(err));
    
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;