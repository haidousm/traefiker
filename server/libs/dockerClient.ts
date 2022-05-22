/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * a BUNCH of workarounds to get Dockerode to work with ssh
 */

import Docker from "dockerode";
import { Agent } from "http";
const ssh = require("docker-modem/lib/ssh");

declare module "dockerode" {
    interface DockerOptions {
        socketPath?: string | undefined;
        host?: string | undefined;
        port?: number | string | undefined;
        username?: string | undefined;
        ca?: string | string[] | Buffer | Buffer[] | undefined;
        cert?: string | string[] | Buffer | Buffer[] | undefined;
        key?: string | string[] | Buffer | Buffer[] | KeyObject[] | undefined;
        protocol?: "https" | "http" | "ssh" | undefined;
        timeout?: number | undefined;
        version?: string | undefined;
        sshAuthAgent?: string | undefined;
        agent?: Agent | undefined;
        Promise?: typeof Promise | undefined;
    }
}

export const createSSHDockerClient = (
    username: string,
    host: string,
    port: number,
    privateKey: string
) => {
    const agent = new ssh({
        host: host,
        port: port,
        username: username,
        privateKey: privateKey,
    });

    return new Docker({
        protocol: "http",
        agent: agent,
    });
};

export const createSocketDockerClient = () => {
    return new Docker({
        socketPath: "/var/run/docker.sock",
    });
};
