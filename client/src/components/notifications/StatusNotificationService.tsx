/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { servicesState } from "../../atoms/atoms";
import { io, Socket } from "socket.io-client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const ROOT_API_URL =
    publicRuntimeConfig.NEXT_PUBLIC_API_URL ?? "http://localhost:8010";

function StatusNotificationService() {
    const [_, setServices] = useRecoilState(servicesState);
    const socketRef = useRef<Socket>();
    useEffect(() => {
        if (socketRef.current == null) {
            socketRef.current = io(ROOT_API_URL, { path: "/socket.io" });
        }
        const { current: socket } = socketRef;

        socket.on("status", (message) => {
            setServices((prevServices) => {
                const { serviceName, status } = message;
                const service = prevServices.find(
                    (service) => service.name === serviceName
                );
                console.log(prevServices);
                console.log(message);
                if (service) {
                    const updatedService = {
                        ...service,
                        status,
                    };
                    return [
                        ...prevServices.filter(
                            (service) => service.name !== serviceName
                        ),
                        updatedService,
                    ];
                } else {
                    return [...prevServices];
                }
            });
        });
    }, []);
    return <Fragment></Fragment>;
}

export default StatusNotificationService;
