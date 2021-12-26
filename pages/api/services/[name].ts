import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { name } = req.query as { name: string };

    if (method === "GET") {
        return res.status(200).json(docker.getServiceByName(name));
    } else if (method === "POST") {
        const { image, hosts } = req.body;
        const _service = docker.createService(name, image, hosts);
        docker.saveService(name, _service);
        docker.launchDockerCompose(() => {
            res.status(200).json(_service);
        });
        res.status(200).json(_service);
    } else if (method === "DELETE") {
        docker.deleteService(name);
        docker.launchDockerCompose(() => {
            res.status(200).json({});
        });
    }
};

export default handler;
