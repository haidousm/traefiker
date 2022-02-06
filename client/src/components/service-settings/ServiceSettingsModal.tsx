import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    autoReloadState,
    loadingFlagsState,
    redirectsModalState,
    servicesState,
} from "../../atoms/atoms";
import { Service } from "../../types/Service";
import { Redirect } from "../../types/Redirect";
import UrlRedirectsTable from "./table/UrlRedirectsTable";

const ROOT_API_URL = "http://localhost:8081";

const updateService = async (service: Service) => {
    return await axios.put(`${ROOT_API_URL}/api/services/${service.name}`, {
        hosts: service.hosts,
        image: service.image.resolvedName,
        redirects: service.redirects,
    });
};

function ServiceSettingsModal() {
    const [redirectsModalOptions, setRedirectsModalOptions] =
        useRecoilState(redirectsModalState);

    const [service, setService] = useState<Service>(
        redirectsModalOptions.service
    );
    const [redirects, setRedirects] = useState<Redirect[] | undefined>();

    useEffect(() => {
        setService(redirectsModalOptions.service);
        setRedirects(redirectsModalOptions.service.redirects);
    }, [redirectsModalOptions.service]);

    const saveClicked = async () => {
        closeModal();

        const noIdsRedirects = redirects!.map((redirect) => {
            return {
                from: redirect.from,
                to: redirect.to,
            };
        });
        await updateService({
            ...service,
            redirects: noIdsRedirects,
        });
    };

    const closeModal = () => {
        setRedirectsModalOptions((state) => ({
            ...state,
            isAddingRedirects: false,
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
            open={redirectsModalOptions.isAddingRedirects}
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
