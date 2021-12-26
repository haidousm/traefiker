import { Service } from "../../lib/docker";

function DashboardTableRow(props: { service: Service }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                    className="
                px-4
                py-2
                inline-flex
                text-sm
                leading-5
                font-semibold
                rounded-md
                bg-blue-100
                text-blue-800
            "
                >
                    {props.service.name}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                    className="
                px-4
                py-2
                inline-flex
                text-sm
                leading-5
                font-semibold
                rounded-md
                bg-sky-100
                text-sky-800
            "
                >
                    {props.service.image}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                {props.service.hosts.map((host, index) => (
                    <a href={`https://${host}`} key={index}>
                        <span
                            className="
                                    px-4
                                    py-2
                                    inline-flex
                                    text-sm
                                    leading-5
                                    font-semibold
                                    rounded-md
                                    bg-amber-100
                                    text-amber-800
                                    m-1
                            "
                        >
                            {host}
                        </span>
                    </a>
                ))}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-red-600 hover:text-red-900">
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default DashboardTableRow;
