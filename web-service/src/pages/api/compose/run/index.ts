import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../../lib/docker";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        await handleGET(req, res);
    }
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
    if (process.env.NODE_ENV === "production") {
        docker.launchDockerCompose(() => {
            res.status(200).json({});
        });
    } else {
        await new Promise<void>((done) => setTimeout(() => done(), 5000));
        res.status(200).json(req.body);
    }
};

export default handler;
