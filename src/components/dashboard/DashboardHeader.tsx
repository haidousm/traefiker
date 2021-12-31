import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

function DashboardHeader(props: {
    handleAutoReloadClicked: (enabled: boolean) => void;
    handleNewServiceClicked: () => void;
    handleRunComposeClicked: () => void;
}) {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const isEnabled = localStorage.getItem("autoReload") === "true";
        setEnabled(isEnabled);
    }, []);

    useEffect(() => {
        props.handleAutoReloadClicked(enabled);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);
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
                        onClick={() => {
                            props.handleNewServiceClicked();
                        }}
                    >
                        Add New Service
                    </button>
                </div>
                <div
                    className="mx-12 py-6 px-4 sm:px-6 lg:px-8 items-center hidden
                            md:flex"
                >
                    <Switch.Group>
                        <div className="flex items-center">
                            <Switch.Label className="mr-4 text-md font-bold text-gray-500 m-0">
                                Auto Reload
                            </Switch.Label>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                    enabled ? "bg-green-600" : "bg-gray-200"
                                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                            >
                                <span
                                    className={`${
                                        enabled
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                />
                            </Switch>
                        </div>
                    </Switch.Group>
                    <button
                        type="button"
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
                        onClick={() => {
                            props.handleRunComposeClicked();
                        }}
                    >
                        Run Docker Compose
                    </button>
                </div>
            </header>
        </div>
    );
}

export default DashboardHeader;
