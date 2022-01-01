import { TrashIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { Service } from "../../types/Service";
import { UrlRedirect } from "../../types/UrlRedirect";
import UrlRedirectsTableRow from "./UrlRedirectsTableRow";

function UrlRedirectsTable(props: {
    service: Service;
    handleDeleteRedirect: (id: number) => void;
}) {
    const columns = [
        { name: "From (Regex)", screenReaderOnly: false },
        { name: "To", screenReaderOnly: false },
        { name: "Delete", screenReaderOnly: true },
    ];

    return (
        <table className="border-separate min-w-full">
            <thead>
                <tr>
                    {columns.map((column) => {
                        return column.screenReaderOnly ? (
                            <th
                                key={column.name}
                                scope="col"
                                className="relative px-6"
                            >
                                <span className="sr-only">{column.name}</span>
                            </th>
                        ) : (
                            <th
                                key={column.name}
                                scope="col"
                                className={
                                    "px-4 py-1 bg-gray-700 text-center text-md font-medium text-white tracking-wider border border-white-600"
                                }
                            >
                                {column.name}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {props.service.urlRedirects !== undefined &&
                props.service.urlRedirects.length !== 0 ? (
                    props.service.urlRedirects!.map(
                        (urlRedirect: UrlRedirect) => (
                            <UrlRedirectsTableRow
                                key={urlRedirect.id}
                                service={props.service}
                                urlRedirect={urlRedirect}
                                handleDeleteRedirect={
                                    props.handleDeleteRedirect
                                }
                            />
                        )
                    )
                ) : (
                    <tr>
                        <td
                            colSpan={2}
                            className="px-4 py-1 text-center text-md font-medium text-white tracking-wider border border-white-600"
                        >
                            No Url Redirects Found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default UrlRedirectsTable;
