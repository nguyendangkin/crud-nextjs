"use client";
import { useAppContext } from "@/app/AppProvider";
import React, { useEffect } from "react";

export default function Users() {
    const { accessToken } = useAppContext();
    useEffect(() => {
        if (accessToken) {
        }
    }, []);
    return <div>Users</div>;
}
