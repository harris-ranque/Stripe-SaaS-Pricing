'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { accessToken } = useAuth();

    useEffect(() => {
        if (!accessToken) {
            router.push('/login');
        }
    }, [accessToken, router]);

    if (!accessToken) {
        return null;
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}