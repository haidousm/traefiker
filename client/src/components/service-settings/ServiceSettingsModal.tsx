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
import { Redirect } from "../../types/UrlRedirect";
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

    const [loadingFlags, setLoadingFlags] = useRecoilState(loadingFlagsState);

    const autoReload = useRecoilValue(autoReloadState);
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
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                {service !== undefined ? (
                    <div className="relative bg-gray-800 rounded w-3/4 mx-auto flex flex-col justify-center items-center p-4 shadow-lg ">
                        <UrlRedirectsTable
                            redirects={redirects!}
                            handleUpdateRedirect={updateRedirect}
                            handleAddNewRedirect={addNewRedirect}
                            handleDeleteRedirect={deleteRedirect}
                        />
                        <div className="flex justify-end mt-4 mr-6 w-full">
                            <button
                                className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-indigo-700 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
