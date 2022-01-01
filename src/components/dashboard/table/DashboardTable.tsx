import DashboardTableHeader from "./DashboardTableHeader";
import DashboardTableBody from "./DashboardTableBody";

function DashboardTable() {
    const columns = [
        { name: "Service Name", screenReaderOnly: false },
        { name: "Image Name", screenReaderOnly: false },
        { name: "Service Hosts", screenReaderOnly: false },
        { name: "Edit", screenReaderOnly: true },
        { name: "Delete", screenReaderOnly: true },
        { name: "Order", screenReaderOnly: true },
    ];

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <DashboardTableHeader columns={columns} />
            <DashboardTableBody />
        </table>
    );
}

export default DashboardTable;
