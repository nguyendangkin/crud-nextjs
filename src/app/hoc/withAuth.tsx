"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppProvider";

// Danh sách các route công khai và riêng tư
const PUBLIC_ROUTES = ["/dang-nhap", "/dang-ky"];
const PRIVATE_ROUTES = ["/nguoi-dung", "/dashboard/:path*", "/profile/:path*"];

// Thêm constraint cho kiểu P để bao gồm IntrinsicAttributes
export default function withAuth<
    P extends React.ComponentPropsWithoutRef<React.ElementType>
>(WrappedComponent: React.ComponentType<P>) {
    return function WithAuth(props: P) {
        const router = useRouter();
        const { accessToken } = useAppContext(); // Lấy accessToken từ context

        useEffect(() => {
            const { pathname } = new URL(window.location.href);

            // Nếu không có token và đang cố gắng truy cập các trang riêng tư
            if (
                !accessToken &&
                PRIVATE_ROUTES.some((route) =>
                    pathname.match(new RegExp(route.replace(":path*", ".*")))
                )
            ) {
                router.replace("/dang-nhap"); // Chuyển hướng đến trang đăng nhập
            }
            // Nếu có token và đang cố gắng truy cập các trang công khai
            else if (accessToken && PUBLIC_ROUTES.includes(pathname)) {
                router.replace("/"); // Chuyển hướng về trang chính
            }
        }, [accessToken, router]);

        // Nếu không có token và truy cập vào các trang riêng tư, không hiển thị component
        if (
            !accessToken &&
            PRIVATE_ROUTES.some((route) =>
                window.location.pathname.match(
                    new RegExp(route.replace(":path*", ".*"))
                )
            )
        ) {
            return null; // Hoặc bạn có thể trả về một spinner/loader
        }

        return <WrappedComponent {...props} />;
    };
}
