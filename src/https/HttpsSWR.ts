import useSWR, { mutate as globalMutate } from "swr";

export class HttpsSWR {
    private static defaultBaseUrl: string = "http://localhost:3000"; // mặc định

    private static fetcher(url: string, method: string, data?: any) {
        return fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        });
    }

    static get(endpoint: string, customBaseUrl?: string) {
        const baseUrl = customBaseUrl || HttpsSWR.defaultBaseUrl;
        const { data, error, mutate } = useSWR(
            `${baseUrl}${endpoint}`,
            (url) => HttpsSWR.fetcher(url, "GET"),
            {
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            }
        );

        return { data, error, mutate };
    }

    static async post(endpoint: string, data: any, customBaseUrl?: string) {
        const baseUrl = customBaseUrl || HttpsSWR.defaultBaseUrl;
        const fullUrl = `${baseUrl}${endpoint}`;
        try {
            const result = await HttpsSWR.fetcher(fullUrl, "POST", data);
            await globalMutate(fullUrl);
            return result;
        } catch (error) {
            console.error(`Error in POST request to ${fullUrl}:`, error);
            throw error;
        }
    }
    static async put(endpoint: string, data: any, customBaseUrl?: string) {
        const baseUrl = customBaseUrl || HttpsSWR.defaultBaseUrl;
        const fullUrl = `${baseUrl}${endpoint}`;
        try {
            const result = await HttpsSWR.fetcher(fullUrl, "PUT", data);
            await globalMutate(fullUrl);
            return result;
        } catch (error) {
            console.error(`Error in PUT request to ${fullUrl}:`, error);
            throw error;
        }
    }

    static async delete(endpoint: string, customBaseUrl?: string) {
        const baseUrl = customBaseUrl || HttpsSWR.defaultBaseUrl;
        const fullUrl = `${baseUrl}${endpoint}`;
        try {
            const result = await HttpsSWR.fetcher(fullUrl, "DELETE");
            await globalMutate(fullUrl);
            return result;
        } catch (error) {
            console.error(`Error in DELETE request to ${fullUrl}:`, error);
            throw error;
        }
    }
}
