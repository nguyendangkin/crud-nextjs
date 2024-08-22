import { useAppContext } from "@/app/AppProvider";

const DEFAULT_BASE_URL = "http://localhost:3000";
const DEFAULT_SERVER_URL = `http://localhost:3001`;
const REFRESH_TOKEN_URL = "/auth/refresh";
const HANDLE_ROUTE_URL = "/api";

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
    const { accessToken, setAccessToken } = useAppContext();

    const refreshToken = async (baseUrl: string): Promise<string> => {
        const response = await fetch(`${baseUrl}${REFRESH_TOKEN_URL}`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            console.log("Failed to refresh token");
        }

        const data = await response.json();
        if (data.access_token) {
            // gọi để nạp accessToken mới vào contextAPI
            await fetch(`${DEFAULT_SERVER_URL}${HANDLE_ROUTE_URL}`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            setAccessToken(data.access_token);
        }
        return data.access_token;
    };

    const request = async (
        method: HttpMethod,
        { url, data, baseUrl = DEFAULT_BASE_URL, headers = {} }: RequestConfig,
        retryCount = 0
    ) => {
        const fullUrl = `${baseUrl}${url}`;
        const requestHeaders = createHeaders(accessToken, headers);

        const options: RequestInit = {
            method,
            headers: requestHeaders,
            credentials: "include",
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(fullUrl, options);
            if (response.status === 401 && retryCount === 0) {
                // Token expired, attempt to refresh
                const newToken = await refreshToken(baseUrl);
                // Retry the original request with the new token
                return request(
                    method,
                    {
                        ...{ url, data, baseUrl, headers },
                        headers: {
                            ...headers,
                            Authorization: `Bearer ${newToken}`,
                        },
                    },
                    1
                );
            }
            const responseData = await response.json();
            if (!response.ok) {
                console.log(responseData.message || "Request failed");
            }
            return responseData;
        } catch (error) {
            console.error("Error calling API:", error);
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
