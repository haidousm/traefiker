import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import DashboardTable from "../../../components/dashboard/table/DashboardTable";
import Navbar from "../../../components/navbar/Navbar";
import StatusNotificationService from "../../../components/notifications/StatusNotificationService";
import ServiceSettingsModal from "../../../components/service-settings/ServiceSettingsModal";
import { Project } from "../../../types/Project";
import { Service } from "../../../types/Service";
import { getServicesForProject, getProjectByName } from "../../../utils/api";

const ProjectDashboard: NextPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [project, setProject] = useState<Project>();
    const [serviceToConfigure, setServiceToConfigure] = useState<Service>();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const projectName: string = router.query.projectName as string;
            try {
                const response = await getProjectByName(projectName);
                if (response.status == 200) {
                    setProject(response.data);
                    const anotherResponse = await getServicesForProject(
                        response.data
                    );
                    if (anotherResponse.status == 200) {
                        setServices(
                            anotherResponse.data.sort(
                                (a, b) => a.order - b.order
                            )
                        );
                    } else {
                        router.push("/500");
                    }
                } else {
                    router.push("/500");
                }
            } catch (e) {
                router.push("/500");
            }
        })();
    }, [router]);

    return (
        <div>
            <Head>
                <title>Traefiker</title>
                <meta
                    name="description"
                    content="Traefiker is a tool for managing Docker containers running on Traefik"
                />
                <link rel="icon" href="/traefik-logo.png" />
            </Head>
            <nav>
                <Navbar />
            </nav>
            <main>
                <DashboardHeader />
                <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div
                                className="
                        inline-block
                        min-w-full
                        py-2
                        align-middle
                        sm:px-6
                        lg:px-8
                    "
                            >
                                <div
                                    className="
                            overflow-hidden
                            rounded-lg
                            border-b border-gray-200
                            shadow
                        "
                                >
                                    {project && (
                                        <DashboardTable
                                            project={project}
                                            services={services}
                                            setServices={setServices}
                                            setServiceToConfigure={
                                                setServiceToConfigure
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {serviceToConfigure && (
                    <ServiceSettingsModal
                        service={serviceToConfigure}
                        setServiceToConfigure={setServiceToConfigure}
                    />
                )}
            </main>
            <StatusNotificationService setServices={setServices} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    resetServerContext();

    return { props: {} };
};
export default ProjectDashboard;
