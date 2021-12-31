import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        handleGET(req, res);
    } else if (method === "DELETE") {
        await handleDELETE(req, res);
    }
};

const handleGET = (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query as { name: string };
    res.status(200).json(docker.getServiceByName(name));
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query as { name: string };
    const autoreload = req.query.autoreload === "true";
    docker.deleteService(name);

    if (!autoreload) {
        return res.status(200).json(req.body);
    }
    if (process.env.NODE_ENV === "production") {
        docker.launchDockerCompose(() => {
            res.status(200).json({});
        });
    } else {
        await new Promise<void>((done) => setTimeout(() => done(), 5000));
        res.status(200).json({});
    }
};

export default handler;
