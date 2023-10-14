"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./Loader";

interface CompProps {
    data: LogRecord[];
}

const Main: React.FC<CompProps> = ({ data }) => {
    const [isOn, setIsOn] = useState(false);
    const [lastLog, setLastLog] = useState("");
    const [logs, setLogs]:any = useState([]);

    const checkIfIsOn = (lastLogs: LogRecord[]) => {
        const now = new Date().getTime(); //  current date
        const lastLog = new Date(lastLogs[0].date).getTime(); // last log date
        const condition = Math.floor((now - lastLog) / (1000 * 60)) < 6;
        setIsOn(condition);
    };

    const pollingData = async () => {
        const data = await fetch("/api/logs");

        const rv: LogRecord[] = await data.json();
        checkIfIsOn(rv);
        setLogs(rv);
        setLastLog(new Date(rv[0].date).toLocaleString())
    };

    useEffect(() => {
        checkIfIsOn(data);
        setInterval(pollingData, 1 * 60 * 1000);
        setLastLog(new Date(data[0].date).toLocaleString());
    }, []);

    if (!data) return <Loader></Loader>;

    return (
        <main
            className={
                isOn
                    ? "flex justify-center items-center h-full transition-all bg-slate-900"
                    : "flex justify-center items-center h-full transition-all "
            }
        >
            <div className="flex-col justify-center items-center">
                <Image
                    src={isOn ? "/bulb-on.png" : "/bulb-off.png"}
                    width={300}
                    height={300}
                    alt="blub indicator"
                    className={
                        isOn
                            ? "transition-all animated-bulb"
                            : "transition-all "
                    }
                />

                <div className="mt-5">
                    <h1 className="text-center text-white font-bold">
                        Ultima attività:
                    </h1>
                    <h1 className={isOn ? "text-center text-green-600": "text-center text-red-600 "}>{lastLog}</h1>
                </div>
            </div>
        </main>
    );
};

export default Main;
