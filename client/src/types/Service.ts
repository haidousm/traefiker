import { Image } from "./Image";
import { Redirect } from "./UrlRedirect";

export interface Service {
    id?: string;
    name: string;
    image: Image;
    hosts: string[];
    order: number;
    redirects?: Redirect[];
}
export interface _Service {
    image: string;
    labels: string[];
    networks: string[];
}
