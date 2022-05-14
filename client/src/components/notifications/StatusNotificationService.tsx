/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { servicesState } from "../../atoms/atoms";
import { io, Socket } from "socket.io-client";
import getConfig from "next/config";
import { ServiceStatus } from "../../types/enums/ServiceStatus";

const { publicRuntimeConfig } = getConfig();
const ROOT_API_URL: string =
    publicRuntimeConfig.NEXT_PUBLIC_API_URL ?? "http://localhost:8010";

function StatusNotificationService() {
    const [_, setServices] = useRecoilState(servicesState);
    const socketRef = useRef<Socket>();
    useEffect(() => {
        if (socketRef.current == null) {
            const pathRegex = /(^https?:\/\/.+\/)(.*)$/;
            const match = pathRegex.exec(ROOT_API_URL);
            let url = ROOT_API_URL;
            let path = "";
            if (match != null) {
                url = match[1];
                path = match[2];
            }
            if (path === "") {
                socketRef.current = io(ROOT_API_URL);
            } else {
                socketRef.current = io(url, {
                    path: `/${path}/socket.io`,
                });
            }
        }
        const { current: socket } = socketRef;
        socket.on("status", (message) => {
            setServices((prevServices) => {
                const serviceName: string = message.name;
                const status: ServiceStatus = message.status;
                const service = prevServices.find(
                    (service) => service.name === serviceName
                );

                let updatedServices = [...prevServices];
                if (service) {
                    const updatedService = {
                        ...service,
                        status,
                    };
                    updatedServices = [
                        ...prevServices.filter(
                            (service) => service.name !== serviceName
                        ),
                        updatedService,
                    ];
                }
                return updatedServices.sort((a, b) => a.order - b.order);
            });
        });
    }, []);
    return <Fragment></Fragment>;
}

export default StatusNotificationService;
