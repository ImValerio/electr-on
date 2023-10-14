"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./Loader";

interface CompProps {
    data: string;
}

const Main: React.FC<CompProps> = ({ data: propData }) => {
    const [isOn, setIsOn] = useState(false);
    const [lastLog, setLastLog] = useState("");
    const [logs, setLogs]: any = useState(null);

    const checkIfIsOn = (lastLogs: LogRecord[]) => {
        const now = new Date().getTime(); //  current date
        const lastLog = new Date(
            lastLogs[0].date.split("+")[0].trim()
        ).getTime(); // last log date
        const condition = Math.floor((now - lastLog) / (1000 * 60)) - 120 < 6;
        setIsOn(condition);
    };

    const pollingData = async () => {
        const data = await fetch("/api/logs");

        const rv: LogRecord[] = await data.json();
        checkIfIsOn(rv);
        setLogs(rv);
        setLastLog(dateToString(rv[0].date));
    };

    const dateToString = (dateStr: string) => {
        const date = new Date(dateStr.split("+")[0].trim());
        date.setHours(date.getHours() + 2)
        return date.toLocaleString("it");
    };

    useEffect(() => {
        
        setLogs(() => {
            const tmpLogs = JSON.parse(propData);
            checkIfIsOn(tmpLogs)
            setLastLog(dateToString(tmpLogs[0].date));
            return tmpLogs;
        });
        setInterval(pollingData, 1 * 60 * 1000);
    }, []);

    if (!logs) return <Loader></Loader>;

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
                    <h1 className={isOn ? "text-center font-bold transition-all text-white" : "text-center font-bold transition-all text-black"}>
                        Ultima attività:
                    </h1>
                    <h1
                        className={
                            isOn
                                ? "text-center text-green-600"
                                : "text-center text-red-600 "
                        }
                    >
                        {lastLog}
                    </h1>
                </div>
            </div>
        </main>
    );
};

export default Main;
