'use client';

import { useState } from "react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
}

export default function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const visiblePages = 5;

    const startPage = Math.max(0, Math.min(page - 2, totalPages - visiblePages));
    const endPage = Math.min(startPage + visiblePages, totalPages);

    const goToPage = (pageNum: number) => {
        if (pageNum >= 0 && pageNum < totalPages) {
            setPage(pageNum);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 my-10">
            <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="px-3 py-1 rounded text-sm border border-green-600 text-green-600 hover:bg-green-100 disabled:opacity-50"
            >
                Back
            </button>

            {[...Array(endPage - startPage)].map((_, index) => {
                const pageIndex = startPage + index;
                const isActive = pageIndex === page;

                return (
                    <button
                        key={pageIndex}
                        onClick={() => goToPage(pageIndex)}
                        className={`w-8 h-8 text-sm rounded ${isActive
                            ? "bg-green-600 text-white shadow"
                            : "text-green-600 hover:bg-green-100"
                            }`}
                    >
                        {pageIndex + 1}
                    </button>
                );
            })}

            <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 rounded text-sm border border-green-600 text-green-600 hover:bg-green-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
