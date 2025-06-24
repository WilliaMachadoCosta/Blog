export default function AdBanner() {
    return (
        <div className="w-full  bg-green-900 dark:bg-white text-neutral-900 dark:text-neutral-100 text-center p-5 shadow-sm border ">
            <span className="font-bold text-black">
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
