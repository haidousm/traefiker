import { PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import Environment from "../../../types/Environment";
import { Redirect } from "../../../types/Redirect";
import EnvironmentsTableRow from "./EnvironmentsTableRow";

function EnvironmentsTable(props: {
    environments: Environment[];
    handleUpdateEnvironment: (environment: Environment) => void;
    handleAddNewEnvironment: () => void;
    handleDeleteEnvironment: (environment: Environment) => void;
}) {
    const columns = [
        { name: "Key", screenReaderOnly: false },
        { name: "Value", screenReaderOnly: false },
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
                                props.handleAddNewEnvironment();
                            }}
                        >
                            <PlusCircleIcon className="h-7 w-7" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.environments !== undefined &&
                props.environments.length !== 0 ? (
                    props.environments!.map((environment: Environment, i) => (
                        <EnvironmentsTableRow
                            key={i}
                            environment={environment}
                            handleUpdateEnvironment={
                                props.handleUpdateEnvironment
                            }
                            handleDeleteEnvironment={
                                props.handleDeleteEnvironment
                            }
                        />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-md border-white-600 border px-4 py-1 text-center font-medium tracking-wider text-white"
                        >
                            No Env. Vars found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default EnvironmentsTable;
