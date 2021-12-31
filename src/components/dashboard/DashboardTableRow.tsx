import { Service } from "../../types/Service";
import { Draggable } from "react-beautiful-dnd";
import { MenuIcon } from "@heroicons/react/solid";
import seedrandom from "seedrandom";

function DashboardTableRow(props: {
    service: Service;
    handleEditClicked: (service: Service) => void;
    handleDeleteClicked: (service: Service) => void;
}) {
    return (
        <Draggable
            draggableId={`${seedrandom(props.service.name).quick()}`}
            index={props.service.order ? props.service.order : 0}
        >
            {(provided) => (
                <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <td className="px-2 py-1 lg:px-6 lg:py-4 whitespace-nowrap text-center">
                        <span
                            className="
                px-4
                py-2
                inline-flex
                text-xs
                lg:text-sm
                leading-5
                font-semibold
                rounded-md
                bg-blue-100
                text-blue-800
            "
                        >
                            {props.service.name}
                        </span>
                    </td>
                    <td className="hidden sm:table-cell px-2 py-1 lg:px-6 lg:py-4 whitespace-nowrap text-center">
                        <span
                            className="
                px-4
                py-2
                inline-flex
                text-xs
                lg:text-sm
                leading-5
                font-semibold
                rounded-md
                bg-sky-100
                text-sky-800
            "
                        >
                            {props.service.image}
                        </span>
                    </td>
                    <td className="px-2 py-1 lg:px-6 lg:py-4 whitespace-nowrap text-center">
                        {props.service.hosts.map((host, index) => (
                            <a href={`https://${host}`} key={index}>
                                <span
                                    className="
                                    px-4
                                    py-2
                                    inline-flex
                                    text-xs
                                    lg:text-sm
                                    leading-5
                                    font-semibold
                                    rounded-md
                                    bg-amber-100
                                    text-amber-800
                                    m-1
                            "
                                >
                                    {host}
                                </span>
                            </a>
                        ))}
                    </td>

                    <td
                        className="hidden lg:table-cell lg:px-6 lg:py-4 whitespace-nowrap text-right  text-xs
                lg:text-sm font-medium"
                    >
                        <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => {
                                props.handleEditClicked(props.service);
                            }}
                        >
                            Edit
                        </button>
                    </td>
                    <td
                        className="hidden lg:table-cell lg:px-6 lg:py-4 whitespace-nowrap text-right  text-xs
                lg:text-sm font-medium"
                    >
                        <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                                props.handleDeleteClicked(props.service);
                            }}
                        >
                            Delete
                        </button>
                    </td>
                    <td className="hidden lg:table-cell text-right p-1">
                        <div className="flex justify-end m-2">
                            <MenuIcon className="w-5 h-5" />
                        </div>
                    </td>
                </tr>
            )}
        </Draggable>
    );
}

export default DashboardTableRow;
