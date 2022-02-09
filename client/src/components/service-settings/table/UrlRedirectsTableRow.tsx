import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Redirect } from "../../../types/Redirect";

function UrlRedirectsTableRow(props: {
    urlRedirect: Redirect;
    handleUpdateRedirect: (redirect: Redirect) => void;
    handleDeleteRedirect: (redirect: Redirect) => void;
}) {
    const [fromUrl, setFromUrl] = useState(props.urlRedirect.from);
    const [toUrl, setToUrl] = useState(props.urlRedirect.to);

    useEffect(() => {
        props.handleUpdateRedirect({
            ...props.urlRedirect,
            from: fromUrl,
            to: toUrl,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromUrl, toUrl]);

    return (
        <tr>
            <td className="text-md border-white-600 w-auto border px-4 py-1 font-medium tracking-wider text-white">
                <input
                    id="From Url"
                    type="text"
                    className="w-full border-b-2 border-white bg-transparent outline-none"
                    placeholder="From Url.."
                    value={fromUrl}
                    onChange={(e) => {
                        setFromUrl(e.target.value);
                    }}
                />
            </td>
            <td className="text-md border-white-600  w-auto border px-4 py-1 font-medium tracking-wider text-white">
                <input
                    id="To Url"
                    type="text"
                    className="w-full border-b-2 border-white bg-transparent outline-none"
                    placeholder="To Url.."
                    value={toUrl}
                    onChange={(e) => {
                        setToUrl(e.target.value);
                    }}
                />
            </td>
            <td className="text-md px-4 py-1 text-center font-medium tracking-wider text-white  ">
                <button
                    className="focus:shadow-outline rounded bg-transparent py-2 px-4 font-bold text-red-700 hover:text-red-400 focus:outline-none "
                    onClick={() => {
                        props.handleDeleteRedirect(props.urlRedirect);
                    }}
                >
                    <TrashIcon className="h-7 w-7" />
                </button>
            </td>
        </tr>
    );
}

export default UrlRedirectsTableRow;
