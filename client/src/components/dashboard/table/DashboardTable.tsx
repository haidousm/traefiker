import DashboardTableHeader from "./header/DashboardTableHeader";
import DashboardTableBody from "./body/DashboardTableBody";
import { Service } from "../../../types/Service";
import { Project } from "../../../types/Project";
import { Dispatch, SetStateAction } from "react";

interface Props {
    project: Project;
    services: Service[];
    setServices: (services: Service[]) => void;
    setServiceToConfigure: Dispatch<SetStateAction<Service | undefined>>;
}

function DashboardTable({
    project,
    services,
    setServices,
    setServiceToConfigure,
}: Props) {
    const columns = [
        { name: "Service Name", screenReaderOnly: false },
        { name: "Image Name", screenReaderOnly: false },
        { name: "Service Hosts", screenReaderOnly: false },
        { name: "Run/Stop", screenReaderOnly: true },
        { name: "Edit", screenReaderOnly: true },
        { name: "Delete", screenReaderOnly: true },
        { name: "Config", screenReaderOnly: true },
        { name: "Order", screenReaderOnly: true },
    ];

    return (
        <table className="min-w-full divide-y divide-gray-200 bg-gray-50">
            <DashboardTableHeader columns={columns} />
            <DashboardTableBody
                columns={columns}
                project={project}
                services={services}
                setServices={setServices}
                setServiceToConfigure={setServiceToConfigure}
            />
        </table>
    );
}

export default DashboardTable;
