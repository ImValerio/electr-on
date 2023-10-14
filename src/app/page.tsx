import Main from "./components/Main";
import { getLogs } from "./lib/utils";

import React from 'react'

const Page = async () => {
  const data = await getLogs();


    return (
        //@ts-ignore
        <Main data={data}></Main>
    );
}

export default Page





