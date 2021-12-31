import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/DashboardTable";
import Navbar from "../../components/navbar/Navbar";
import { Service } from "../../types/Service";
import { resetServerContext } from "react-beautiful-dnd";
import useServices from "../../hooks/useServices";
import axios from "axios";
import { LoadingOptions } from "../../types/LoadingOptions";
import LoadingComponent from "../../components/loading/LoadingPopup";

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
    const { services, isLoading, mutate } = useServices();

    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState<Service>();

    const [autoReload, setAutoReload] = useState(false);

    const [loadingOptions, setLoadingOptions] = useState<LoadingOptions>({
        fetchingServices: false,
        creatingService: false,
        deletingService: false,
        updatingService: false,
    });

    const loadingMessages = [
        "Updating Docker Compose File..",
        "Launching Docker Compose..",
        "Doing some magic..",
        "Doing some more magic..",
    ];

    useEffect(() => {
        updateServiceOrdering(services);
    }, [services]);

    useEffect(() => {
        setLoadingOptions((prev) => ({
            ...prev,
            fetchingServices: isLoading,
        }));
    }, [isLoading]);

    const handleNewServiceClicked = () => {
        setIsEditing(true);
    };

    const handleSaveClicked = async (service: Service) => {
        setIsEditing(false);

        const index = services.findIndex((s) => s.name === service.name);
        if (index !== -1) {
            services[index] = service;
            await mutate(services, false);
            setLoadingOptions((prev) => ({ ...prev, updatingService: true }));
        } else {
            setLoadingOptions((prev) => ({ ...prev, creatingService: true }));
            service.order = services.length;
        }

        await createService(service);
        await mutate();
        setLoadingOptions((prev) => ({
            ...prev,
            creatingService: false,
            updatingService: false,
        }));
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
        setLoadingOptions((prev) => ({ ...prev, deletingService: true }));
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
            setLoadingOptions((prev) => ({ ...prev, deletingService: false }));
        }
    };

    const handleRunComposeClicked = async () => {
        setLoadingOptions((prev) => ({ ...prev, updatingService: true }));
        await axios.get("/api/services/run");
        setLoadingOptions((prev) => ({ ...prev, updatingService: false }));
    };

    const handleAutoReloadClicked = (reload: boolean) => {
        setAutoReload(reload);
        console.log(reload);
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
                    handleAutoReloadClicked={handleAutoReloadClicked}
                    handleNewServiceClicked={handleNewServiceClicked}
                    handleRunComposeClicked={handleRunComposeClicked}
                />
                <DashboardTable
                    loadingOptions={loadingOptions}
                    handleSaveClicked={handleSaveClicked}
                    handleCancelClicked={handleCancelClicked}
                    isEditing={isEditing}
                    editedService={editedService}
                    handleEditClicked={handleEditClicked}
                    handleDeleteClicked={handleDeleteClicked}
                    onDragEnd={onDragEnd}
                />
            </main>
            {loadingOptions.deletingService ||
            loadingOptions.updatingService ? (
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
