const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const mongo = await mongoose.connect(process.env.MONGO_URI, {
            autoCreate: true,
        });
        console.log(`MongoDB connected @ ${mongo.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
