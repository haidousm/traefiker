import { ServiceStatus } from "./enums/ServiceStatus";
import { EnvironmentVariable } from "./EnvironmentVariable";
import { Image } from "./Image";
import { Project } from "./Project";
import { Redirect } from "./Redirect";

export interface Service {
    id?: string;
    name: string;
    status: ServiceStatus;
    image: Image;
    hosts: string[];
    environmentVariables: EnvironmentVariable[];
    redirects: Redirect[];
    network?: string;
    containerId?: string;
    internalName?: string;
    project?: Project;
    order: number;
}
