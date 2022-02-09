import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
    isCreatingServiceState,
    loadingFlagsState,
    redirectsModalState,
    servicesState,
} from "../../../atoms/atoms";

import { Service } from "../../../types/Service";
import {
    createService,
    deleteService,
    getServices,
    startService,
    stopService,
    updateService,
    updateServiceOrdering,
} from "../../../utils/api";
import SkeletonRow from "../../loading/SkeletonRow";
import DashboardTableRow from "./DashboardTableRow";
import DashboardTableRowEditable from "./DashboardTableRowEditable";

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

    useEffect(() => {
        (async () => {
            const services = await getServices();
            setServices(
                services.sort((a: Service, b: Service) => a.order - b.order)
            );
        })();
    }, [setServices]);

    useEffect(() => {
        setIsEditingService(serviceUnderEditing !== undefined);
    }, [serviceUnderEditing]);

    useEffect(() => {
        updateServiceOrdering(services);
    }, [services]);

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
            setLoadingFlags({
                ...loadingFlags,
                creatingService: true,
            });
            service.order = services.length;
            await createService(service);
        }
        const updatedServices = await getServices();
        setServices(updatedServices);
        setLoadingFlags({
            ...loadingFlags,
            creatingService: false,
        });
    };
    const cancelClicked = () => {
        setServiceUnderEditing(undefined);
        setIsCreatingService(false);
    };

    const editClicked = (service: Service) => {
        setServiceUnderEditing(service);
    };

    const deleteClicked = async (service: Service) => {
        setServices((prevServices) =>
            prevServices.filter((s) => s.name !== service.name)
        );
        await deleteService(service);
        const updatedServices = await getServices();
        setServices(updatedServices);
    };

    const redirectsClicked = (service: Service) => {
        setRedirectsModalOptions({
            isAddingRedirects: true,
            service: service,
        });
    };

    const startServiceClicked = async (service: Service) => {
        setServices(
            services.map((s) => {
                if (s.name === service.name) {
                    return { ...s, status: "running" };
                }
                return s;
            })
        );
        await startService(service);
        const updatedServices = await getServices();
        setServices(updatedServices);
    };

    const stopServiceClicked = async (service: Service) => {
        setServices(
            services.map((s) => {
                if (s.name === service.name) {
                    return { ...s, status: "stopped" };
                }
                return s;
            })
        );
        await stopService(service);
        const updatedServices = await getServices();
        setServices(updatedServices);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <tbody
                        className="divide-y divide-gray-200 bg-white"
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
                                    startServiceClicked={startServiceClicked}
                                    stopServiceClicked={stopServiceClicked}
                                />
                            )
                        )}
                        {provided.placeholder}
                        {loadingFlags.creatingService ? (
                            <SkeletonRow columns={columns} />
                        ) : null}
                    </tbody>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DashboardTableBody;
