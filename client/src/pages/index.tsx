import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

const Home: NextPage = () => {
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
        </div>
    );
};

export default Home;
