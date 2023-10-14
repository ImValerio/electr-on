import { GetServerSideProps } from "next";
import Main from "../src/app/components/Main";
import { getLogs } from "../src/app/lib/utils";
import "../src/app/globals.css"
import React from 'react'

const Page = ({data}:any) => {


    return (
        //@ts-ignore
        <Main data={data}></Main>
    );
}
export const getServerSideProps = (async () => {
  const data = await getLogs()
  return { props: { data: JSON.stringify(data) } }
})
export default Page





