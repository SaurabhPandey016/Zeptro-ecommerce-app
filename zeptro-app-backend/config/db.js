import mongoose from "mongoose";

const connectDb = () => {

    // Connect to MongoDB database using the connection URI from environment variables
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

}
export default connectDb;