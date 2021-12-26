import { Service } from "../../lib/docker";
import DashboardTableRow from "./DashboardTableRow";
import DashboardTableRowEditable from "./DashboardTableRowEditable";

function DashboardTable(props: {
    services: Service[];
    isEditing: boolean;
    handleSaveClicked: (service: Service) => void;
    handleCancelClicked: () => void;
}) {
    const columns = [
        { name: "Service Name", screenReaderOnly: false },
        { name: "Image Name", screenReaderOnly: false },
        { name: "Service Hosts", screenReaderOnly: false },
        { name: "Edit", screenReaderOnly: true },
        { name: "Delete", screenReaderOnly: true },
    ];

    const handleSaveClicked = (service: Service) => {
        props.handleSaveClicked(service);
    };

    const handleCancelClicked = () => {
        props.handleCancelClicked();
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
                            sm:rounded-lg
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
                                                    className="relative px-6 py-3"
                                                >
                                                    <span className="sr-only">
                                                        {column.name}
                                                    </span>
                                                </th>
                                            ) : (
                                                <th
                                                    key={column.name}
                                                    scope="col"
                                                    className="
                                            px-6
                                            py-3
                                            text-center text-xs
                                            font-medium
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                                >
                                                    {column.name}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {props.isEditing ? (
                                        <DashboardTableRowEditable
                                            handleCancelClicked={
                                                handleCancelClicked
                                            }
                                            handleSaveClicked={
                                                handleSaveClicked
                                            }
                                        />
                                    ) : null}
                                    {props.services.map((service) => (
                                        <DashboardTableRow
                                            key={service.name}
                                            service={service}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardTable;
