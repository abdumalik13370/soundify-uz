import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      {/* Sayt Logotipi */}
      <Link href="/" className="text-xl font-bold text-white tracking-wider">
        SOUNDIFY<span className="text-blue-500">.UZ</span>
      </Link>

      {/* Menyu qismi */}
      <div className="flex items-center gap-6">
        {/* Boshqa menyularingiz... */}
        
        {/* Chiroyli Telegram Kanal Tugmasi */}
        <Link 
          href="https://t.me/+dQVBwFFhUIMxNDJi" 
          target="_blank" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] active:scale-95"
        >
          {/* Telegram SVG Logotipi */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.51.16.13.12.17.29.19.41.02.06.02.16.01.23z"/>
          </svg>
          Kanalimizga a'zo bo'lish
        </Link>
      </div>
    </nav>
  );
}