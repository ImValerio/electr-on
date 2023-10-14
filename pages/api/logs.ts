import { NextApiRequest, NextApiResponse } from "next";
import { getLogs } from "../../src/app/page";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if ( req.method === "GET") {
        try {
            const data = await getLogs();

            res.status(200).json(data);
        } catch ({ message }: any) {
            res.status(500).json({ statusCode: 500, message });
        }
    }
}
