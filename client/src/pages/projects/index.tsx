import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar/Navbar";
import ProjectCard from "../../components/projects/ProjectCard";
import { useRecoilValue, useRecoilState } from "recoil";
import { servicesState } from "../../atoms/atoms";
import { useEffect, useState } from "react";
import { getProjects, getServices } from "../../utils/api";
import { Project } from "../../types/Project";
import { Service } from "../../types/Service";
import StatusNotificationService from "../../components/notifications/StatusNotificationService";

const Projects: NextPage = () => {
    const [services, setServices] = useRecoilState<Service[]>(servicesState);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const services = await getServices();
            setServices(services);
        })();
    }, [setServices]);

    const getServiceStatusForProject = (project: Project) => {
        return services
            .filter((service: Service) => service.project?.id === project.id)
            .map((service: Service) => service.status);
    };
    return (
        <div>
            <Head>
                <title>Traefiker</title>
                <meta
                    name="description"
                    content="Traefiker is a tool for managing Docker containers running on Traefik"
                />
                <link rel="icon" href="traefik-logo.png" />
            </Head>
            <nav>
                <Navbar />
            </nav>
            <main>
                <div className="m-4 grid grid-cols-3 place-items-center">
                    {projects.map((project) => {
                        return (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                serviceStatuses={getServiceStatusForProject(
                                    project
                                )}
                            />
                        );
                    })}
                </div>
            </main>
            <StatusNotificationService />
        </div>
    );
};

export default Projects;
