import { ServiceStatus } from "../../types/enums/ServiceStatus";
import { Project } from "../../types/Project";
import StatusIndicatorBox from "./StatusIndicatorBox";

interface Props {
    project: Project;
    serviceStatuses: ServiceStatus[];
}

function ProjectCard({ project, serviceStatuses }: Props) {
    return (
        <div
            className="h-40 w-80 cursor-pointer rounded-lg bg-blue-100 shadow-lg"
            onClick={() => [
                (window.location.href = `/projects/${project.name}`),
            ]}
        >
            <div className="flex h-full flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-blue-800">
                        {project.name}
                    </h1>
                </div>

                <div className="flex">
                    {serviceStatuses.map((serviceStatus, i) => {
                        return (
                            <StatusIndicatorBox
                                key={i}
                                serviceStatus={serviceStatus}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
