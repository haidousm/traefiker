import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../../atoms/atoms";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import DashboardTable from "../../../components/dashboard/table/DashboardTable";
import Navbar from "../../../components/navbar/Navbar";
import StatusNotificationService from "../../../components/notifications/StatusNotificationService";
import ServiceSettingsModal from "../../../components/service-settings/ServiceSettingsModal";

const ProjectDashboard: NextPage = () => {
    const [settingsModalOptions, setSettingsModalOptions] =
        useRecoilState(settingsModalState);
    const router = useRouter();
    const projectName: string = router.query.projectName as string;

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
                                    <DashboardTable projectName={projectName} />
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
export default ProjectDashboard;
