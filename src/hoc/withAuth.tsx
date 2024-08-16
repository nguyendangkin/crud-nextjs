"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function WithAuth(props: P) {
        const router = useRouter();
        const { isAuthenticated } = useAuth();

        useEffect(() => {
            if (!isAuthenticated) {
                router.replace("/dang-nhap");
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}
