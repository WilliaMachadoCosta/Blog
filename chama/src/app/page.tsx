// src/app/page
import Container from '@/components/container/container';

export const revalidate = 86400; // ISR: revalida a cada 1 dia

export default async function Home() {
    return (
        <main className="min-h-screen bg-[#f5f3ef] py-2 px-1">
            <div className="max-w-4xl mx-auto">
                <Container />
            </div>
        </main>
    );

}
