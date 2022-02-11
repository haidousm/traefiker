import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardTable from "../../components/dashboard/table/DashboardTable";
import Navbar from "../../components/navbar/Navbar";
import { resetServerContext } from "react-beautiful-dnd";
import ServiceSettingsModal from "../../components/service-settings/ServiceSettingsModal";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../atoms/atoms";
import StatusNotificationService from "../../components/notifications/StatusNotificationService";

const Dashboard: NextPage = () => {
    const [settingsModalOptions, setSettingsModalOptions] =
        useRecoilState(settingsModalState);
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
                <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div
                                className="
                        inline-block
                        min-w-full
                        py-2
                        align-middle
                        sm:px-6
                        lg:px-8
                    "
                            >
                                <div
                                    className="
                            overflow-hidden
                            rounded-lg
                            border-b border-gray-200
                            shadow
                        "
                                >
                                    <DashboardTable />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {settingsModalOptions.isEditingSettings ? (
                    <ServiceSettingsModal />
                ) : null}
            </main>
            <StatusNotificationService />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    resetServerContext();

    return { props: {} };
};
export default Dashboard;
