// src/app/page
import Container from '@/components/container/container';

export const revalidate = 86400; // ISR: revalida a cada 1 dia

export default async function Home() {
    return (
        <main className="min-h-screen bg-gray-50 py-4">
            <Container />
        </main>
    );

}
