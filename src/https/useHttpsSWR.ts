import { HttpsSWR } from "@/https/HttpsSWR";
import useSWR from "swr";

interface RequestConfig {
    url: string;
    baseUrl?: string;
    token?: string;
}

export function useHttpsSWR(config: RequestConfig) {
    const { url, baseUrl = HttpsSWR.getDefaultBaseUrl(), token } = config;
    const fullUrl = `${baseUrl}${url}`;

    const { data, error, mutate } = useSWR(
        fullUrl,
        () => HttpsSWR.get(config),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { data, error, mutate };
}

// test thử merge
