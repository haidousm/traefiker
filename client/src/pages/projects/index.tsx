import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar/Navbar";
import ProjectCard from "../../components/projects/ProjectCard";
import { useEffect, useState } from "react";
import { getProjects } from "../../utils/api";
import { Project } from "../../types/Project";
import { useRouter } from "next/router";

const Projects: NextPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const response = await getProjects();
            if (response.status == 200) {
                setProjects(response.data);
            } else {
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
                <link rel="icon" href="traefik-logo.png" />
            </Head>
            <nav>
                <Navbar />
            </nav>
            <main>
                <div>
                    <header className="flex items-center justify-between bg-white shadow">
                        <div className="mx-12 flex py-6 px-4 sm:px-6 lg:px-8 ">
                            <h1 className="m-0 text-3xl font-bold text-gray-900">
                                Projects
                            </h1>
                        </div>
                    </header>
                </div>
                <div className="m-4 grid grid-cols-3 place-items-center">
                    {projects &&
                        projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            );
                        })}
                </div>
            </main>
        </div>
    );
};

export default Projects;
