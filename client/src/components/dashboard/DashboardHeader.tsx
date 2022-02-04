/* eslint-disable react-hooks/exhaustive-deps */
import { Switch } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
    autoReloadState,
    isCreatingServiceState,
    isEditingFileState,
    loadingFlagsState,
} from "../../atoms/atoms";

function DashboardHeader() {
    const [_, setIsCreatingService] = useRecoilState(isCreatingServiceState);
    const [autoReload, setAutoReload] = useRecoilState(autoReloadState);
    const [_isEditingFile, setIsEditingFile] =
        useRecoilState(isEditingFileState);

    const [, setLoadingFlags] = useRecoilState(loadingFlagsState);

    useEffect(() => {
        const isEnabled = localStorage.getItem("autoReload") === "true";
        setAutoReload(isEnabled);
    }, []);

    const newServiceClicked = () => {
        setIsCreatingService(true);
    };

    const autoReloadToggled = (enabled: boolean) => {
        localStorage.setItem("autoReload", enabled.toString());
        setAutoReload(enabled);
    };

    const editFileClicked = () => {
        setIsEditingFile(true);
    };

    const runComposeClicked = async () => {
        setLoadingFlags((prev) => ({ ...prev, updatingService: true }));
        await axios.get("/api/compose/run");
        setLoadingFlags((prev) => ({ ...prev, updatingService: false }));
    };
    return (
        <div>
            <header className="bg-white shadow flex justify-between items-center">
                <div className="mx-12 py-6 px-4 sm:px-6 lg:px-8 flex ">
                    <h1 className="text-3xl font-bold text-gray-900 m-0">
                        Services
                    </h1>
                    <button
                        type="button"
                        className="
                            hidden
                            lg:block
                            ml-4
                            px-5
                            py-2
                            rounded
                            overflow-hidden
                            focus:outline-none focus:shadow-outline
                            transition
                            ease-out
                            duration-200
                            bg-blue-100
                            hover:bg-blue-500
                            text-blue-800 text-sm
                            hover:text-white
                            lg:text-base
                            "
                        onClick={newServiceClicked}
                    >
                        Add New Service
                    </button>
                </div>
                <div
                    className="mx-12 py-6 px-4 sm:px-6 lg:px-8 items-center hidden
                            lg:flex"
                >
                    <Switch.Group>
                        <div className="flex items-center">
                            <Switch.Label className="mr-4 text-md font-bold text-gray-500 m-0">
                                Auto Reload
                            </Switch.Label>
                            <Switch
                                checked={autoReload}
                                onChange={autoReloadToggled}
                                className={`${
                                    autoReload ? "bg-green-600" : "bg-gray-200"
                                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                            >
                                <span
                                    className={`${
                                        autoReload
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                />
                            </Switch>
                        </div>
                    </Switch.Group>
                    <button
                        className="
                            hidden
                            md:flex
                            mx-5
                            px-5
                            py-2
                            rounded
                            overflow-hidden
                            focus:outline-none focus:shadow-outline
                            transition
                            ease-out
                            duration-200
                            bg-indigo-500
                            hover:bg-indigo-100
                            text-white text-sm
                            hover:text-indigo-800
                            lg:text-base
                            items-center
                            justify-center
                            "
                        onClick={editFileClicked}
                    >
                        <PencilIcon className="w-5 h-5 mr-2" />
                        Edit File
                    </button>
                    <button
                        className="
                            hidden
                            md:block
                            mx-5
                            px-5
                            py-2
                            rounded
                            overflow-hidden
                            focus:outline-none focus:shadow-outline
                            transition
                            ease-out
                            duration-200
                            bg-red-500
                            hover:bg-red-100
                            text-white text-sm
                            hover:text-red-800
                            lg:text-base
                            "
                        onClick={runComposeClicked}
                    >
                        Run Docker Compose
                    </button>
                </div>
            </header>
        </div>
    );
}

export default DashboardHeader;
