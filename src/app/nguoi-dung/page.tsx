"use client";
import { useAppContext } from "@/app/AppProvider";
import { HttpsSWR } from "@/https/HttpsSWR";
import React, { useEffect, useState } from "react";

export default function Users() {
    const { accessToken } = useAppContext();

    useEffect(() => {
        if (accessToken) {
            (async () => {
                const data = await HttpsSWR.get({
                    url: "/users",
                    token: accessToken,
                });
                console.log(data);
            })();
        }
    }, [accessToken]);

    return <p>Xin chào</p>;
}
