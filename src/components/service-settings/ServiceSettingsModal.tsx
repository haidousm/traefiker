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
import UrlRedirectsTable from "./table/UrlRedirectsTable";

const createService = async (service: Service, autoReload: boolean) => {
    return await axios.post(`/api/services?autoreload=${autoReload}`, {
        service,
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

    useEffect(() => {
        setService(redirectsModalOptions.service);
    }, [redirectsModalOptions.service]);

    const saveClicked = async () => {
        closeModal();
        setLoadingFlags({
            ...loadingFlags,
            updatingService: true,
        });
        await createService(service, autoReload);
        setLoadingFlags({
            ...loadingFlags,
            updatingService: false,
        });
    };

    const closeModal = () => {
        setRedirectsModalOptions((state) => ({
            ...state,
            isAddingRedirects: false,
        }));
    };

    const addNewRedirect = () => {
        setService((prevService) => {
            return {
                ...prevService,
                urlRedirects: [
                    ...prevService.urlRedirects,
                    {
                        id: prevService.urlRedirects.length,
                        from: "",
                        to: "",
                    },
                ],
            };
        });
    };

    const updateUrlRedirect = (id: number, fromUrl: string, toUrl: string) => {
        setService((prevService) => {
            return {
                ...prevService,
                urlRedirects: prevService.urlRedirects.map((urlRedirect) => {
                    if (urlRedirect.id === id) {
                        return {
                            ...urlRedirect,
                            from: fromUrl,
                            to: toUrl,
                        };
                    } else {
                        return urlRedirect;
                    }
                }),
            };
        });
    };

    const deleteRedirect = (id: number) => {
        setService({
            ...service,
            urlRedirects: service.urlRedirects!.filter(
                (urlRedirect) => urlRedirect.id !== id
            ),
        });
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
                            service={service}
                            handleAddNewRedirect={addNewRedirect}
                            handleUpdateUrlRedirect={updateUrlRedirect}
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
