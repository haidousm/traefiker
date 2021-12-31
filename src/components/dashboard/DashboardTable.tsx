import { Service } from "../../types/Service";
import DashboardTableRow from "./DashboardTableRow";
import DashboardTableRowEditable from "./DashboardTableRowEditable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useServices from "../../hooks/useServices";

function DashboardTable(props: {
    isEditing: boolean;
    editedService: Service | undefined;
    handleSaveClicked: (service: Service) => void;
    handleCancelClicked: () => void;
    handleEditClicked: (service: Service) => void;
    handleDeleteClicked: (service: Service) => void;
    onDragEnd: (result: any) => void;
}) {
    const { services } = useServices();
    const columns = [
        { name: "Service Name", screenReaderOnly: false },
        { name: "Image Name", screenReaderOnly: false },
        { name: "Service Hosts", screenReaderOnly: false },
        { name: "Edit", screenReaderOnly: true },
        { name: "Delete", screenReaderOnly: true },
        { name: "Order", screenReaderOnly: true },
    ];

    const handleSaveClicked = (service: Service) => {
        props.handleSaveClicked(service);
    };

    const handleCancelClicked = () => {
        props.handleCancelClicked();
    };

    const handleEditClicked = (service: Service) => {
        props.handleEditClicked(service);
    };

    const handleDeleteClicked = (service: Service) => {
        props.handleDeleteClicked(service);
    };

    return (
        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        className="
                        py-2
                        align-middle
                        inline-block
                        min-w-full
                        sm:px-6
                        lg:px-8
                    "
                    >
                        <div
                            className="
                            shadow
                            overflow-hidden
                            border-b border-gray-200
                            rounded-lg
                        "
                        >
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map((column) => {
                                            return column.screenReaderOnly ? (
                                                <th
                                                    key={column.name}
                                                    scope="col"
                                                    className="relative px-6 py-3 hidden lg:table-cell"
                                                >
                                                    <span className="sr-only">
                                                        {column.name}
                                                    </span>
                                                </th>
                                            ) : (
                                                <th
                                                    key={column.name}
                                                    scope="col"
                                                    className={
                                                        "px-6 py-3 text-center text-xs font-medium text-gray-500  uppercase tracking-wider" +
                                                        (column.name ===
                                                        "Image Name"
                                                            ? " hidden sm:table-cell"
                                                            : "")
                                                    }
                                                >
                                                    {column.name}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <DragDropContext onDragEnd={props.onDragEnd}>
                                    <Droppable droppableId="list">
                                        {(provided) => (
                                            <tbody
                                                className="bg-white divide-y divide-gray-200"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {props.isEditing &&
                                                !props.editedService ? (
                                                    <DashboardTableRowEditable
                                                        handleCancelClicked={
                                                            handleCancelClicked
                                                        }
                                                        handleSaveClicked={
                                                            handleSaveClicked
                                                        }
                                                    />
                                                ) : null}
                                                {services.map((service) => {
                                                    if (
                                                        props.isEditing &&
                                                        service.name ===
                                                            props.editedService
                                                                ?.name
                                                    ) {
                                                        return (
                                                            <DashboardTableRowEditable
                                                                key={
                                                                    service.name
                                                                }
                                                                service={
                                                                    service
                                                                }
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
                                                            service={service}
                                                            handleEditClicked={
                                                                handleEditClicked
                                                            }
                                                            handleDeleteClicked={
                                                                handleDeleteClicked
                                                            }
                                                        />
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </tbody>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardTable;
