const mongoose = require("mongoose");

// Connect to local MongoDB
const connect = mongoose.connect("mongodb://localhost:27017/Login", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check connection
connect.then(() => {
    console.log("Database Connected Successfully...");
})
.catch((err) => {
    console.log("Database connection error: ", err);
});

// Create schema
const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection part
const collection = mongoose.model("User", LogInSchema);

module.exports = collection;
