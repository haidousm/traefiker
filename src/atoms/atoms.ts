import { atom } from "recoil";
import { Service } from "../types/Service";

export const servicesState = atom({
    key: "services",
    default: <Service[]>[],
});
