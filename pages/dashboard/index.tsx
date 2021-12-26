import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/DashboardTable";
import Navbar from "../../components/Navbar";
import { Service } from "../../lib/docker";

const Dashboard: NextPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);

    const handleNewServiceClicked = () => {
        setIsEditing(true);
    };

    const handleSaveClicked = (service: Service) => {
        console.log("handle save clicked");
        setIsEditing(false);
    };

    const handleCancelClicked = () => {
        setIsEditing(false);
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
                />
            </main>
        </div>
    );
};

export default Dashboard;
