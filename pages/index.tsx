import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Traefik</title>
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
