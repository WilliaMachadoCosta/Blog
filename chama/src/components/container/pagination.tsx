'use client';

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
}

export default function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-3 mb-10">
            <button
                onClick={prevPage}
                disabled={page === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition disabled:opacity-50"
            >
                <ChevronLeft size={20} /> Anterior
            </button>

            <span className="text-gray-700">Página {page + 1} de {totalPages}</span>

            <button
                onClick={nextPage}
                disabled={page >= totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition disabled:opacity-50"
            >
                Próximo <ChevronRight size={20} />
            </button>
        </div>
    );
} 