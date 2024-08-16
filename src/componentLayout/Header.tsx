"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppContext } from "@/app/AppProvider";
import createHttpClient from "@/https/http";
import { useRouter } from "next/navigation";

export default function Header() {
    const { setAccessToken } = useAppContext();
    const https = createHttpClient();
    const router = useRouter();
    const handleLogout = async () => {
        setAccessToken("");
        await https.delete({
            url: "/api",
            baseUrl: "http://localhost:3001",
        });
        router.push("/");
    };
    return (
        <div className=" bg-gray-200 p-1 flex justify-between items-center">
            <div>
                <Link
                    className="border-2 border-transparent rounded p-1 mr-2 bg-white"
                    href="/"
                >
                    Trang Chủ
                </Link>
                <Button asChild variant="outline">
                    <Link href="/dang-nhap">Đăng nhập</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/dang-ky">Đăng ký</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/nguoi-dung">Quản lý người dùng</Link>
                </Button>
                <Button onClick={handleLogout} variant="outline">
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
}
