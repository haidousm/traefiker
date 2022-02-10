/* eslint-disable react-hooks/exhaustive-deps */
import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Environment from "../../../types/Environment";
import { Redirect } from "../../../types/Redirect";

interface Props {
    data: Redirect | Environment;
    placeholderText: {
        columnA: string;
        columnB: string;
    };
    handleUpdateData: (data: Redirect | Environment) => void;
    handleDeleteData: (data: Redirect | Environment) => void;
}

function SettingsTableRow({
    data,
    placeholderText,
    handleUpdateData,
    handleDeleteData,
}: Props) {
    const [columnA, setColumnA] = useState<string>("");
    const [columnB, setColumnB] = useState<string>("");

    useEffect(() => {
        if ("from" in data) {
            const redirect = data as Redirect;
            setColumnA(redirect.from);
            setColumnB(redirect.to);
        } else if ("key" in data) {
            const environment = data as Environment;
            setColumnA(environment.key);
            setColumnB(environment.value);
        }
    }, []);

    useEffect(() => {
        if ("from" in data) {
            const redirect = data as Redirect;
            handleUpdateData({
                ...redirect,
                from: columnA!,
                to: columnB!,
            });
        } else if ("key" in data) {
            const environment = data as Environment;
            handleUpdateData({
                ...environment,
                key: columnA!,
                value: columnB!,
            });
        }
    }, [columnA, columnB]);

    return (
        <tr>
            <td className="text-md border-white-600 w-auto border px-4 py-1 font-medium tracking-wider text-white">
                <input
                    id="columnA"
                    type="text"
                    className="w-full border-b-2 border-white bg-transparent outline-none"
                    placeholder={placeholderText.columnA}
                    value={columnA}
                    onChange={(e) => {
                        setColumnA(e.target.value);
                    }}
                />
            </td>
            <td className="text-md border-white-600  w-auto border px-4 py-1 font-medium tracking-wider text-white">
                <input
                    id="columnB"
                    type="text"
                    className="w-full border-b-2 border-white bg-transparent outline-none"
                    placeholder={placeholderText.columnB}
                    value={columnB}
                    onChange={(e) => {
                        setColumnB(e.target.value);
                    }}
                />
            </td>
            <td className="text-md px-4 py-1 text-center font-medium tracking-wider text-white">
                <button
                    className="focus:shadow-outline rounded bg-transparent py-2 px-4 font-bold text-red-700 hover:text-red-400 focus:outline-none "
                    onClick={() => {
                        handleDeleteData(data);
                    }}
                >
                    <TrashIcon className="h-7 w-7" />
                </button>
            </td>
        </tr>
    );
}

export default SettingsTableRow;
