/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
    isCreatingServiceState,
    loadingFlagsState,
} from "../../../atoms/atoms";
import { Project } from "../../../types/Project";

import { Service } from "../../../types/Service";
import {
    createService,
    deleteService,
    moveServiceToProject,
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
    project: Project;
    services: Service[];
    setServices: (services: Service[]) => void;
    setServiceToConfigure: Dispatch<SetStateAction<Service | undefined>>;
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

function DashboardTableBody({
    columns,
    project,
    services,
    setServices,
    setServiceToConfigure,
}: Props) {
    const [isCreatingService, setIsCreatingService] = useRecoilState(
        isCreatingServiceState
    );
    const [loadingFlags, setLoadingFlags] = useRecoilState(loadingFlagsState);

    const [serviceUnderEditing, setServiceUnderEditing] = useState<
        Service | undefined
    >(undefined);

    const [isEditingService, setIsEditingService] = useState(false);

    useEffect(() => {
        setIsEditingService(serviceUnderEditing !== undefined);
    }, [serviceUnderEditing]);

    const parentSetServices = async (services: Service[]) => {
        setServices(services);
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }
        const reorderedServices = reorder(
            services,
            result.source.index,
            result.destination.index
        );
        parentSetServices(reorderedServices);
        updateServiceOrdering(reorderedServices);
    };

    const saveClicked = async (service: Service) => {
        setServiceUnderEditing(undefined);
        setIsCreatingService(false);
        const index = services.findIndex((s) => s.name === service.name);
        if (index !== -1) {
            const updatedServices = [...services];
            updatedServices[index] = service;
            await parentSetServices(updatedServices);
            await updateService(service);
        } else {
            setLoadingFlags({
                ...loadingFlags,
                creatingService: true,
            });
            service.project = project;
            const createdService = await createService(service);
            await moveServiceToProject(project.name, service.name);
            await parentSetServices([...services, createdService]);
            setLoadingFlags({
                ...loadingFlags,
                creatingService: false,
            });
        }
    };
    const cancelClicked = () => {
        setServiceUnderEditing(undefined);
        setIsCreatingService(false);
    };

    const editClicked = (service: Service) => {
        setServiceUnderEditing(service);
    };

    const deleteClicked = async (service: Service) => {
        parentSetServices(services.filter((s) => s.name !== service.name));
        await deleteService(service);
    };

    const configureServiceClicked = (service: Service) => {
        setServiceToConfigure(service);
    };

    const startServiceClicked = async (service: Service) => {
        await startService(service);
    };

    const stopServiceClicked = async (service: Service) => {
        await stopService(service);
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
                                    redirectsClicked={configureServiceClicked}
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
