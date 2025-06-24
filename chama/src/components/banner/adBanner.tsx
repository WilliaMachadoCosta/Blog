export default function AdBanner() {
    return (
        <div className="w-full  bg-red-400 dark:bg-red-600 text-neutral-900 dark:text-neutral-100 text-center p-5 shadow-sm border ">
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
