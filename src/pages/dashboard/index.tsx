import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/DashboardTable";
import LoadingComponent from "../../components/loading/LoadingPopup";
import Navbar from "../../components/navbar/Navbar";
import { Service } from "../../types/Service";
import { resetServerContext } from "react-beautiful-dnd";

const reorder = (list: Service[], startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) {
        return list;
    }
    const result = Array.from(list);
    const current = result[startIndex];
    const next = result[endIndex];
    next.order = startIndex;
    current.order = endIndex;

    return result.sort((a, b) => a.order - b.order);
};

const Dashboard: NextPage = () => {
    const [services, setServices] = useState<Service[]>([
        {
            name: "",
            image: "",
            hosts: [],
            order: 0,
        },
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState<Service>();

    const [isLoading, setIsLoading] = useState(false);

    const loadingMessages = [
        "Creating Service..",
        "Saving Docker Compose File..",
        "Launching Docker Compose..",
        "Doing some magic..",
        "Doing some more magic..",
    ];

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => {
                const sortedServices = data.sort(
                    (a: Service, b: Service) => a.order - b.order
                );
                setServices(sortedServices);
            });
    }, []);

    const handleNewServiceClicked = () => {
        setIsEditing(true);
    };

    const handleSaveClicked = (service: Service) => {
        setIsEditing(false);
        setIsLoading(true);
        fetch("/api/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(service),
        }).then((res) => {
            if (res.status === 200) {
                setServices((prevServices) =>
                    prevServices.filter((s) => s.name !== service.name)
                );
                setServices((prevServices) => [...prevServices, service]);
                setIsLoading(false);
            }
        });
    };

    const handleCancelClicked = () => {
        setIsEditing(false);
    };

    const handleEditClicked = (service: Service) => {
        setEditedService(service);
        setIsEditing(true);
    };

    const handleDeleteClicked = (service: Service) => {
        setIsLoading(true);
        fetch(`/api/services/${service.name}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                setServices((prevServices) =>
                    prevServices.filter((s) => s.name !== service.name)
                );
                setIsLoading(false);
            }
        });
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const reorderedServices = reorder(
            services,
            result.source.index,
            result.destination.index
        );
        setServices(reorderedServices);
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
                    services={services}
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
