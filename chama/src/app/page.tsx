// src/app/page
import { Carrocel } from '@/components/container/carrocel';
import Container from '@/components/container/container'
import { SpinLoader } from '@/components/SpinLoad/SpinLoader'
import { IPost } from '@/models/interfaces/post'
import { getAllPosts } from '@/services/postServices';

import { Suspense } from 'react'
export const revalidate = 60; // ISR: revalida a cada 60 segundos



export default async function Home() {
    const posts: IPost[] = await getAllPosts();
    return (
        <Suspense fallback={<SpinLoader />}>
            <Container posts={posts} />
            <Carrocel posts={posts} />
        </Suspense>

    )
}
