import { NextApiRequest, NextApiResponse } from "next/types";
import * as docker from "../../../lib/docker";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "GET") {
        return res
            .status(200)
            .json(
                docker.getDockerComposeData(
                    process.env.DOCKER_COMPOSE_FILEPATH!
                )
            );
    }
};

export default handler;
