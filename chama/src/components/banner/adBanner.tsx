export default function AdBanner() {
    return (
        <div className="w-full max-w-full bg-green-900 dark:bg-white text-neutral-900 dark:text-neutral-100 text-center p-4 sm:p-6 shadow-md border border-green-800 dark:border-gray-200 rounded-lg mb-6 overflow-hidden">
            <span className="font-bold text-white dark:text-black text-sm sm:text-base">
                📢  Divulgue seu negócio  🚀{' '}
                <a
                    href="/cadastro"
                    className="underline text-white hover:text-neutral-200 dark:text-black dark:hover:text-blue-700 transition-colors duration-200"
                >
                    Cadastre-se grátis
                </a>
            </span>
        </div>
    );
}
