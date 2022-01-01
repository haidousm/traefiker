import React, { useEffect, useState } from "react";
import { Service } from "../../types/Service";
import ReactTooltip from "react-tooltip";

function DashboardTableRowEditable(props: {
    service?: Service;
    handleSaveClicked: (service: Service) => void;
    handleCancelClicked: () => void;
}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [hosts, setHosts] = useState<string[]>([]);
    const [possibleHost, setPossibleHost] = useState("");

    useEffect(() => {
        if (props.service) {
            setName(props.service.name);
            setImage(props.service.image);
            setHosts(props.service.hosts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <input
                        id="name"
                        type="text"
                        className="w-full bg-transparent outline-none text-center"
                        placeholder="Service name.."
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center ">
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
                    <input
                        id="image"
                        type="text"
                        className="w-full bg-transparent outline-none text-center"
                        placeholder="Image name.."
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                    />
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center grid grid-cols-3 gap-3">
                {hosts.map((host, index) => {
                    return (
                        <span
                            data-tip="CLICK TO REMOVE"
                            key={index}
                            className="
                                    px-2
                                    py-2
                                    text-xs
                                    leading-5
                                    font-semibold
                                    rounded-md
                                    bg-amber-100
                                    text-amber-800
                                    cursor-pointer
                                    relative
                                    hover:bg-amber-800
                                    hover:text-amber-100
                            "
                            onClick={() => {
                                setHosts(hosts.filter((_, i) => i !== index));
                            }}
                        >
                            {host}
                            <ReactTooltip />
                        </span>
                    );
                })}
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
                            col-start-2
                    "
                >
                    <input
                        id="host"
                        type="text"
                        className="w-full bg-transparent outline-none text-center"
                        placeholder="Host name.."
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setHosts([...hosts, possibleHost]);
                                setPossibleHost("");
                            }
                        }}
                        value={possibleHost}
                        onChange={(e) => {
                            setPossibleHost(e.target.value);
                        }}
                    />
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {
                        props.handleCancelClicked();
                    }}
                >
                    Cancel
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                        props.handleSaveClicked({
                            name: name,
                            image: image,
                            hosts:
                                possibleHost !== ""
                                    ? [...hosts, possibleHost]
                                    : hosts,
                            order: props.service ? props.service.order : 0,
                            urlRedirects: props.service?.urlRedirects ?? [],
                        });
                    }}
                >
                    Save
                </button>
            </td>
        </tr>
    );
}

export default DashboardTableRowEditable;
