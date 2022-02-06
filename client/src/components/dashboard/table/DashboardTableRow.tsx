import { Service } from "../../../types/Service";
import { Draggable } from "react-beautiful-dnd";
import { MenuIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import seedrandom from "seedrandom";

interface Props {
    service: Service;
    isLoading: boolean;
    redirectsClicked: (service: Service) => void;
    editClicked: (service: Service) => void;
    deleteClicked: (service: Service) => void;
    startServiceClicked: (service: Service) => void;
    stopServiceClicked: (service: Service) => void;
}

function DashboardTableRow({
    service,
    isLoading,
    redirectsClicked,
    editClicked,
    deleteClicked,
    startServiceClicked,
    stopServiceClicked,
}: Props) {
    const getActionIcon = () => {
        switch (service.status) {
            case "running":
                return (
                    <button
                        className="rounded-md bg-red-600 p-2 text-white hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:bg-gray-600"
                        onClick={() => {
                            stopServiceClicked(service);
                        }}
                    >
                        Stop Service
                    </button>
                );
            case "stopped":
            case "created":
                return (
                    <button
                        className="rounded-md bg-green-600 p-2 text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:bg-gray-600"
                        onClick={() => {
                            startServiceClicked(service);
                        }}
                    >
                        Start Service
                    </button>
                );
            default:
                return (
                    <button
                        className="rounded-md bg-green-600 p-2 text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:bg-gray-600"
                        onClick={() => {
                            startServiceClicked(service);
                        }}
                        disabled={true}
                    >
                        Start Service
                    </button>
                );
        }
    };

    const getStatusColor = () => {
        switch (service.status) {
            case "running":
                return "border-green-600";
            case "stopped":
            case "created":
                return "border-red-600";
            default:
                return "border-gray-600";
        }
    };

    return (
        <Draggable
            draggableId={`${seedrandom(service.name).quick()}`}
            index={service.order ? service.order : 0}
        >
            {(provided) => (
                <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <td
                        className={
                            "whitespace-nowrap px-2 py-1 text-center lg:px-6 lg:py-4 " +
                            getStatusColor()
                        }
                        style={{
                            borderLeftWidth: "32px",
                        }}
                    >
                        <span
                            className="
                inline-flex
                rounded-md
                bg-blue-100
                px-4
                py-2
                text-xs
                font-semibold
                leading-5
                text-blue-800
                lg:text-sm
            "
                        >
                            {service.name}
                        </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-2 py-1 text-center sm:table-cell lg:px-6 lg:py-4">
                        <span
                            className="
                inline-flex
                rounded-md
                bg-sky-100
                px-4
                py-2
                text-xs
                font-semibold
                leading-5
                text-sky-800
                lg:text-sm
            "
                        >
                            {service.image.resolvedName}
                        </span>
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-center lg:px-6 lg:py-4">
                        {service.hosts.map((host, index) => (
                            <a
                                href={`https://${host}`}
                                key={index}
                                target={"_blank"}
                                rel="noreferrer"
                                className="block"
                            >
                                <span
                                    className="
                                    m-1
                                    inline-flex
                                    rounded-md
                                    bg-amber-100
                                    px-4
                                    py-2
                                    text-xs
                                    font-semibold
                                    leading-5
                                    text-amber-800
                                    lg:text-sm
                            "
                                >
                                    {host}
                                </span>
                            </a>
                        ))}
                    </td>
                    <td
                        className="hidden whitespace-nowrap text-right text-xs font-medium lg:table-cell  lg:px-6
                lg:py-4 lg:text-sm"
                    >
                        <button
                            className="flex content-center items-center text-orange-600 hover:text-orange-900 disabled:cursor-not-allowed disabled:text-gray-600 disabled:hover:text-gray-600"
                            onClick={() => {
                                redirectsClicked(service);
                            }}
                            disabled={isLoading}
                        >
                            <SwitchHorizontalIcon className="mr-2 h-5 w-5" />{" "}
                            Redirects
                        </button>
                    </td>
                    <td
                        className="hidden whitespace-nowrap text-right text-xs font-medium lg:table-cell  lg:px-6
                lg:py-4 lg:text-sm"
                    >
                        <div className="m-2 flex justify-end">
                            {getActionIcon()}
                        </div>
                    </td>
                    <td
                        className="hidden whitespace-nowrap text-right text-xs font-medium lg:table-cell  lg:px-6
                lg:py-4 lg:text-sm"
                    >
                        <button
                            className="text-indigo-600 hover:text-indigo-900 disabled:cursor-not-allowed disabled:text-gray-600 disabled:hover:text-gray-600"
                            onClick={() => {
                                editClicked(service);
                            }}
                            disabled={isLoading}
                        >
                            Edit
                        </button>
                    </td>
                    <td
                        className="hidden whitespace-nowrap text-right text-xs font-medium lg:table-cell  lg:px-6
                lg:py-4 lg:text-sm"
                    >
                        <button
                            className="text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:text-gray-600 disabled:hover:text-gray-600"
                            onClick={() => {
                                deleteClicked(service);
                            }}
                            disabled={isLoading}
                        >
                            Delete
                        </button>
                    </td>

                    <td className="hidden p-1 text-right lg:table-cell">
                        <div className="m-2 flex justify-end">
                            <MenuIcon className="h-5 w-5" />
                        </div>
                    </td>
                </tr>
            )}
        </Draggable>
    );
}

export default DashboardTableRow;
