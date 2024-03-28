import mongoose from "mongoose";

const connectToMongo = async () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToMongo;
