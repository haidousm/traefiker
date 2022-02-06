import { Image } from "./Image";
import { UrlRedirect } from "./UrlRedirect";

export interface Service {
    id?: string;
    name: string;
    image: Image;
    hosts: string[];
    order: number;
    redirects: UrlRedirect[];
}
export interface _Service {
    image: string;
    labels: string[];
    networks: string[];
}
