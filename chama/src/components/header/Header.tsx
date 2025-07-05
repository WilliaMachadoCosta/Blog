'use client'
import { Search, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CompanyLogo from "../company/companyLogo";
import { searchPosts } from "@/services/postServices";
import { getAllCompanyPosts, ICompanyPost } from "@/services/companyPostServices";
import { IPost } from "@/models/interfaces/post";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<IPost[]>([]);
    const [companyResults, setCompanyResults] = useState<ICompanyPost[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState("");

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setSearchQuery("");
            setSearchResults([]);
            setCompanyResults([]);
            setSearchError("");
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar se tem pelo menos 4 letras
        if (searchQuery.trim().length < 4) {
            setSearchError("Digite pelo menos 4 letras para pesquisar");
            return;
        }

        setIsSearching(true);
        setSearchError("");

        try {
            // Buscar posts
            const results = await searchPosts(searchQuery);
            setSearchResults(results);
            // Buscar empresas
            const allCompanies = await getAllCompanyPosts();
            const filteredCompanies = allCompanies.filter(company => {
                const q = searchQuery.trim().toLowerCase();
                return (
                    company.companyName.toLowerCase().includes(q) ||
                    company.slug.toLowerCase().includes(q)
                );
            });
            setCompanyResults(filteredCompanies);
            if (results.length === 0 && filteredCompanies.length === 0) {
                setSearchError("Nenhum resultado encontrado");
            }
        } catch (error) {
            setSearchError("Erro ao realizar a pesquisa");
            console.error("Erro na pesquisa:", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <header className="w-full bg-[#f5f3ef] text-black flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 shadow-md relative">
            {/* Logo ou Nome */}
            <div className="text-lg sm:text-xl font-semibold">
                <Link href="/" aria-label="Ir para página inicial">
                    <CompanyLogo src={"/logos/chama.png"}
                        alt={`Logo Chama No Zap`}
                        fallbackText={"Chama no Zap"} />
                </Link>
            </div>

            {/* Menu de Navegação */}
            <nav className="flex items-center gap-6 w-full justify-center md:justify-start">
                <Link href="/" className="font-semibold text-sm sm:text-base hover:text-green-600 transition-colors">
                    Início
                </Link>
                <Link href="/categorias" className="font-semibold text-sm sm:text-base hover:text-green-600 transition-colors">
                    Categorias
                </Link>
                <Link href="/blog" className="font-semibold text-sm sm:text-base hover:text-green-600 transition-colors">
                    Blog
                </Link>
            </nav>

            {/* Ícones */}
            <div className="flex items-center gap-3 sm:gap-5">
                {/* Caixa de Pesquisa */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 p-2 sm:p-4">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Digite pelo menos 4 letras..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSearchError("");
                                }}
                                className="flex-1 px-2 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isSearching || searchQuery.trim().length < 4}
                                className="px-2 py-2 sm:px-4 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSearching ? (
                                    <span className="flex items-center gap-1">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span className="hidden sm:inline">Buscando...</span>
                                    </span>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">Pesquisar</span>
                                        <span className="sm:hidden">Buscar</span>
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={toggleSearch}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </form>

                        {/* Mensagem de erro */}
                        {searchError && (
                            <div className="mt-2 text-red-600 text-sm px-2">
                                {searchError}
                            </div>
                        )}

                        {/* Resultados da pesquisa */}
                        {(searchResults.length > 0 || companyResults.length > 0) && (
                            <div className="mt-4 max-h-96 overflow-y-auto">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2 px-2">
                                    Resultados ({searchResults.length + companyResults.length})
                                </h3>
                                <div className="space-y-2">
                                    {/* Resultados de posts */}
                                    {searchResults.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/post/${post.slug}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                                                {post.excerpt.replace(/<[^>]*>/g, '')}
                                            </p>
                                        </Link>
                                    ))}
                                    {/* Resultados de empresas */}
                                    {companyResults.map((company: ICompanyPost) => (
                                        <Link
                                            key={company.id}
                                            href={`/${company.slug}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="block p-2 hover:bg-green-50 rounded-lg border border-green-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <img src={company.coverImageUrl} alt={company.companyName} className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                                                <div>
                                                    <h4 className="font-medium text-sm text-green-800 line-clamp-1">{company.companyName}</h4>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{company.excerpt.replace(/<[^>]*>/g, '')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Botão de Pesquisa */}
                <button
                    aria-label="Pesquisar"
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    onClick={toggleSearch}
                >
                    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Menu (três pontinhos) - visível apenas em telas menores */}
                <button
                    aria-label="Menu"
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors md:hidden"
                    onClick={toggleMobileMenu}
                >
                    <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Menu Mobile Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-50">
                    <nav className="flex flex-col">
                        <Link
                            href="/"
                            className="px-4 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors border-b border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Início
                        </Link>
                        <Link
                            href="/categorias"
                            className="px-4 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors border-b border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Categorias
                        </Link>
                        <Link
                            href="/blog"
                            className="px-4 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blog
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
