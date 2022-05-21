import { atom } from "recoil";
import { LoadingOptions } from "../types/LoadingOptions";
import { Service } from "../types/Service";

export const isCreatingServiceState = atom({
    key: "isCreatingService",
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
