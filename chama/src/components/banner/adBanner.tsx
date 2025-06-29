export default function AdBanner() {
    return (
        <div className="w-full bg-green-900 dark:bg-white text-neutral-900 dark:text-neutral-100 text-center p-3 sm:p-5 shadow-sm border mb-4">
            <span className="font-bold text-black text-sm sm:text-base">
                📢  Divulgue seu negócio  🚀{' '}
                <a
                    href="/cadastro"
                    className="underline text-white hover:text-neutral-800 dark:text-black dark:hover:text-blue-700"
                >
                    Cadastre-se grátis
                </a>
            </span>
        </div>
    );
}
