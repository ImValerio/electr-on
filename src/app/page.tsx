import connectDB from "./lib/dbConnect";
import Log from "./models/Log";
import Main from "./components/Main";

export default async function Home() {
    // const data = await getLogs();
    const data = await getLogs();


    return (
        <Main data={data}></Main>
    );
}


export const getLogs = async () => {
    await connectDB();

    // @ts-ignore
    return Log.find()
        .sort("-date")
        .limit(20)
        .lean();
};

