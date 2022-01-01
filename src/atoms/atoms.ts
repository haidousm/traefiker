import { atom } from "recoil";
import { Service } from "../types/Service";

export const servicesState = atom({
    key: "services",
    default: <Service[]>[],
});

export const isCreatingServiceState = atom({
    key: "isCreatingService",
    default: false,
});

export const autoReloadState = atom({
    key: "autoReload",
    default: false,
});

export const isEditingFileState = atom({
    key: "isEditingFile",
    default: false,
});
