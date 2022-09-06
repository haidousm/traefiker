import { ContainerInfo } from "./ContainerInfo";
import { ServiceStatus } from "./enums/ServiceStatus";
import { EnvironmentVariable } from "./EnvironmentVariable";
import { Image } from "./Image";
import { Project } from "./Project";
import { Redirect } from "./Redirect";

export interface Service {
    id?: number;
    name: string;
    status: ServiceStatus;
    hosts: string[];

    image: Image;

    environmentVariables: EnvironmentVariable[];
    redirects: Redirect[];

    containerInfo?: ContainerInfo;
    project?: Project;
    order: number;
}
