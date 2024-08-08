import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <div className=" bg-gray-200 p-1 flex justify-between items-center">
            <div>
                <Button asChild variant="outline">
                    <Link href="/dang-nhap">Đăng nhập</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/dang-ky">Đăng ký</Link>
                </Button>
            </div>
            <h6>Chinkin123</h6>
        </div>
    );
}
