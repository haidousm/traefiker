import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/DashboardTable";
import Navbar from "../../components/Navbar";

const Dashboard: NextPage = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);
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
                <DashboardTable services={services} />
            </main>
        </div>
    );
};

export default Dashboard;
