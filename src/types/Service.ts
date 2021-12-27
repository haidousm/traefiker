export interface DockerCompose {
    version: string;
    networks: {
        [name: string]: {
            external: boolean;
        };
    };
    services: _Service[];
}

export interface Service {
    name: string;
    image: string;
    hosts: string[];
}
export interface _Service {
    image: string;
    labels: string[];
    networks: string[];
}
