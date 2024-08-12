import { mutate as globalMutate } from "swr";

interface RequestConfig {
    url: string;
    data?: any;
    baseUrl?: string;
    token?: string;
}

class HttpsSWR {
    private static defaultBaseUrl: string = "http://localhost:3000";

    private static async fetcher(config: RequestConfig, method: string) {
        const {
            url,
            data,
            baseUrl = HttpsSWR.getDefaultBaseUrl(),
            token,
        } = config;
        const fullUrl = `${baseUrl}${url}`;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(fullUrl, {
                method,
                headers,
                body: data ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error(`Error in ${method} request to ${fullUrl}:`, error);
            throw error;
        }
    }

    public static async get(config: RequestConfig) {
        return HttpsSWR.fetcher(config, "GET");
    }

    public static async post(config: RequestConfig) {
        const result = await HttpsSWR.fetcher(config, "POST");
        await globalMutate(config.url);
        return result;
    }

    public static async put(config: RequestConfig) {
        const result = await HttpsSWR.fetcher(config, "PUT");
        await globalMutate(config.url);
        return result;
    }

    public static async delete(config: RequestConfig) {
        const result = await HttpsSWR.fetcher(config, "DELETE");
        await globalMutate(config.url);
        return result;
    }

    public static getDefaultBaseUrl() {
        return HttpsSWR.defaultBaseUrl;
    }
}

export { HttpsSWR };
