import { Service } from "../../../types/Service";
import { Draggable } from "react-beautiful-dnd";
import {
    MenuIcon,
    RefreshIcon,
    SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { StopIcon } from "@heroicons/react/outline";
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
                    <StopIcon
                        className="cursor-pointer text-red-600 h-8 w-8 hover:text-red-800"
                        onClick={() => {
                            stopServiceClicked(service);
                        }}
                    />
                );
            case "stopped":
                return (
                    <RefreshIcon
                        className="cursor-pointer h-8 w-8 text-green-600 hover:text-green-800"
                        onClick={() => {
                            startServiceClicked(service);
                        }}
                    />
                );
            default:
                return (
                    <RefreshIcon className="disabled cursor-pointer h-8 w-8 bg-gray-600" />
                );
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
                            {service.name}
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
                            {service.image.resolvedName}
                        </span>
                    </td>
                    <td className="px-2 py-1 lg:px-6 lg:py-4 whitespace-nowrap text-center">
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
                            className="text-orange-600 hover:text-orange-900 disabled:text-gray-600 disabled:hover:text-gray-600 disabled:cursor-not-allowed flex items-center content-center"
                            onClick={() => {
                                redirectsClicked(service);
                            }}
                            disabled={isLoading}
                        >
                            <SwitchHorizontalIcon className="w-5 h-5 mr-2" />{" "}
                            Redirects
                        </button>
                    </td>
                    <td
                        className="hidden lg:table-cell lg:px-6 lg:py-4 whitespace-nowrap text-right  text-xs
                lg:text-sm font-medium"
                    >
                        <button
                            className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-600 disabled:hover:text-gray-600 disabled:cursor-not-allowed"
                            onClick={() => {
                                editClicked(service);
                            }}
                            disabled={isLoading}
                        >
                            Edit
                        </button>
                    </td>
                    <td
                        className="hidden lg:table-cell lg:px-6 lg:py-4 whitespace-nowrap text-right  text-xs
                lg:text-sm font-medium"
                    >
                        <button
                            className="text-red-600 hover:text-red-900 disabled:text-gray-600 disabled:hover:text-gray-600 disabled:cursor-not-allowed"
                            onClick={() => {
                                deleteClicked(service);
                            }}
                            disabled={isLoading}
                        >
                            Delete
                        </button>
                    </td>

                    <td className="hidden lg:table-cell text-right p-1">
                        <div className="flex justify-end m-2">
                            {getActionIcon()}
                        </div>
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
