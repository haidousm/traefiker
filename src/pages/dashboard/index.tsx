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
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reordered = result.map((item, index) => {
        return { ...item, order: index };
    });

    return reordered;
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

    useEffect(() => {
        async function updateOrders() {
            await fetch("/api/services/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ services }),
            });
        }
        updateOrders();
    }, [services]);

    const handleNewServiceClicked = () => {
        setIsEditing(true);
    };

    const handleSaveClicked = async (service: Service) => {
        setIsEditing(false);
        setIsLoading(true);

        const index = services.findIndex((s) => s.name === service.name);
        if (index !== -1) {
            setServices((prevServices) => {
                const updatedServices = [...prevServices];
                updatedServices[index] = service;
                return updatedServices;
            });
        } else {
            service.order = services.length;
        }
        const newService = await (
            await fetch("/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(service),
            })
        ).json();

        if (index === -1) {
            setServices((prevServices) => [...prevServices, newService]);
        }
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
        const res = await fetch(`/api/services/${service.name}`, {
            method: "DELETE",
        });
        if (res.status === 200) {
            setServices((prevServices) => {
                const updatedServices = prevServices
                    .map((s) => {
                        if (s.order > service.order) {
                            s.order--;
                        }
                        console.log(s);
                        return s;
                    })
                    .filter((s) => s.name !== service.name);
                return updatedServices;
            });
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
