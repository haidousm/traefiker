import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { servicesState } from "../../../atoms/atoms";
import { Service } from "../../../types/Service";
import DashboardTableRow from "./DashboardTableRow";
import DashboardTableRowEditable from "./DashboardTableRowEditable";

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

function DashboardTableBody() {
    const [services, setServices] = useRecoilState(servicesState);

    const [serviceUnderEditing, setServiceUnderEditing] = useState<
        Service | undefined
    >(undefined);

    const [isEditingService, setIsEditingService] = useState(false);
    const [isCreatingService, setIsCreatingService] = useState(false);

    useEffect(() => {
        setIsEditingService(serviceUnderEditing !== undefined);
    }, [serviceUnderEditing]);

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

    const saveClicked = (service: Service) => {};
    const cancelClicked = () => {
        setServiceUnderEditing(undefined);
        setIsCreatingService(false);
    };

    const editClicked = (service: Service) => {
        setServiceUnderEditing(service);
    };

    const deleteClicked = (service: Service) => {
        console.log("delete clicked");
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
                                    isLoading={false}
                                    editClicked={editClicked}
                                    deleteClicked={deleteClicked}
                                />
                            )
                        )}
                    </tbody>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DashboardTableBody;

/**
 * {props.isEditing && !props.editedService ? (
                            <DashboardTableRowEditable
                                handleCancelClicked={handleCancelClicked}
                                handleSaveClicked={handleSaveClicked}
                            />
                        ) : null}
                        {props.loadingOptions.fetchingServices ? (
                            <LoadingRow columns={columns} />
                        ) : (
                            services.map((service) => {
                                if (
                                    props.isEditing &&
                                    service.name ===
                                        props.editedService?.name
                                ) {
                                    return (
                                        <DashboardTableRowEditable
                                            key={service.name}
                                            service={service}
                                            handleCancelClicked={
                                                handleCancelClicked
                                            }
                                            handleSaveClicked={
                                                handleSaveClicked
                                            }
                                        />
                                    );
                                }
                                return (
                                    <DashboardTableRow
                                        key={service.name}
                                        isLoading={isLoading}
                                        service={service}
                                        handleEditClicked={
                                            handleEditClicked
                                        }
                                        handleDeleteClicked={
                                            handleDeleteClicked
                                        }
                                    />
                                );
                            })
                        )}
                        {props.loadingOptions.creatingService ? (
                            <LoadingRow columns={columns} />
                        ) : null}
                        {provided.placeholder}
 */
