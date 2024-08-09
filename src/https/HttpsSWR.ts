import useSWR, { mutate as globalMutate } from "swr";

export class HttpsSWR {
    private static baseUrl: string = "http://localhost:3000"; // Set default base URL

    static setBaseUrl(url: string) {
        HttpsSWR.baseUrl = url;
    }

    private static fetcher(url: string, method: string, data?: any) {
        return fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        }).then((res) => res.json());
    }

    static get(endpoint: string) {
        const { data, error, mutate } = useSWR(
            `${HttpsSWR.baseUrl}${endpoint}`,
            (url) => HttpsSWR.fetcher(url, "GET"),
            {
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            }
        );

        return { data, error, mutate };
    }

    static async post(endpoint: string, data: any) {
        try {
            const result = await HttpsSWR.fetcher(
                `${HttpsSWR.baseUrl}${endpoint}`,
                "POST",
                data
            );
            await globalMutate(`${HttpsSWR.baseUrl}${endpoint}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async put(endpoint: string, data: any) {
        try {
            const result = await HttpsSWR.fetcher(
                `${HttpsSWR.baseUrl}${endpoint}`,
                "PUT",
                data
            );
            await globalMutate(`${HttpsSWR.baseUrl}${endpoint}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(endpoint: string) {
        try {
            const result = await HttpsSWR.fetcher(
                `${HttpsSWR.baseUrl}${endpoint}`,
                "DELETE"
            );
            await globalMutate(`${HttpsSWR.baseUrl}${endpoint}`);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
