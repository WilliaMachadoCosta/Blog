// components/container/postdata.tsx
'use client';

import { useEffect } from 'react';
import { usePostStore } from '@/utils/postState';

interface Props {
    titulo: string;
    excerto: string;
    imagemPost: string;
    autor: string;
    slug: string;
    empresa?: string;
    telefone?: string;
    whatsapp?: string;
    site?: string;
}

export default function PostDataInitializer({
    titulo,
    excerto,
    imagemPost,
    autor,
    slug,
    empresa,
    telefone,
    whatsapp,
    site,
}: Props) {
    const setPostData = usePostStore((state) => state.setPostData);

    useEffect(() => {
        setPostData({
            titulo,
            excerto,
            imagemPost,
            autor,
            slug,
            empresa,
            telefone,
            whatsapp,
            site,
        });
    }, [titulo, excerto, imagemPost, autor, slug, empresa, telefone, whatsapp, site, setPostData]);

    return null;
}
