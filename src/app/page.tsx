import Main from "./components/Main";
import { getLogs } from "./lib/utils";

export default async function Home() {
    // const data = await getLogs();
    const data = await getLogs();


    return (
        //@ts-ignore
        <Main data={data}></Main>
    );
}




