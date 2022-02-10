import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsModalState } from "../../atoms/atoms";
import { Service } from "../../types/Service";
import { Redirect } from "../../types/Redirect";
import UrlRedirectsTable from "./url-redirects/UrlRedirectsTable";
import { updateService } from "../../utils/api";
import Environment from "../../types/Environment";
import EnvTable from "./env-table/EnvTable";

function ServiceSettingsModal() {
    const [settingsModalOptions, setSettingsModalOptions] =
        useRecoilState(settingsModalState);

    const [service, setService] = useState<Service>(
        settingsModalOptions.service
    );
    const [redirects, setRedirects] = useState<Redirect[]>();
    const [environments, setEnvironments] = useState<Environment[]>([]);

    useEffect(() => {
        setService(settingsModalOptions.service);
        setRedirects(settingsModalOptions.service.redirects);
        setEnvironments(settingsModalOptions.service.environments ?? []);
    }, [settingsModalOptions.service]);

    const saveClicked = async () => {
        closeModal();

        const noIdsRedirects = redirects!.map((redirect) => {
            return {
                from: redirect.from,
                to: redirect.to,
            };
        });

        const noIdsEnvironments = environments!.map((environment) => {
            return {
                key: environment.key,
                value: environment.value,
            };
        });

        await updateService({
            ...service,
            redirects: noIdsRedirects,
            environments: noIdsEnvironments,
        });
    };

    const closeModal = () => {
        setSettingsModalOptions((state) => ({
            ...state,
            isEditingSettings: false,
        }));
    };

    const addNewRedirect = () => {
        setRedirects((prevRedirects) => {
            return [
                ...prevRedirects!,
                {
                    _id: prevRedirects ? `${prevRedirects.length + 1}` : "0",
                    from: "",
                    to: "",
                },
            ];
        });
    };

    const updateRedirect = (redirect: Redirect) => {
        setRedirects((prevRedirects) => {
            return prevRedirects!.map((prevRedirect) => {
                if (prevRedirect._id == redirect._id) {
                    return redirect;
                }
                return prevRedirect;
            });
        });
    };

    const deleteRedirect = (redirect: Redirect) => {
        const newRedirects = redirects!.filter((prevRedirect) => {
            return prevRedirect._id !== redirect._id;
        });
        setRedirects(newRedirects);
    };

    return (
        <Dialog
            open={settingsModalOptions.isEditingSettings}
            onClose={() => {}}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="flex min-h-screen items-center justify-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                {service !== undefined ? (
                    <div className="relative mx-auto flex w-3/4 flex-col items-center justify-center rounded bg-gray-800 p-4 shadow-lg ">
                        <UrlRedirectsTable
                            redirects={redirects!}
                            handleUpdateRedirect={updateRedirect}
                            handleAddNewRedirect={addNewRedirect}
                            handleDeleteRedirect={deleteRedirect}
                        />
                        <EnvTable
                            environments={environments}
                            handleUpdateData={(data: Environment[]) => {
                                setEnvironments(data);
                            }}
                        />
                        <div className="mt-4 mr-6 flex w-full justify-end">
                            <button
                                className="focus:shadow-outline mx-2 rounded bg-red-700 py-2 px-4 font-bold text-white hover:bg-red-400 focus:outline-none"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="focus:shadow-outline rounded bg-indigo-700 py-2 px-4 font-bold text-white hover:bg-indigo-400 focus:outline-none"
                                onClick={saveClicked}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </Dialog>
    );
}

export default ServiceSettingsModal;
