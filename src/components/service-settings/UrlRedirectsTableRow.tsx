import { TrashIcon } from "@heroicons/react/solid";
import { UrlRedirect } from "../../types/UrlRedirect";

function UrlRedirectsTableRow(props: { urlRedirect: UrlRedirect }) {
    return (
        <tr>
            <td className="px-4 py-1 text-center text-md font-medium text-white tracking-wider border border-white-600">
                {props.urlRedirect.from}
            </td>
            <td className="px-4 py-1 text-center text-md font-medium text-white tracking-wider border border-white-600">
                {props.urlRedirect.to}
            </td>
            <td className="px-4 py-1 text-center text-md font-medium text-white tracking-wider ">
                <button
                    className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {}}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}

export default UrlRedirectsTableRow;
