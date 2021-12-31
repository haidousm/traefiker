import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../../lib/docker";
import { Service } from "../../../../types/Service";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "PUT") {
        return handlePUTRequest(req, res);
    }
};

const handlePUTRequest = (req: NextApiRequest, res: NextApiResponse) => {
    const { services } = req.body;
    services.forEach((service: Service) => {
        docker.updateServiceOrder(service.name, service.order);
    });
    return res.status(200).send({});
};
export default handler;