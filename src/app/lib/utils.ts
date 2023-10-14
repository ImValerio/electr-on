import connectDB from "./dbConnect";
import Log from "../models/Log";

export  const getLogs = async () => {
    await connectDB();

    // @ts-ignore
    return Log.find()
        .sort("-date")
        .limit(20)
        .lean();
};