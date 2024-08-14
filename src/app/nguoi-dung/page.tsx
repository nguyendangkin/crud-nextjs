"use client";

import createHttpClient from "@/https/http";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const http = createHttpClient();

    useEffect(() => {
        (async () => {
            const data = await http.get({ url: "/users" });
            setUsers(data);
        })();
    }, []);

    return (
        <Table>
            <TableCaption>Tất cả người dùng</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Full Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users &&
                    users.length > 0 &&
                    users.map((user, index) => (
                        <TableRow key={`user-id${index}`}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.fullName}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
