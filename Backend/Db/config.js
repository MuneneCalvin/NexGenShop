import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            autoIndex: true,
        });
        console.log("Connected to DB successfully.!!!!");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongo;