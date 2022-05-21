interface Props {
    columns: {
        name: string;
        screenReaderOnly: boolean;
    }[];
}

function DashboardTableHeader({ columns }: Props) {
    return (
        <thead className="bg-gray-50">
            <tr>
                {columns.map((column) => {
                    return column.screenReaderOnly ? (
                        <th
                            key={column.name}
                            scope="col"
                            className="relative px-6 py-3 hidden lg:table-cell"
                        >
                            <span className="sr-only">{column.name}</span>
                        </th>
                    ) : (
                        <th
                            key={column.name}
                            scope="col"
                            className={
                                "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" +
                                (column.name === "Image Name"
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
    );
}

export default DashboardTableHeader;
