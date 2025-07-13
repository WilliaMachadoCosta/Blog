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

    useEffect(() => {
        try {
            setPostData({ titulo, excerto, imagemPost, autor, slug });

        } catch (err) {
            console.error('Erro no useEffect do PostDataInitializer:', err);
        }
    }, [titulo, excerto, imagemPost, autor, slug]);

    return null;
}

