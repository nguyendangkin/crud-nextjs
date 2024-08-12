"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
    accessToken: "",
    setAccessToken: (accessToken: string) => {},
    username: "",
    setUsername: (username: string) => {},
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("No AppContext found");
    }
    return context;
};

export default function AppProvider({
    children,
    initialAccessToken = "",
    initPublicInfo = "",
}: {
    children: React.ReactNode;
    initialAccessToken?: string;
    initPublicInfo?: string;
}) {
    const [accessToken, setAccessToken] = useState(initialAccessToken);
    const [username, setUsername] = useState(initPublicInfo);
    return (
        <AppContext.Provider
            value={{ accessToken, setAccessToken, username, setUsername }}
        >
            {children}
        </AppContext.Provider>
    );
}
