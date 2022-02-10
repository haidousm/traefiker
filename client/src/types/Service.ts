import Environment from "./Environment";
import { Image } from "./Image";
import { Redirect } from "./Redirect";

export interface Service {
    id?: string;
    name: string;
    tag: string;
    image: Image;
    hosts: string[];
    order: number;
    redirects?: Redirect[];
    environments?: Environment[];
    status: string;
}
