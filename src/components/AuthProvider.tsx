"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useAppContext } from "@/app/AppProvider";

interface AuthContextType {
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const { accessToken } = useAppContext();
    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
