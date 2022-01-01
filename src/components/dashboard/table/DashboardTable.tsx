import { Service } from "../../../types/Service";
import DashboardTableRow from "./DashboardTableRow";
import DashboardTableRowEditable from "./DashboardTableRowEditable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useServices from "../../../hooks/useServices";
import LoadingRow from "../../loading/LoadingRow";
import { LoadingOptions } from "../../../types/LoadingOptions";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { servicesState } from "../../../atoms/atoms";
import { getServices } from "../../../pages/dashboard";
import DashboardTableHeader from "./DashboardTableHeader";
import DashboardTableBody from "./DashboardTableBody";

function DashboardTable(props: {
    loadingOptions: LoadingOptions;
    isEditing: boolean;
    editedService: Service | undefined;
    handleSaveClicked: (service: Service) => void;
    handleCancelClicked: () => void;
    handleEditClicked: (service: Service) => void;
    handleDeleteClicked: (service: Service) => void;
}) {
    const [services, setServices] = useRecoilState(servicesState);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        { name: "Service Name", screenReaderOnly: false },
        { name: "Image Name", screenReaderOnly: false },
        { name: "Service Hosts", screenReaderOnly: false },
        { name: "Edit", screenReaderOnly: true },
        { name: "Delete", screenReaderOnly: true },
        { name: "Order", screenReaderOnly: true },
    ];

    useEffect(() => {
        (async () => {
            const services = await getServices();
            setServices(services);
        })();
    }, [setServices]);

    useEffect(() => {
        setIsLoading(
            props.loadingOptions.fetchingServices ||
                props.loadingOptions.creatingService ||
                props.loadingOptions.deletingService ||
                props.loadingOptions.updatingService
        );
    }, [props.loadingOptions]);

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
        <table className="min-w-full divide-y divide-gray-200">
            <DashboardTableHeader columns={columns} />
            <DashboardTableBody />
        </table>
    );
}

export default DashboardTable;
