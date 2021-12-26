import { Service } from "../../lib/docker";
import DashboardTableRow from "./DashboardTableRow";

function DashboardTable(props: { services: Service[] }) {
    const columns = [
        { name: "Service Name", screenReaderOnly: false },
        { name: "Image Name", screenReaderOnly: false },
        { name: "Service Hosts", screenReaderOnly: false },
        { name: "Edit", screenReaderOnly: true },
        { name: "Delete", screenReaderOnly: true },
    ];

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
