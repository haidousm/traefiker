import { atom } from "recoil";
import { LoadingOptions } from "../types/LoadingOptions";
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

export const loadingFlagsState = atom({
    key: "loadingFlags",
    default: <LoadingOptions>{
        fetchingServices: false,
        creatingService: false,
        deletingService: false,
        updatingService: false,
    },
});
