import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar/Navbar";
import ProjectCard from "../../components/projects/ProjectCard";
import { useEffect, useState } from "react";
import {
    createProject,
    deleteProjectByName,
    getProjects,
    updateProjectName,
} from "../../utils/api";
import { Project } from "../../types/Project";
import { useRouter } from "next/router";
import axios from "axios";

const Projects: NextPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();
    useEffect(() => {
        getAllProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllProjects = () => {
        (async () => {
            const response = await getProjects();
            if (response.status == 200) {
                setProjects(response.data);
            } else {
                router.push("/500");
            }
        })();
    };

    const createNewProjectClicked = async () => {
        const randomName = (
            await axios.get("https://random-word-api.herokuapp.com/word")
        ).data[0];
        const response = await createProject(randomName);
        const project = response.data;
        setProjects([...projects, project]);
    };

    const deleteProjectClicked = async (project: Project) => {
        await deleteProjectByName(project.name);
        getAllProjects();
    };

    const updateProjectNameClicked = async (project: Project, name: string) => {
        await updateProjectName(project.name, name);
        getAllProjects();
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
                <div>
                    <header className="flex items-center justify-between bg-white shadow">
                        <div className="mx-12 flex py-6 px-4 sm:px-6 lg:px-8 ">
                            <h1 className="m-0 text-3xl font-bold text-gray-900">
                                Projects
                            </h1>
                            <button
                                type="button"
                                className="
                            focus:shadow-outline
                            ml-4
                            hidden
                            overflow-hidden
                            rounded
                            bg-blue-100
                            px-5
                            py-2 text-sm
                            text-blue-800
                            transition
                            duration-200
                            ease-out
                            hover:bg-blue-500
                            hover:text-white focus:outline-none
                            lg:block
                            lg:text-base
                            "
                                onClick={() => {
                                    createNewProjectClicked();
                                }}
                            >
                                Create New Project
                            </button>
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
                                    deleteProjectClicked={deleteProjectClicked}
                                    updateProjectNameClicked={
                                        updateProjectNameClicked
                                    }
                                />
                            );
                        })}
                </div>
            </main>
        </div>
    );
};

export default Projects;
