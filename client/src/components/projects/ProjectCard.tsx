import { PencilIcon } from "@heroicons/react/solid";
import TrashIcon from "@heroicons/react/solid/TrashIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ServiceStatus } from "../../types/enums/ServiceStatus";
import { Project } from "../../types/Project";
import { Service } from "../../types/Service";
import { getServicesForProject } from "../../utils/api";
import StatusNotificationService from "../notifications/StatusNotificationService";
import ProjectStatusIndicatorRectangle from "./status-indicators/StatusIndicatorBox";

interface Props {
    project: Project;
    updateProjectNameClicked: (project: Project, newName: string) => void;
    deleteProjectClicked: (project: Project) => void;
}

function ProjectCard({
    project,
    updateProjectNameClicked,
    deleteProjectClicked,
}: Props) {
    const [services, setServices] = useState<Service[]>([]);
    const [projectName, setProjectName] = useState<string>(project.name);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const response = await getServicesForProject(project);
            if (response.status == 200) {
                setServices(response.data.sort((a, b) => a.order - b.order));
            } else {
                router.push("500");
            }
        })();
    }, [project, router]);

    return (
        <div
            className="flex h-40 w-80 cursor-pointer flex-col justify-between rounded-lg bg-blue-100 shadow-lg"
            onClick={() => [router.push(`/projects/${project.name}`)]}
        >
            <div
                className="flex-rowitems-center flex p-3"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    className="border-b-2 border-b-gray-800 bg-transparent px-3 text-lg font-bold text-blue-800 focus:outline-none"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    disabled={projectName === "default"}
                />
                <div className="flex w-full justify-end">
                    <PencilIcon
                        className=" h-5 w-5 cursor-pointer text-green-600"
                        onClick={() => {
                            updateProjectNameClicked(project, projectName);
                        }}
                        visibility={
                            projectName === "default" ? "hidden" : "visible"
                        }
                    />
                    <TrashIcon
                        className="mx-1 h-5 w-5 cursor-pointer text-red-600"
                        onClick={() => {
                            deleteProjectClicked(project);
                        }}
                        visibility={
                            projectName === "default" ? "hidden" : "visible"
                        }
                    />
                </div>
            </div>
            <div className="flex w-full items-center justify-center">
                {services.map((service, i) => {
                    return (
                        <ProjectStatusIndicatorRectangle
                            key={i}
                            serviceStatus={service.status}
                        />
                    );
                })}
            </div>
            <StatusNotificationService setServices={setServices} />
        </div>
    );
}

export default ProjectCard;
