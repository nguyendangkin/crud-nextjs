"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
    accessToken: "",
    setAccessToken: (accessToken: string) => {},
});

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("No AppContext found");
    }
    return context;
};

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [accessToken, setAccessToken] = useState("");
    return (
        <AppContext.Provider
            value={{ accessToken, setAccessToken }}
        ></AppContext.Provider>
    );
}
