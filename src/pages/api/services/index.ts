import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        handleGetRequest(req, res);
    } else if (method === "POST") {
        handlePostRequest(req, res);
    }
};

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(docker.getAllServices());
};

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse) => {
    const { name, image, hosts, order } = req.body;
    const _service = docker.createService(name, image, hosts, order);
    docker.saveService(name, _service);
    if (process.env.NODE_ENV === "production") {
        docker.launchDockerCompose(() => {
            res.status(200).json(_service);
        });
    } else {
        setTimeout(() => {
            res.status(200).json(_service);
        }, 5000);
    }
};
export default handler;
