/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Environment from "../../../types/Environment";
import { Redirect } from "../../../types/Redirect";
import SettingsTable from "../settings-table/SettingsTable";

interface Props {
    redirects: Redirect[];
    handleUpdateData: (data: Redirect[]) => void;
}

function RedirsTable({ redirects, handleUpdateData }: Props) {
    const [redirs, setRedirs] = useState<Redirect[]>([]);

    const columns = [{ name: "From (Regex)" }, { name: "To" }];

    const placeholderText = {
        columnA: "From..",
        columnB: "To..",
        notFound: "No redirects found",
    };

    useEffect(() => {
        setRedirs(redirects);
    }, [redirects]);

    useEffect(() => {
        handleUpdateData(redirs);
    }, [redirs]);

    const addNewRedirect = () => {
        setRedirs((prevRedirs) => {
            return [
                ...prevRedirs!,
                {
                    _id: prevRedirs ? `${prevRedirs.length + 1}` : "0",
                    from: "",
                    to: "",
                },
            ];
        });
    };

    const updateRedirect = (redirect: Redirect) => {
        setRedirs((prevRedirs) => {
            return prevRedirs!.map((prevRedir) => {
                if (prevRedir._id == redirect._id) {
                    return redirect;
                }
                return prevRedir;
            });
        });
    };

    const deleteRedirect = (redirect: Redirect) => {
        const newRedir = redirs!.filter((prevRedir) => {
            return prevRedir._id !== redirect._id;
        });
        setRedirs(newRedir);
    };
    return (
        <SettingsTable
            data={redirs}
            columns={columns}
            placeholderText={placeholderText}
            handleUpdateData={(data: Environment | Redirect) => {
                const redir = data as Redirect;
                updateRedirect(redir);
            }}
            handleAddNewData={addNewRedirect}
            handleDeleteData={(data: Environment | Redirect) => {
                const redir = data as Redirect;
                deleteRedirect(redir);
            }}
        />
    );
}

export default RedirsTable;
