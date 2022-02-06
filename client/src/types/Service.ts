import { Image } from "./Image";
import { Redirect } from "./UrlRedirect";

export interface Service {
    id?: string;
    name: string;
    image: Image;
    hosts: string[];
    order: number;
    redirects?: Redirect[];
    status: string;
}
export interface _Service {
    image: string;
    labels: string[];
    networks: string[];
}
