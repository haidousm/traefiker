import { UrlRedirect } from "./UrlRedirect";

export interface Service {
    name: string;
    image: string;
    hosts: string[];
    order: number;
    urlRedirects: UrlRedirect[];
}
export interface _Service {
    image: string;
    labels: string[];
    networks: string[];
}
