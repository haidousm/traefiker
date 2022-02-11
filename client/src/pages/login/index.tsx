import { NextPage } from "next";
import Head from "next/head";
import LoginContainer from "../../components/login/LoginContainer";
import Navbar from "../../components/navbar/Navbar";

const Login: NextPage = () => {
    return (
        <div className="min-h-screen">
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
                <div className="flex h-full w-full items-center justify-center p-10">
                    <div className="mt-40 w-96 rounded-md bg-gray-800 shadow-2xl shadow-stone-800">
                        <LoginContainer />
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Login;
