import { PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { Redirect } from "../../../types/Redirect";
import UrlRedirectsTableRow from "./UrlRedirectsTableRow";

function UrlRedirectsTable(props: {
    redirects: Redirect[];
    handleUpdateRedirect: (redirect: Redirect) => void;
    handleAddNewRedirect: () => void;
    handleDeleteRedirect: (redirect: Redirect) => void;
}) {
    const columns = [
        { name: "From (Regex)", screenReaderOnly: false },
        { name: "To", screenReaderOnly: false },
    ];

    return (
        <table className="min-w-full border-separate">
            <thead>
                <tr>
                    {columns.map((column) => {
                        return (
                            <th
                                key={column.name}
                                scope="col"
                                className={
                                    "text-md border-white-600 border bg-gray-700 px-4 py-1 text-center font-medium tracking-wider text-white"
                                }
                            >
                                {column.name}
                            </th>
                        );
                    })}

                    <th scope="col" className="relative px-6">
                        <span className="sr-only">Add New Redirect</span>
                        <button
                            className="focus:shadow-outline rounded py-2 px-4 font-bold text-green-500 hover:text-green-200 focus:outline-none"
                            onClick={() => {
                                props.handleAddNewRedirect();
                            }}
                        >
                            <PlusCircleIcon className="h-7 w-7" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.redirects !== undefined &&
                props.redirects.length !== 0 ? (
                    props.redirects!.map((urlRedirect: Redirect, i) => (
                        <UrlRedirectsTableRow
                            key={i}
                            urlRedirect={urlRedirect}
                            handleUpdateRedirect={props.handleUpdateRedirect}
                            handleDeleteRedirect={props.handleDeleteRedirect}
                        />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-md border-white-600 border px-4 py-1 text-center font-medium tracking-wider text-white"
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
