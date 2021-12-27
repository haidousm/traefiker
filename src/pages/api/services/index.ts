import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";
import { Service } from "../../../types/Service";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        const services: Service[] = docker
            .getAllServices()
            .map((service, i) => {
                service.order = i;
                return service;
            });
        return res.status(200).json(services);
    } else if (method === "POST") {
        const { name, image, hosts } = req.body;
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
    }
};

export default handler;
