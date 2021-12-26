import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        return res.status(200).json(docker.getAllServices());
    } else if (method === "POST") {
        const { name, image, hosts } = req.body;
        const _service = docker.createService(name, image, hosts);
        docker.saveService(name, _service);
        docker.launchDockerCompose(() => {
            res.status(200).json(_service);
        });
    }
};

export default handler;
