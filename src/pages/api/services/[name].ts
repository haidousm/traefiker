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
        if (process.env.NODE_ENV === "production") {
            docker.launchDockerCompose(() => {
                res.status(200).json(_service);
            });
        } else {
            // simulate a delay
            setTimeout(() => {
                res.status(200).json(_service);
            }, 5000);
        }
    } else if (method === "DELETE") {
        docker.deleteService(name);
        if (process.env.NODE_ENV === "production") {
            docker.launchDockerCompose(() => {
                res.status(200).json({});
            });
        } else {
            // simulate a delay
            setTimeout(() => {
                res.status(200).json({});
            }, 5000);
        }
    }
};

export default handler;
