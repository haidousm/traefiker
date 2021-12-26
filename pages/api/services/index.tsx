import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        return res
            .status(200)
            .json(
                docker.getAllServices(
                    docker.getData(process.env.DOCKER_COMPOSE_FILEPATH!)
                )
            );
    } else if (method === "POST") {
        const { name, image, hosts } = req.body;
        const dockerCompose = docker.getData(
            process.env.DOCKER_COMPOSE_FILEPATH!
        );
        const _service = docker.createService(name, image, hosts);
        dockerCompose.services[name] = _service;
        res.status(200).json(_service);
    }
};

export default handler;
