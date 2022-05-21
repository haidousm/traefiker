import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ServiceStatus } from "../../types/enums/ServiceStatus";
import { Project } from "../../types/Project";
import { Service } from "../../types/Service";
import { getServicesForProject } from "../../utils/api";
import StatusNotificationService from "../notifications/StatusNotificationService";
import StatusIndicatorBox from "./StatusIndicatorBox";

interface Props {
    project: Project;
}

function ProjectCard({ project }: Props) {
    const [services, setServices] = useState<Service[]>([]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const response = await getServicesForProject(project);
            if (response.status == 200) {
                setServices(response.data);
            } else {
                router.push("500");
            }
        })();
    }, [project, router]);
    return (
        <div
            className="h-40 w-80 cursor-pointer rounded-lg bg-blue-100 shadow-lg"
            onClick={() => [router.push(`/projects/${project.name}`)]}
        >
            <div className="flex h-full flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-blue-800">
                        {project.name}
                    </h1>
                </div>

                <div className="flex">
                    {services.map((service, i) => {
                        return (
                            <StatusIndicatorBox
                                key={i}
                                serviceStatus={service.status}
                            />
                        );
                    })}
                </div>
            </div>
            <StatusNotificationService setServices={setServices} />
        </div>
    );
}

export default ProjectCard;
