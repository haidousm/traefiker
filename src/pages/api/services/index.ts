import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        handleGET(req, res);
    } else if (method === "POST") {
        handlePOST(req, res);
    }
};

const handleGET = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(docker.getAllServices());
};

const handlePOST = (req: NextApiRequest, res: NextApiResponse) => {
    const {
        service: { name, image, hosts, order },
    } = req.body;
    const _service = docker.createService(name, image, hosts, order);
    docker.saveService(name, _service);
    if (process.env.NODE_ENV === "production") {
        docker.launchDockerCompose(() => {
            res.status(200).json(req.body);
        });
    } else {
        res.status(200).json(req.body);
    }
};
export default handler;
