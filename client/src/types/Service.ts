import { Image } from "./Image";
import { Redirect } from "./Redirect";

export interface Service {
    id?: string;
    name: string;
    image: Image;
    hosts: string[];
    order: number;
    redirects?: Redirect[];
    status: string;
}
