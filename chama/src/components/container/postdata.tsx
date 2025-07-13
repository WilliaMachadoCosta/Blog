'use client';
import { usePostStore } from '@/utils/postState';
import { useEffect } from 'react';


interface Props {
    titulo: string;
    excerto: string;
    imagemPost: string;
    autor: string;
    slug: string;
}

export default function PostDataInitializer({ titulo, excerto, imagemPost, autor, slug }: Props) {
    const setPostData = usePostStore((state) => state.setPostData);
    { console.log('========================>post slug', slug) }
    useEffect(() => {
        setPostData({ titulo, excerto, imagemPost, autor, slug });
    }, [titulo, excerto, imagemPost, autor, slug, setPostData]);

    return null; // não renderiza nada
}
