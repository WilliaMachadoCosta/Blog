export function Footer() {
    return (
        <footer className="bg-green-900 text-white p-2 flex justify-around items-center">
            <div className="flex flex-col items-center text-xs">
                <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm6-3H6v-1c0-2.21 3.58-4 6-4s6 1.79 6 4v1zm-6-7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
                Contatos
            </div>
            <div className="flex flex-col items-center text-xs">
                <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-2h4v2zm0-4H8v-2h4v2zm0-4H8V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" /></svg>
                Empresas
            </div>
            <div className="flex flex-col items-center text-xs">
                <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                Perfil
            </div>
        </footer>
    );
}