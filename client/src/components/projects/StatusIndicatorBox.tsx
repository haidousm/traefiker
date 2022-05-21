import { ServiceStatus } from "../../types/enums/ServiceStatus";

interface Props {
    serviceStatus: ServiceStatus;
}

function StatusIndicatorBox({ serviceStatus }: Props) {
    const getStatusIndicatorColor = (serviceStatus: ServiceStatus) => {
        switch (+serviceStatus) {
            case ServiceStatus.RUNNING:
                return "bg-green-500";
            case ServiceStatus.STOPPED:
            case ServiceStatus.CREATED:
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };
    return (
        <div
            className={`h-3 w-3 ${getStatusIndicatorColor(serviceStatus)}`}
        ></div>
    );
}

export default StatusIndicatorBox;
