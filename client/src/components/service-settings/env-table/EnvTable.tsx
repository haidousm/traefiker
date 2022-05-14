/* eslint-disable react-hooks/exhaustive-deps */
import { env } from "process";
import React, { useEffect, useState } from "react";
import { EnvironmentVariable } from "../../../types/EnvironmentVariable";
import { Redirect } from "../../../types/Redirect";
import SettingsTable from "../settings-table/SettingsTable";

interface Props {
    environments: EnvironmentVariable[];
    handleUpdateData: (data: EnvironmentVariable[]) => void;
}

function EnvTable({ environments, handleUpdateData }: Props) {
    const [envs, setEnvs] = useState<EnvironmentVariable[]>([]);

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
                    key: "",
                    value: "",
                },
            ];
        });
    };

    const updateEnvironment = (environment: EnvironmentVariable) => {
        setEnvs((prevEnvironments) => {
            return prevEnvironments!.map((prevEnvironment) => {
                if (prevEnvironment.key == environment.key) {
                    return environment;
                }
                return prevEnvironment;
            });
        });
    };

    const deleteEnvironment = (environment: EnvironmentVariable) => {
        const newEnvironments = environments!.filter((prevEnvironment) => {
            return prevEnvironment.key !== environment.key;
        });
        setEnvs(newEnvironments);
    };
    return (
        <SettingsTable
            data={envs}
            columns={columns}
            placeholderText={placeholderText}
            handleUpdateData={(data: EnvironmentVariable | Redirect) => {
                const env = data as EnvironmentVariable;
                updateEnvironment(env);
            }}
            handleAddNewData={addNewEnvironment}
            handleDeleteData={(data: EnvironmentVariable | Redirect) => {
                const env = data as EnvironmentVariable;
                deleteEnvironment(env);
            }}
        />
    );
}

export default EnvTable;
