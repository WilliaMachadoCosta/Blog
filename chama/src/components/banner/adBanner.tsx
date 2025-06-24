export default function AdBanner() {
    return (
        <div className="w-full bg-white dark:bg-red-600 text-neutral-900 dark:text-neutral-100 text-center p-2 shadow-sm border rounded">
            <span className="font-bold">
                🚀 Divulgue seu negócio.{' '}
                <a
                    href="/cadastro"
                    className="underline text-white hover:text-neutral-800 dark:text-white dark:hover:text-neutral-300"
                >
                    Cadastre-se grátis
                </a>
            </span>
        </div>
    );
}
