import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

const connectDB = async () => {
    const mongoUri =
        config.get<string>("MONGO_URI") ||
        process.env.MONGO_URI ||
        "mongodb://0.0.0.0:27017/traefiker";
    try {
        const mongo = await mongoose.connect(mongoUri, {
            autoCreate: true,
        });
        logger.info(`MongoDB connected @ ${mongo.connection.host}`);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

export default connectDB;
