// src/app/page
import Container from '@/components/container/container';
import { SpinLoader } from '@/components/SpinLoad/SpinLoader';
import { Suspense } from 'react'

export const revalidate = 60; // ISR: revalida a cada 60 segundos

export default async function Home() {
    return (
        <main className="min-h-screen bg-[#f5f3ef] py-2 px-1">
            <div className="max-w-4xl mx-auto">
                <Suspense fallback={<SpinLoader />}>
                    {/* <PostsListWithCompanies />  */}
                    <Container />
                </Suspense>
            </div>
        </main>
    )
}
