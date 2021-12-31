import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        handleGET(req, res);
    } else if (method === "DELETE") {
        handleDELETE(req, res);
    }
};

const handleGET = (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query as { name: string };
    res.status(200).json(docker.getServiceByName(name));
};

const handleDELETE = (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query as { name: string };
    docker.deleteService(name);
    if (process.env.NODE_ENV === "production") {
        docker.launchDockerCompose(() => {
            res.status(200).json({});
        });
    } else {
        res.status(200).json({});
    }
};

export default handler;
