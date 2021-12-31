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
    return res.status(200).json(docker.getRawData());
};

const handlePOST = (req: NextApiRequest, res: NextApiResponse) => {
    docker.writeRawData(req.body.YAML);
    return res.status(200).json({});
};
export default handler;
