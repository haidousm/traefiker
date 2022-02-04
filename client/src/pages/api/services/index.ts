import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        handleGET(req, res);
    } else if (method === "POST") {
        await handlePOST(req, res);
    }
};

const handleGET = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(docker.getAllServices());
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        service: { name, image, hosts, order, urlRedirects },
    } = req.body;

    const autoreload = req.query.autoreload === "true";

    const _service = docker.createService(
        name,
        image,
        hosts,
        order,
        urlRedirects
    );
    docker.saveService(name, _service);
    if (!autoreload) {
        return res.status(200).json(req.body);
    }
    if (process.env.NODE_ENV === "production") {
        docker.launchDockerCompose(() => {
            res.status(200).json(req.body);
        });
    } else {
        await new Promise<void>((done) => setTimeout(() => done(), 5000));
        res.status(200).json(req.body);
    }
};
export default handler;