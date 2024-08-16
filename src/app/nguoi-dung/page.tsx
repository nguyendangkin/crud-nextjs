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
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";
import { withAuth } from "@/hoc/withAuth";

interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
}

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const http = createHttpClient();
    const { accessToken } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        // Fetch users only if accessToken exists
        if (accessToken) {
            (async () => {
                const data = await http.get({ url: "/users" });
                setUsers(data);
            })();
        }
    }, [accessToken, http]);

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

export default withAuth(Users);
