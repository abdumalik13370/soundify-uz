export default function TelegramBanner() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg relative overflow-hidden group shadow-2xl">
      {/* Orqa fondagi yorug'lik effekti */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Rasmiy Kanal
          </span>
          <h3 className="text-2xl font-bold text-white mt-3">
            Sayt yangiliklaridan birinchi bo'lib xabardor bo'ling!
          </h3>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Telegram kanalimizda yangi qo'shilgan musiqalar, eksklyuziv premyeralar va platformamizdagi barcha o'zgarishlarni jonli tashlab boramiz. Obuna bo'ling va musiqiy muhitni o'tkazib yubormang!
          </p>
        </div>

        <a 
          href="https://t.me/+dQVBwFFhUIMxNDJi" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto text-center px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] active:scale-98 whitespace-nowrap"
        >
          Kanalga o'tish →
        </a>
      </div>
    </div>
  );
}