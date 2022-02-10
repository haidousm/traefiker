import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Environment from "../../../types/Environment";
import { Redirect } from "../../../types/Redirect";

function EnvironmentsTableRow(props: {
    environment: Environment;
    handleUpdateEnvironment: (environment: Environment) => void;
    handleDeleteEnvironment: (environment: Environment) => void;
}) {
    const [key, setKey] = useState(props.environment.key);
    const [value, setValue] = useState(props.environment.value);

    useEffect(() => {
        props.handleUpdateEnvironment({
            ...props.environment,
            key: key,
            value: value,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, value]);

    return (
        <tr>
            <td className="text-md border-white-600 w-auto border px-4 py-1 font-medium tracking-wider text-white">
                <input
                    id="From Url"
                    type="text"
                    className="w-full border-b-2 border-white bg-transparent outline-none"
                    placeholder="From Url.."
                    value={key}
                    onChange={(e) => {
                        setKey(e.target.value);
                    }}
                />
            </td>
            <td className="text-md border-white-600  w-auto border px-4 py-1 font-medium tracking-wider text-white">
                <input
                    id="To Url"
                    type="text"
                    className="w-full border-b-2 border-white bg-transparent outline-none"
                    placeholder="To Url.."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            </td>
            <td className="text-md px-4 py-1 text-center font-medium tracking-wider text-white  ">
                <button
                    className="focus:shadow-outline rounded bg-transparent py-2 px-4 font-bold text-red-700 hover:text-red-400 focus:outline-none "
                    onClick={() => {
                        props.handleDeleteEnvironment(props.environment);
                    }}
                >
                    <TrashIcon className="h-7 w-7" />
                </button>
            </td>
        </tr>
    );
}

export default EnvironmentsTableRow;
