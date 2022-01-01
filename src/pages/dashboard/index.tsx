import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/table/DashboardTable";
import Navbar from "../../components/navbar/Navbar";
import { Service } from "../../types/Service";
import { resetServerContext } from "react-beautiful-dnd";
import useServices from "../../hooks/useServices";
import axios from "axios";
import { LoadingOptions } from "../../types/LoadingOptions";
import LoadingComponent from "../../components/loading/LoadingModal";
import YAMLEditorModal from "../../components/code-editor/YAMLEditorModal";
import ServiceSettingsModal from "../../components/service-settings/ServiceSettingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    autoReloadState,
    isEditingFileState,
    servicesState,
} from "../../atoms/atoms";

export const getServices = async () => {
    return await (
        await axios.get("/api/services")
    ).data;
};

const createService = async (service: Service, autoReload: boolean) => {
    return await axios.post(`/api/services?autoreload=${autoReload}`, {
        service,
    });
};

const updateServiceOrdering = async (services: Service[]) => {
    return await axios.put("/api/services/ordering", { services });
};

const deleteService = async (service: Service, autoReload: boolean) => {
    return await axios.delete(
        `/api/services/${service.name}?autoreload=${autoReload}`
    );
};

const Dashboard: NextPage = () => {
    const [services, setServices] = useRecoilState(servicesState);

    const [isEditing, setIsEditing] = useState(false);
    const [isModifiyingSettings, setIsModifiyingSettings] = useState(false);

    const [editedService, setEditedService] = useState<Service>();

    const [loadingOptions, setLoadingOptions] = useState<LoadingOptions>({
        fetchingServices: false,
        creatingService: false,
        deletingService: false,
        updatingService: false,
    });

    const autoReload = useRecoilValue(autoReloadState);
    const isEditingFile = useRecoilValue(isEditingFileState);

    const loadingMessages = [
        "Updating Docker Compose File..",
        "Launching Docker Compose..",
        "Doing some magic..",
        "Doing some more magic..",
    ];

    useEffect(() => {
        updateServiceOrdering(services);
    }, [services]);

    const handleSaveClicked = async (service: Service) => {
        setIsEditing(false);

        const index = services.findIndex((s) => s.name === service.name);
        if (index !== -1) {
            services[index] = service;
            setServices(services);
            setLoadingOptions((prev) => ({
                ...prev,
                updatingService: true && autoReload,
            }));
        } else {
            setLoadingOptions((prev) => ({
                ...prev,
                creatingService: true && autoReload,
            }));
            service.order = services.length;
        }

        await createService(service, autoReload);
        await getServices();
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
        setLoadingOptions((prev) => ({
            ...prev,
            deletingService: true && autoReload,
        }));
        const res = await deleteService(service, autoReload);
        if (res.status === 200) {
            const updatedServices = services
                .map((s) => {
                    if (s.order > service.order) {
                        s.order--;
                    }
                    return s;
                })
                .filter((s) => s.name !== service.name);
            setServices(updatedServices);
            setLoadingOptions((prev) => ({ ...prev, deletingService: false }));
        }
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
                <DashboardHeader />
                <DashboardTable
                    loadingOptions={loadingOptions}
                    handleSaveClicked={handleSaveClicked}
                    handleCancelClicked={handleCancelClicked}
                    isEditing={isEditing}
                    editedService={editedService}
                    handleEditClicked={handleEditClicked}
                    handleDeleteClicked={handleDeleteClicked}
                />
            </main>
            {loadingOptions.deletingService ||
            loadingOptions.updatingService ? (
                <LoadingComponent loadingMessages={loadingMessages} />
            ) : null}

            {isEditingFile ? <YAMLEditorModal /> : null}

            <ServiceSettingsModal
                isModifiyingSettings={isModifiyingSettings}
                service={editedService!}
                handleSaveClicked={handleSaveClicked}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    resetServerContext();

    return { props: {} };
};
export default Dashboard;
