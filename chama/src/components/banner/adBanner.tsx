export default function AdBanner() {
    return (
        <div className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-center p-2 shadow-sm border rounded">
            <span className="font-medium">
                🚀 Divulgue seu negócio.{' '}
                <a
                    href="/cadastro"
                    className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Cadastre-se grátis
                </a>
            </span>
        </div>
    );
}
