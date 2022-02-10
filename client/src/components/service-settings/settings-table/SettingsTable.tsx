import { PlusCircleIcon } from "@heroicons/react/solid";
import Environment from "../../../types/Environment";
import { Redirect } from "../../../types/Redirect";
import SettingsTableRow from "./SettingsTableRow";

interface Props {
    data: Redirect[] | Environment[];
    columns: {
        name: string;
    }[];

    placeholderText: {
        columnA: string;
        columnB: string;
        notFound: string;
    };
    handleUpdateData: (data: Redirect | Environment) => void;
    handleAddNewData: () => void;
    handleDeleteData: (data: Redirect | Environment) => void;
}
function SettingsTable({
    data,
    columns,
    placeholderText,
    handleUpdateData,
    handleAddNewData,
    handleDeleteData,
}: Props) {
    return (
        <table className="m-5 min-w-full border-separate">
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

                    <th scope="col" className="w-4">
                        <button
                            className="focus:shadow-outline rounded py-2 px-4 font-bold text-green-500 hover:text-green-200 focus:outline-none"
                            onClick={() => {
                                handleAddNewData();
                            }}
                        >
                            <PlusCircleIcon className="h-7 w-7" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data !== undefined && data.length !== 0 ? (
                    data!.map((data: Redirect | Environment, i) => (
                        <SettingsTableRow
                            key={i}
                            data={data}
                            placeholderText={placeholderText}
                            handleUpdateData={handleUpdateData}
                            handleDeleteData={handleDeleteData}
                        />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-md border-white-600 border px-4 py-1 text-center font-medium tracking-wider text-white"
                        >
                            {placeholderText.notFound}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default SettingsTable;
