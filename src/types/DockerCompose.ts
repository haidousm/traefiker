import { _Service } from "./Service";

export interface DockerCompose {
    version: string;
    networks: {
        [name: string]: {
            external: boolean;
        };
    };
    services: _Service[];
}
