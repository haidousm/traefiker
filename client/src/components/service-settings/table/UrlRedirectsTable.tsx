import { PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Service } from "../../../types/Service";
import { UrlRedirect } from "../../../types/UrlRedirect";
import UrlRedirectsTableRow from "./UrlRedirectsTableRow";

function UrlRedirectsTable(props: {
    service: Service;
    handleUpdateUrlRedirect: (
        id: number,
        fromUrl: string,
        toUrl: string
    ) => void;
    handleAddNewRedirect: () => void;
    handleDeleteRedirect: (id: number) => void;
}) {
    const columns = [
        { name: "From (Regex)", screenReaderOnly: false },
        { name: "To", screenReaderOnly: false },
    ];

    return (
        <table className="border-separate min-w-full">
            <thead>
                <tr>
                    {columns.map((column) => {
                        return (
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

                    <th scope="col" className="relative px-6">
                        <span className="sr-only">Add New Redirect</span>
                        <button
                            className="text-green-500 hover:text-green-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                props.handleAddNewRedirect();
                            }}
                        >
                            <PlusCircleIcon className="w-7 h-7" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.service.redirects !== undefined &&
                props.service.redirects.length !== 0 ? (
                    props.service.redirects!.map((urlRedirect: UrlRedirect) => (
                        <UrlRedirectsTableRow
                            key={urlRedirect.id}
                            urlRedirect={urlRedirect}
                            handleUpdateUrlRedirect={
                                props.handleUpdateUrlRedirect
                            }
                            handleDeleteRedirect={props.handleDeleteRedirect}
                        />
                    ))
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
