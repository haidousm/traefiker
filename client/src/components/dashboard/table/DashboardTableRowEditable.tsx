import React, { useEffect, useState } from "react";
import { Service } from "../../../types/Service";
import { Image } from "../../../types/Image";
import ReactTooltip from "react-tooltip";
import { ServiceStatus } from "../../../types/enums/ServiceStatus";

interface Props {
    service?: Service;
    saveClicked: (service: Service) => void;
    cancelClicked: () => void;
}

function DashboardTableRowEditable({
    service,
    saveClicked,
    cancelClicked,
}: Props) {
    const [tag, setTag] = useState("");
    const [image, setImage] = useState<Image | undefined>();
    const [hosts, setHosts] = useState<string[]>([]);
    const [possibleHost, setPossibleHost] = useState("");

    useEffect(() => {
        if (service) {
            setTag(service.name);
            setImage(service.image);
            setHosts(service.hosts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <tr>
            <td className="whitespace-nowrap px-6 py-4 text-center">
                <span
                    className="
        inline-flex
        rounded-md
        bg-blue-100
        px-4
        py-2
        text-sm
        font-semibold
        leading-5
        text-blue-800
    "
                >
                    <input
                        id="name"
                        type="text"
                        className="w-full bg-transparent text-center outline-none "
                        placeholder="Service tag.."
                        value={tag}
                        onChange={(e) => {
                            setTag(e.target.value);
                        }}
                    />
                </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center ">
                <span
                    className="
        inline-flex
        rounded-md
        bg-sky-100
        px-4
        py-2
        text-sm
        font-semibold
        leading-5
        text-sky-800
    "
                >
                    <input
                        id="image"
                        type="text"
                        className="w-full bg-transparent text-center outline-none"
                        placeholder="Image name.."
                        value={
                            image
                                ? image.repository != "_"
                                    ? `${image.repository}/${image.name}:${image.tag}`
                                    : `${image.name}:${image.tag}`
                                : ""
                        }
                        onChange={(e) => {
                            setImage({
                                ...image,
                                repository: e.target.value.split("/")[0] ?? "_",
                                name: e.target.value
                                    .split("/")[1]
                                    .split(":")[0],
                                tag: e.target.value.split(":")[1],
                            });
                        }}
                    />
                </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center">
                {hosts.map((host, index) => {
                    return (
                        <span
                            data-tip="CLICK TO REMOVE"
                            key={index}
                            className="
                            relative
                                    m-1
                                    block
                                    cursor-pointer
                                    rounded-md
                                    bg-amber-100
                                    px-2
                                    py-2
                                    text-xs
                                    font-semibold
                                    leading-5
                                    text-amber-800
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
                    col-start-2
                            m-1
                            block
                            rounded-md
                            bg-amber-100
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            leading-5
                            text-amber-800
                    "
                >
                    <input
                        id="host"
                        type="text"
                        className="w-full bg-transparent text-center outline-none"
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
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {
                        cancelClicked();
                    }}
                >
                    Cancel
                </button>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                        saveClicked({
                            name: service?.name ?? tag,
                            image: image!,
                            hosts:
                                possibleHost !== ""
                                    ? [...hosts, possibleHost]
                                    : hosts,
                            order: service ? service.order : 0,
                            redirects: service?.redirects ?? [],
                            environmentVariables:
                                service?.environmentVariables ?? [],
                            status: service?.status ?? ServiceStatus.PULLING,
                        });
                    }}
                >
                    Save
                </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default DashboardTableRowEditable;
