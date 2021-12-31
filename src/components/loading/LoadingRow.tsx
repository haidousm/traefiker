function LoadingRow(props: { columns: any }) {
    return (
        <tr className=" animate-pulse">
            {props.columns.map((column: any) => {
                return !column.screenReaderOnly ? (
                    <td
                        key={column.name}
                        className="px-2 py-1 lg:px-6 lg:py-4 whitespace-nowrap text-center"
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
                bg-gray-500
                w-full
                h-8
                animate-pulse
            "
                        ></span>
                    </td>
                ) : (
                    <td
                        key={column.name}
                        className="hidden lg:table-cell lg:px-6 lg:py-4 whitespace-nowrap text-right  text-xs
                    lg:text-sm font-medium"
                    ></td>
                );
            })}
        </tr>
    );
}

export default LoadingRow;
