import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Service } from "../../types/Service";
import { Redirect } from "../../types/Redirect";
import { updateService } from "../../utils/api";
import { EnvironmentVariable } from "../../types/EnvironmentVariable";
import EnvTable from "./env-table/EnvTable";
import RedirsTable from "./redirs-table/RedirsTable";

interface Props {
    service: Service;
    setServiceToConfigure: Dispatch<SetStateAction<Service | undefined>>;
}

function ServiceSettingsModal({ service, setServiceToConfigure }: Props) {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [environments, setEnvironments] = useState<EnvironmentVariable[]>([]);

    useEffect(() => {
        setRedirects(service.redirects ?? []);
        setEnvironments(service.environmentVariables ?? []);
    }, [service]);

    const saveClicked = async () => {
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
            environmentVariables: noIdsEnvironments,
        });
        closeModal();
    };

    const closeModal = () => {
        setServiceToConfigure(undefined);
    };

    console.log(service);

    return (
        <Dialog
            open={true}
            onClose={() => {}}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="flex min-h-screen items-center justify-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                {service !== undefined ? (
                    <div className="relative mx-auto flex w-3/4 flex-col items-center justify-center rounded bg-gray-800 p-4 shadow-lg ">
                        <RedirsTable
                            redirects={service.redirects ?? []}
                            handleUpdateData={(data: Redirect[]) => {
                                setRedirects(data);
                            }}
                        />
                        <EnvTable
                            environments={service.environmentVariables ?? []}
                            handleUpdateData={(data: EnvironmentVariable[]) => {
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
