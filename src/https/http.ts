import { useAppContext } from "@/app/AppProvider";

const DEFAULT_BASE_URL = "http://localhost:3000";

interface RequestConfig {
    url: string;
    data?: any;
    baseUrl?: string;
    headers?: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const createHeaders = (
    accessToken: string | null,
    customHeaders: Record<string, string> = {}
): Record<string, string> => {
    return {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...customHeaders,
    };
};

const createHttpClient = () => {
    const { accessToken } = useAppContext();

    const request = async (
        method: HttpMethod,
        { url, data, baseUrl = DEFAULT_BASE_URL, headers = {} }: RequestConfig
    ) => {
        const fullUrl = `${baseUrl}${url}`;
        const requestHeaders = createHeaders(accessToken, headers);

        const options: RequestInit = {
            method,
            headers: requestHeaders,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(fullUrl, options);
            return response.json();
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            throw error;
        }
    };

    return {
        get: (config: RequestConfig) => request("GET", config),
        post: (config: RequestConfig) => request("POST", config),
        put: (config: RequestConfig) => request("PUT", config),
        patch: (config: RequestConfig) => request("PATCH", config),
        delete: (config: RequestConfig) => request("DELETE", config),
    };
};

export default createHttpClient;
