"use client";

import { useRouter } from "next/navigation";
import { SubHeader } from "./sub-header";

export default function SubHeaderClient({ company }: { company?: any }) {
    const router = useRouter();

    return <SubHeader company={company || {}} onBack={() => router.back()} />;
}
