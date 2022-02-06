import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    autoReloadState,
    isCreatingServiceState,
    loadingFlagsState,
    redirectsModalState,
    servicesState,
} from "../../../atoms/atoms";

import { Service } from "../../../types/Service";
import SkeletonRow from "../../loading/SkeletonRow";
import DashboardTableRow from "./DashboardTableRow";
import DashboardTableRowEditable from "./DashboardTableRowEditable";

const ROOT_API_URL = "http://localhost:8081";

interface Props {
    columns: {
        name: string;
        screenReaderOnly: boolean;
    }[];
}

const reorder = (list: Service[], startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) {
        return list;
    }
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reordered = result.map((item, index) => {
        return { ...item, order: index };
    });

    return reordered;
};

const getServices = async () => {
    return await (
        await axios.get(`${ROOT_API_URL}/api/services`)
    ).data;
};

const createService = async (service: Service, autoReload: boolean) => {
    return await axios.post(`${ROOT_API_URL}/api/services/create`, {
        name: service.name,
        image: service.image.resolvedName,
        hosts: service.hosts,
        redirects: service.redirects,
        order: service.order ?? 0,
    });
};

const updateService = async (service: Service) => {
    return await axios.put(`${ROOT_API_URL}/api/services/${service.name}`, {
        hosts: service.hosts,
        image: service.image.resolvedName,
    });
};

const deleteService = async (service: Service, autoReload: boolean) => {
    return await axios.delete(
        `/api/services/${service.name}?autoreload=${autoReload}`
    );
};

const updateServiceOrdering = async (services: Service[]) => {
    return await axios.put("/api/services/ordering", { services });
};

function DashboardTableBody({ columns }: Props) {
    const [services, setServices] = useRecoilState(servicesState);
    const [isCreatingService, setIsCreatingService] = useRecoilState(
        isCreatingServiceState
    );

    const [loadingFlags, setLoadingFlags] = useRecoilState(loadingFlagsState);

    const [, setRedirectsModalOptions] = useRecoilState(redirectsModalState);

    const [serviceUnderEditing, setServiceUnderEditing] = useState<
        Service | undefined
    >(undefined);

    const [isEditingService, setIsEditingService] = useState(false);

    const autoReload = useRecoilValue(autoReloadState);

    useEffect(() => {
        (async () => {
            const services = await getServices();
            setServices(services);
        })();
    }, [setServices]);

    useEffect(() => {
        setIsEditingService(serviceUnderEditing !== undefined);
    }, [serviceUnderEditing]);

    // useEffect(() => {
    //     updateServiceOrdering(services);
    // }, [services]);

    const onDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }
        const reorderedServices = reorder(
            services,
            result.source.index,
            result.destination.index
        );
        setServices(reorderedServices);
    };

    const saveClicked = async (service: Service) => {
        setServiceUnderEditing(undefined);
        setIsCreatingService(false);
        const index = services.findIndex((s) => s.name === service.name);
        if (index !== -1) {
            const updatedServices = [...services];
            updatedServices[index] = service;
            setServices(updatedServices);
            await updateService(service);
        } else {
            service.order = services.length;
            await createService(service, autoReload);
        }
        const updatedServices = await getServices();
        setServices(updatedServices);
    };
    const cancelClicked = () => {
        setServiceUnderEditing(undefined);
        setIsCreatingService(false);
    };

    const editClicked = (service: Service) => {
        setServiceUnderEditing(service);
    };

    const deleteClicked = async (service: Service) => {
        setLoadingFlags((prev) => ({
            ...prev,
            deletingService: true && autoReload,
        }));

        const res = await deleteService(service, autoReload);
        if (res.status === 200) {
            let updatedServices = services;
            updatedServices = updatedServices
                .map((s) => {
                    if (s.order > service.order) {
                        s.order--;
                    }
                    return s;
                })
                .filter((s) => s.name !== service.name);
            setServices(updatedServices);
            setLoadingFlags((prev) => ({ ...prev, deletingService: false }));
        }
    };

    const redirectsClicked = (service: Service) => {
        setRedirectsModalOptions({
            isAddingRedirects: true,
            service: service,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <tbody
                        className="bg-white divide-y divide-gray-200"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {isCreatingService ? (
                            <DashboardTableRowEditable
                                cancelClicked={cancelClicked}
                                saveClicked={saveClicked}
                            />
                        ) : null}
                        {services.map((service) =>
                            isEditingService &&
                            service.name === serviceUnderEditing?.name ? (
                                <DashboardTableRowEditable
                                    key={service.name}
                                    service={serviceUnderEditing}
                                    cancelClicked={cancelClicked}
                                    saveClicked={saveClicked}
                                />
                            ) : (
                                <DashboardTableRow
                                    key={service.name}
                                    service={service}
                                    isLoading={
                                        loadingFlags.creatingService ||
                                        loadingFlags.updatingService ||
                                        loadingFlags.deletingService
                                    }
                                    redirectsClicked={redirectsClicked}
                                    editClicked={editClicked}
                                    deleteClicked={deleteClicked}
                                />
                            )
                        )}
                        {provided.placeholder}
                        {loadingFlags.creatingService && autoReload ? (
                            <SkeletonRow columns={columns} />
                        ) : null}
                    </tbody>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DashboardTableBody;
