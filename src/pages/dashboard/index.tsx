import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/DashboardTable";
import LoadingComponent from "../../components/loading/LoadingPopup";
import Navbar from "../../components/navbar/Navbar";
import { Service } from "../../types/Service";
import { resetServerContext } from "react-beautiful-dnd";
import useServices from "../../hooks/useServices";
import axios from "axios";

const reorder = (list: Service[], startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) {
        return list;
    }
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reordered = result.map((item, index) => {
        return { ...item, order: index };
    });

    return reordered;
};

const createService = async (service: Service) => {
    return await axios.post("/api/services", { service });
};

const updateServiceOrdering = async (services: Service[]) => {
    return await axios.put("/api/services/ordering", { services });
};

const deleteService = async (service: Service) => {
    return await axios.delete(`/api/services/${service.name}`);
};

const Dashboard: NextPage = () => {
    const { services, mutate } = useServices();

    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState<Service>();

    const [isLoading, setIsLoading] = useState(false);

    const loadingMessages = [
        "Saving Docker Compose File..",
        "Launching Docker Compose..",
        "Doing some magic..",
        "Doing some more magic..",
    ];

    useEffect(() => {
        updateServiceOrdering(services);
    }, [services]);

    const handleNewServiceClicked = () => {
        setIsEditing(true);
    };

    const handleSaveClicked = async (service: Service) => {
        setIsEditing(false);
        setIsLoading(true);

        const index = services.findIndex((s) => s.name === service.name);
        if (index !== -1) {
            services[index] = service;
            await mutate(services, false);
        } else {
            service.order = services.length;
        }

        await createService(service);
        await mutate();
        setIsLoading(false);
        setEditedService(undefined);
    };

    const handleCancelClicked = () => {
        setIsEditing(false);
        setEditedService(undefined);
    };

    const handleEditClicked = (service: Service) => {
        setIsEditing(true);
        setEditedService(service);
    };

    const handleDeleteClicked = async (service: Service) => {
        setIsLoading(true);
        const res = await deleteService(service);
        if (res.status === 200) {
            const updatedServices = services
                .map((s) => {
                    if (s.order > service.order) {
                        s.order--;
                    }
                    return s;
                })
                .filter((s) => s.name !== service.name);
            await mutate(updatedServices, false);
            setIsLoading(false);
        }
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }
        const reorderedServices = reorder(
            services,
            result.source.index,
            result.destination.index
        );
        await mutate(reorderedServices, false);
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
                <DashboardHeader
                    handleNewServiceClicked={handleNewServiceClicked}
                />
                <DashboardTable
                    handleSaveClicked={handleSaveClicked}
                    handleCancelClicked={handleCancelClicked}
                    isEditing={isEditing}
                    editedService={editedService}
                    handleEditClicked={handleEditClicked}
                    handleDeleteClicked={handleDeleteClicked}
                    onDragEnd={onDragEnd}
                />
            </main>
            {isLoading ? (
                <LoadingComponent loadingMessages={loadingMessages} />
            ) : null}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    resetServerContext();

    return { props: {} };
};
export default Dashboard;
