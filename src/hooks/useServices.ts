import useSWR from "swr";
import { Service } from "../types/Service";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useServices() {
    const { data, error, mutate } = useSWR("/api/services", fetcher);

    const services: Service[] =
        data?.sort((a: Service, b: Service) => a.order - b.order) ?? [];

    return {
        services,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
