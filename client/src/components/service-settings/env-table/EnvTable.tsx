/* eslint-disable react-hooks/exhaustive-deps */
import { env } from "process";
import React, { useEffect, useState } from "react";
import Environment from "../../../types/Environment";
import { Redirect } from "../../../types/Redirect";
import SettingsTable from "../settings-table/SettingsTable";

interface Props {
    environments: Environment[];
    handleUpdateData: (data: Environment[]) => void;
}

function EnvTable({ environments, handleUpdateData }: Props) {
    const [envs, setEnvs] = useState<Environment[]>([]);

    const columns = [{ name: "Key" }, { name: "Value" }];

    const placeholderText = {
        columnA: "Key",
        columnB: "Value",
        notFound: "No Env. Vars found",
    };

    useEffect(() => {
        setEnvs(environments);
    }, [environments]);

    useEffect(() => {
        handleUpdateData(envs);
    }, [envs]);

    const addNewEnvironment = () => {
        setEnvs((prevEnvironments) => {
            return [
                ...prevEnvironments!,
                {
                    _id: prevEnvironments
                        ? `${prevEnvironments.length + 1}`
                        : "0",
                    key: "",
                    value: "",
                },
            ];
        });
    };

    const updateEnvironment = (environment: Environment) => {
        setEnvs((prevEnvironments) => {
            return prevEnvironments!.map((prevEnvironment) => {
                if (prevEnvironment._id == environment._id) {
                    return environment;
                }
                return prevEnvironment;
            });
        });
    };

    const deleteEnvironment = (environment: Environment) => {
        const newEnvironments = environments!.filter((prevEnvironment) => {
            return prevEnvironment._id !== environment._id;
        });
        setEnvs(newEnvironments);
    };
    return (
        <SettingsTable
            data={envs}
            columns={columns}
            placeholderText={placeholderText}
            handleUpdateData={(data: Environment | Redirect) => {
                const env = data as Environment;
                updateEnvironment(env);
            }}
            handleAddNewData={addNewEnvironment}
            handleDeleteData={(data: Environment | Redirect) => {
                const env = data as Environment;
                deleteEnvironment(env);
            }}
        />
    );
}

export default EnvTable;
