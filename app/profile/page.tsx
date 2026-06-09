"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
  const [name, setName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    // Ma'lumotlarni yuklash
    const savedName = localStorage.getItem("profile_name");
    if (savedName) setName(savedName);

    const savedVerified = localStorage.getItem("profile_verified");
    const savedExpires = localStorage.getItem("profile_verified_expires");

    if (savedVerified === "true" && savedExpires) {
      const expirationTime = parseInt(savedExpires);
      if (Date.now() < expirationTime) {
        setIsVerified(true);
        setExpiresAt(expirationTime);
      } else {
        // Muddat tugagan bo'lsa tozalash
        localStorage.removeItem("profile_verified");
        localStorage.removeItem("profile_verified_expires");
      }
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("profile_name", name);
    alert("Профиль успешно сохранен! ✅");
  };

  const buyVerification = () => {
    const duration = 30 * 24 * 60 * 60 * 1000; // 30 kun
    const expirationTime = Date.now() + duration;
    
    localStorage.setItem("profile_verified", "true");
    localStorage.setItem("profile_verified_expires", expirationTime.toString());
    
    setIsVerified(true);
    setExpiresAt(expirationTime);
    alert("Поздравляем! Вы получили синюю галочку на 30 дней! 🏆");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center">
      
      <div className="w-full max-w-md space-y-8">
        {/* Orqaga qaytish tugmasi */}
        <Link href="/" className="text-zinc-400 hover:text-white transition flex items-center gap-2 mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> На главную
        </Link>

        <h1 className="text-4xl font-black mb-10 text-center bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          Настройки профиля
        </h1>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Ism kiritish */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">Ваше имя</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя..."
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
            />
          </div>

          {/* Status (Verifikatsiya) */}
          <div className="pt-4">
            <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isVerified ? "bg-sky-500/10" : "bg-zinc-700/30"}`}>
                  <svg className={`w-6 h-6 ${isVerified ? "text-sky-500" : "text-zinc-500"}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.358.277C14.771 2.535 13.488 1.5 12 1.5a4.24 4.24 0 0 0-3.414 1.787 3.865 3.865 0 0 0-1.358-.277c-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.358-.277C9.229 21.465 10.512 22.5 12 22.5c1.488 0 2.771-1.035 3.414-2.713.417.177.878.277 1.358.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.214 4.29l-3.52-3.57 1.373-1.39 2.147 2.18 5.17-5.25 1.373 1.39-6.543 6.64z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold">{isVerified ? "Верифицирован" : "Стандартный профиль"}</p>
                  <p className="text-[10px] text-zinc-500">
                    {isVerified ? `Активен до: ${new Date(expiresAt!).toLocaleDateString()}` : "Нет активной подписки"}
                  </p>
                </div>
              </div>
              {!isVerified && (
                <button 
                  onClick={buyVerification}
                  className="text-[10px] bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-lg shadow-sky-900/20"
                >
                  Купить
                </button>
              )}
            </div>
          </div>

          {/* Saqlash tugmasi */}
          <button 
            onClick={saveProfile}
            className="w-full bg-green-600 hover:bg-green-500 text-black font-black py-4 rounded-2xl transition transform active:scale-[0.98] shadow-xl shadow-green-900/20"
          >
            СОХРАНИТЬ ИЗМЕНЕНИЯ
          </button>

        </div>

        <p className="text-center text-zinc-600 text-xs pt-4">
          Soundify Music v1.0.0 — Все права защищены
        </p>
      </div>

    </div>
  );
}