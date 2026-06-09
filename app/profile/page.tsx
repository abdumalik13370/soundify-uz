"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
  const [name, setName] = useState("Alisher");
  const [surname, setSurname] = useState("Xodjayev");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [avatar, setAvatar] = useState<string>(""); 
  
  // Верификация (Галочка) и состояния времени
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");

  const [isPhoneLocked, setIsPhoneLocked] = useState(false);
  const [tempPhone, setTempPhone] = useState("+998 90 123 45 67");
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Проверка хранилища и истечения времени
  useEffect(() => {
    const savedName = localStorage.getItem("profile_name");
    const savedSurname = localStorage.getItem("profile_surname");
    const savedPhone = localStorage.getItem("profile_phone");
    const savedAvatar = localStorage.getItem("profile_avatar");
    const savedLocked = localStorage.getItem("profile_phone_locked");
    
    if (savedName) setName(savedName);
    if (savedSurname) setSurname(savedSurname);
    if (savedPhone) {
      setPhone(savedPhone);
      setTempPhone(savedPhone);
    }
    if (savedAvatar) setAvatar(savedAvatar);
    if (savedLocked === "true") setIsPhoneLocked(true);

    // Проверка временной верификации
    const checkVerification = () => {
      const savedVerified = localStorage.getItem("profile_verified");
      const savedExpires = localStorage.getItem("profile_verified_expires");

      if (savedVerified === "true" && savedExpires) {
        const now = Date.now();
        const expirationTime = parseInt(savedExpires);

        if (now < expirationTime) {
          setIsVerified(true);
          
          // Расчет оставшегося времени (в часах и минутах)
          const diff = expirationTime - now;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`Осталось: ${hours}ч ${minutes}м`);
        } else {
          // Если время истекло, удаляем из памяти
          localStorage.removeItem("profile_verified");
          localStorage.removeItem("profile_verified_expires");
          setIsVerified(false);
          setTimeLeft("");
        }
      }
    };

    checkVerification();
    const interval = setInterval(checkVerification, 60000); // Проверяет каждую минуту
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        localStorage.setItem("profile_avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    let updatedPhone = phone;
    let locked = isPhoneLocked;

    if (!isPhoneLocked && tempPhone !== phone) {
      updatedPhone = tempPhone;
      locked = true;
      setPhone(tempPhone);
      setIsPhoneLocked(true);
    }

  // ПРОВЕРКА УСЛОВИЯ: Если промокод из Телеграма верный
    if (promoCode === "TG_SOUNDIFY_77") {
      setIsVerified(true);
      // Добавляем 24 часа (24 * 60 * 60 * 1000 миллисекунд) к текущему времени
      const duration24Hours = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("profile_verified", "true");
      localStorage.setItem("profile_verified_expires", duration24Hours.toString());
      setTimeLeft("Осталось 24 часа");
    } else if (promoCode.trim() !== "") {
      alert("⚠️ Неверный промокод! Возьмите код в нашем Telegram-канале.");
    }

    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_surname", surname);
    localStorage.setItem("profile_phone", updatedPhone);
    localStorage.setItem("profile_phone_locked", locked ? "true" : "false");

    setPromoCode("");
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black h-screen text-white flex flex-col justify-between overflow-y-auto">
      
      <header className="p-6 flex justify-between items-center bg-zinc-950/60 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
        <Link href="/">
          <button className="text-zinc-400 hover:text-white flex items-center space-x-2 transition font-medium group">
            <span className="group-hover:-translate-x-1 transition-transform">⬅</span> 
            <span>Вернуться на главную</span>
          </button>
        </Link>
        <h1 className="text-lg font-black tracking-[0.15em] uppercase bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
          ПРОФИЛЬ SOUNDIFY
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 my-6">
        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/80 max-w-md w-full shadow-2xl backdrop-blur-xl relative">
          
          <button 
            onClick={() => {
              if (isEditing) setTempPhone(phone);
              setIsEditing(!isEditing);
            }}
            className="absolute top-6 right-6 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold px-4 py-1.5 rounded-full transition border border-zinc-700/60 text-zinc-300 z-30 cursor-pointer select-none"
          >
            {isEditing ? "Отмена ❌" : "Редактировать ✏️"}
          </button>

          <div className="text-center mb-6 flex flex-col items-center relative z-10">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-28 h-28 bg-zinc-800 rounded-full flex items-center justify-center shadow-xl border-4 border-zinc-900 overflow-hidden cursor-pointer relative group hover:border-green-500 transition duration-300"
            >
              {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-zinc-500 text-5xl">👤</span>}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <span className="text-xs font-bold text-white">Загрузить фото 📸</span>
              </div>
            </div>

            {/* Динамический статус и таймер оставшегося времени */}
            {isVerified && (
              <div className="flex flex-col items-center mt-3 gap-1">
                <span className="text-[11px] text-sky-400 font-bold bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 tracking-wider">
                  ✓ ВРЕМЕННЫЙ VIP
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">{timeLeft}</span>
              </div>
            )}
          </div>

          {/* ПАНЕЛЬ УСЛОВИЙ TELEGRAM (Всегда видна для привлечения людей) */}
          {!isVerified && (
            <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-zinc-900/60 border border-sky-900/40 text-center">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Получить синюю галочку 🌟</h4>
              <p className="text-[11px] text-zinc-400 mb-3">Подпишитесь на наш официальный Telegram-канал и получите секретный промокод!</p>
              
              <a 
                href="https://t.me/PhonkSlowedSpeedup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md shadow-sky-500/10"
              >
                ✈️ Перейти в канал и получить код
              </a>
            </div>
          )}

          <div className="space-y-4 relative z-10">
            <div>
              <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider block mb-1">Имя</label>
              {isEditing ? (
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500 text-white font-medium" />
              ) : (
                <div className="bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/40 text-sm font-semibold text-zinc-200">{name}</div>
              )}
            </div>

            <div>
              <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider block mb-1">Фамилия</label>
              {isEditing ? (
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500 text-white font-medium" />
              ) : (
                <div className="bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/40 text-sm font-semibold text-zinc-200">{surname}</div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Номер телефона</label>
                {isPhoneLocked && <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">🔒 Нельзя изменить</span>}
              </div>
              {isEditing && !isPhoneLocked ? (
                <div>
                  <input type="text" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-500 text-white font-mono" />
                  <p className="text-[10px] text-zinc-500 mt-1">⚠️ Вы можете изменить номер только 1 раз!</p>
                </div>
              ) : (
                <div className="bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/40 text-sm font-medium text-zinc-300 font-mono">{phone}</div>
              )}
            </div>

            {/* Поле ввода промокода (Показывается только при редактировании и отсутствии галочки) */}
            {isEditing && !isVerified && (
              <div className="pt-2 border-t border-zinc-800/60">
                <label className="text-xs text-sky-400 uppercase font-bold tracking-wider block mb-1">Telegram Промокод 🔑</label>
                <input 
                  type="text" 
                  placeholder="Введите код из канала..." 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-zinc-950 border border-sky-900/30 rounded-lg p-2.5 text-sm focus:outline-none focus:border-sky-500 text-sky-400 placeholder-zinc-700 font-mono uppercase"
                />
              </div>
            )}

            {isEditing && (
              <button onClick={handleSave} className="w-full bg-green-500 hover:bg-green-400 text-black font-bold p-3 rounded-lg text-sm mt-6 shadow-lg transition duration-200">
                Сохранить данные ✓
              </button>
            )}
          </div>

        </div>
      </main>

      <footer className="h-14 bg-zinc-950 border-t border-zinc-800 px-6 flex items-center justify-center text-xs text-zinc-600">Soundify © 2026</footer>
    </div>
  );
}