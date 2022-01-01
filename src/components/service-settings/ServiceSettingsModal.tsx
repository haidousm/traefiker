import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Service } from "../../types/Service";
import UrlRedirectsTable from "./UrlRedirectsTable";

function ServiceSettingsModal(props: {
    service: Service;
    handleSaveClicked: (service: Service) => void;
}) {
    const [service, setService] = useState(props.service);

    useEffect(() => {
        setService(props.service);
    }, [props.service]);

    const handleSaveClicked = () => {
        props.handleSaveClicked(service);
    };

    const handleDeleteRedirect = (id: number) => {
        setService({
            ...service,
            urlRedirects: service.urlRedirects!.filter(
                (urlRedirect) => urlRedirect.id !== id
            ),
        });
    };
    return (
        <Dialog
            open={true}
            onClose={() => {}}
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="relative bg-gray-800 rounded min-w-1/2 mx-auto flex flex-col justify-center items-center p-4 shadow-lg mb-48">
                    <UrlRedirectsTable
                        service={service}
                        handleDeleteRedirect={handleDeleteRedirect}
                    />
                    <div className="flex justify-end mt-4 w-full">
                        <button
                            className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                            onClick={() => {}}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-indigo-700 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                handleSaveClicked();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default ServiceSettingsModal;
