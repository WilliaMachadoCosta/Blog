'use client'
import { Search, MoreVertical, X, Camera } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CompanyLogo from "../company/companyLogo";
import { searchPosts } from "@/services/postServices";
import { getAllCompanyPosts, ICompanyPost } from "@/services/companyPostServices";
import { IPost } from "@/models/interfaces/post";
import { useRouter } from "next/navigation";
import { usePostStore } from "@/utils/postState";

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

    const { titulo, excerto, imagemPost, autor, slug } = usePostStore();

    const router = useRouter();
    const handleOpenGenerator = () => {
        if (!titulo) {
            alert('Você precisa estar em um post para gerar a imagem.');
            return;
        }

        router.push(`/gerar-post?excerto=${encodeURIComponent(excerto)}&imagemPost=${encodeURIComponent(imagemPost)}&autor=${encodeURIComponent(autor)}&slug=${encodeURIComponent(slug)}`);
    };

    return (
        <header className="w-full bg-white text-black flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 sticky top-0 z-50">
            {/* Logo ou Nome */}
            <div className="text-lg sm:text-xl font-semibold">
                <Link href="/" aria-label="Ir para página inicial" className="hover:opacity-80 transition-opacity">
                    <CompanyLogo src={"/logos/webao.png"}
                        alt={`Logo Webao`}
                        fallbackText={"Webao"} />
                </Link>
            </div>

            {/* Menu de Navegação - Estilo Instagram */}
            <nav className="flex items-center gap-4">
                <Link href="/" className="font-medium text-sm hover:text-[#d62976] transition-colors">
                    Início
                </Link>
                <Link href="/categorias" className="font-medium text-sm hover:text-[#d62976] transition-colors">
                    Categorias
                </Link>
                <Link href="/blog" className="font-medium text-sm hover:text-[#d62976] transition-colors">
                    Blog
                </Link>
                <button
                    aria-label="Compartilhar com foto"
                    onClick={handleOpenGenerator}
                    className="flex items-center gap-2 px-3 py-2 text-white rounded-lg bg-gradient-to-r from-[#d62976] to-[#fa7e1e] hover:from-[#c2185b] hover:to-[#f57c00] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <Camera className="w-4 h-4" />
                </button>
            </nav>

            {/* Ícones - Estilo Instagram */}
            <div className="flex items-center gap-3">
                {/* Caixa de Pesquisa */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50 p-4">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSearchError("");
                                }}
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d62976] focus:border-transparent transition-all"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isSearching || searchQuery.trim().length < 4}
                                className="px-3 py-2 text-sm bg-gradient-to-r from-[#d62976] to-[#fa7e1e] text-white rounded-lg hover:from-[#c2185b] hover:to-[#f57c00] transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
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
                                            href={`/${post.slug}`}
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
                    className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                    onClick={toggleSearch}
                >
                    <Search className="w-5 h-5" />
                </button>

                {/* Menu (três pontinhos) - visível apenas em telas menores */}
                <button
                    aria-label="Menu"
                    className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 md:hidden"
                    onClick={toggleMobileMenu}
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Menu Mobile Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 md:hidden z-50">
                    <nav className="flex flex-col">
                        <Link
                            href="/"
                            className="px-4 py-3 font-medium text-sm hover:bg-gray-100 transition-colors border-b border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Início
                        </Link>
                        <Link
                            href="/categorias"
                            className="px-4 py-3 font-medium text-sm hover:bg-gray-100 transition-colors border-b border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Categorias
                        </Link>
                        <Link
                            href="/blog"
                            className="px-4 py-3 font-medium text-sm hover:bg-gray-100 transition-colors"
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
