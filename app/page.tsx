"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// 1. Musiqalar ro'yxati (Namuna uchun bepul mp3 linklar)
const TRACKS_DATA = [
  {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
   {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
   {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
   {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
   {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
   {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
     {
    id: 4,
    title: "shamsiyev",
    artist: "Rain Dance",
    src: "/musicxxx/raindance.mp3.mp3",
    cover: "⚡",
  },
];

const SUPABASE_URL = "https://wdawvyidjcpadbajkjoz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYXd2eWlkamNwYWRiYWpram96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjgwNzEsImV4cCI6MjA5NjYwNDA3MX0.DeYPZAvdIZ8kP0_U_ab-T-cjrpIxBVMZGRrY3F6Wxtk";

// ... TRACKS_DATA ro'yxatingiz o'z holicha tursin ...

export default function Home() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8); 
  const [prevVolume, setPrevVolume] = useState(0.8); 
  
  const [profileName, setProfileName] = useState("Мой профиль");
  const [isVerified, setIsVerified] = useState(false);
  
  // 🌐 БАЗАДАН КЕЛГАН ФОЙДАЛАНУВЧИЛАР РЎЙХАТИ
  const [globalUsers, setGlobalUsers] = useState<any[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS_DATA[currentTrackIndex];

  // Базадан одамларни тортиб келиш функцияси
  const fetchGlobalUsers = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&order=updated_at.desc`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setGlobalUsers(data);
      }
    } catch (e) {
      console.error("Ошибка загрузки пользователей:", e);
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem("profile_name");
    if (savedName && savedName.trim() !== "") {
      setProfileName(savedName);
    }
    
    const savedVerified = localStorage.getItem("profile_verified");
    if (savedVerified === "true") setIsVerified(true);

    // Базани юклаш ва ҳар 10 сонияда янгилаб туриш (Live эффект)
    fetchGlobalUsers();
    const interval = setInterval(fetchGlobalUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log("Ошибка воспроизведения:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log("Ошибка воспроизведения:", e));
      }
    }
  }, [currentTrackIndex]);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS_DATA.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS_DATA.length) % TRACKS_DATA.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 0.8);
    }
  };

  return (
    <div className="bg-black h-screen text-white overflow-hidden flex flex-col">
      <audio ref={audioRef} src={currentTrack?.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={nextTrack} />

      <div className="flex flex-1 overflow-y-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-950 p-6 hidden md:block border-r border-zinc-800">
          <div className="mb-8 select-none">
            <h1 className="text-3xl font-black tracking-[0.2em] uppercase bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              SOUNDIFY
            </h1>
          </div>
          <nav className="space-y-4">
            <Link href="/" className="text-white cursor-pointer font-medium transition block bg-zinc-900 p-2 rounded-lg">🏠 Главная</Link>
            <Link href="/profile" className="text-zinc-400 hover:text-white cursor-pointer font-medium transition block p-2 rounded-lg">👤 Профиль</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-b from-zinc-900 to-black p-6 md:p-8 overflow-y-auto space-y-8">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold">Добро пожаловать!</h2>
            <Link href="/profile">
              <button className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full text-sm font-semibold transition px-5 border border-zinc-700/80 flex items-center gap-2 max-w-[240px] shadow-md group">
                <span className="truncate text-zinc-200 group-hover:text-white transition">{profileName}</span>
                {isVerified && (
                  <svg className="w-4 h-4 text-sky-500 fill-current flex-shrink-0 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" viewBox="0 0 24 24">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.358.277C14.771 2.535 13.488 1.5 12 1.5a4.24 4.24 0 0 0-3.414 1.787 3.865 3.865 0 0 0-1.358-.277c-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.358-.277C9.229 21.465 10.512 22.5 12 22.5c1.488 0 2.771-1.035 3.414-2.713.417.177.878.277 1.358.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.214 4.29l-3.52-3.57 1.373-1.39 2.147 2.18 5.17-5.25 1.373 1.39-6.543 6.64z"/>
                  </svg>
                )}
              </button>
            </Link>
          </header>
          
          {/* Панель автора */}
          <div className="animate-fade-in">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5 max-w-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-500"></div>
              <div className="w-20 h-20 rounded-full border-2 border-zinc-700 overflow-hidden bg-zinc-800 flex-shrink-0 shadow-lg relative group-hover:border-green-400 transition-colors duration-300">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Автор" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1.5 z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <h4 className="text-lg font-extrabold text-white tracking-wide">Алишер Ходжаев</h4>
                    <svg className="w-4 h-4 text-sky-500 fill-current flex-shrink-0 drop-shadow-[0_0_10px_rgba(14,165,233,0.6)]" viewBox="0 0 24 24">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.358.277C14.771 2.535 13.488 1.5 12 1.5a4.24 4.24 0 0 0-3.414 1.787 3.865 3.865 0 0 0-1.358-.277c-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.358-.277C9.229 21.465 10.512 22.5 12 22.5c1.488 0 2.771-1.035 3.414-2.713.417.177.878.277 1.358.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.214 4.29l-3.52-3.57 1.373-1.39 2.147 2.18 5.17-5.25 1.373 1.39-6.543 6.64z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 font-medium px-2 py-0.5 rounded-full border border-zinc-700/50 w-max mx-auto sm:mx-0">20 лет</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-md">Я являюсь создателем проекта Soundify. Разработал эту платформу на основе передовых веб-технологий.</p>
              </div>
            </div>
          </div>

          {/* 🌐 СЕКЦИЯ: НОВЫЕ ПОЛЬЗОВАТЕЛИ (БАЗАДАН КЕЛГАН ОДАМЛАР) */}
          <div className="bg-zinc-950/40 border border-zinc-800/60 p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Пользователи на платформе 👥</h3>
            <div className="flex flex-wrap gap-4">
              {globalUsers.length === 0 ? (
                <p className="text-xs text-zinc-600">Никого нет...</p>
              ) : (
                globalUsers.map((u: any) => (
                  <div key={u.id} className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center text-[10px]">
                      {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : "👤"}
                    </div>
                    <span className="text-zinc-200">{u.name} {u.surname}</span>
                    {u.is_verified && (
                      <svg className="w-3.5 h-3.5 text-sky-500 fill-current flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.358.277C14.771 2.535 13.488 1.5 12 1.5a4.24 4.24 0 0 0-3.414 1.787 3.865 3.865 0 0 0-1.358-.277c-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.358-.277C9.229 21.465 10.512 22.5 12 22.5c1.488 0 2.771-1.035 3.414-2.713.417.177.878.277 1.358.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.214 4.29l-3.52-3.57 1.373-1.39 2.147 2.18 5.17-5.25 1.373 1.39-6.543 6.64z"/>
                      </svg>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <hr className="border-zinc-800/40" />

          {/* СЕКЦИЯ ТРЕКОВ */}
          <div className="pb-12">
            <h3 className="text-lg font-bold mb-3.5 text-zinc-400">Рекомендуемые треки</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {TRACKS_DATA.map((track, index) => {
                const isThisTrackPlaying = currentTrackIndex === index && isPlaying;
                return (
                  <div key={track.id} onClick={() => playTrack(index)} className={`p-2.5 rounded-xl transition cursor-pointer group border backdrop-blur-md flex flex-col justify-between ${currentTrackIndex === index ? "bg-zinc-800/90 border-green-500/50 shadow-lg" : "bg-zinc-900/40 hover:bg-zinc-800/60 border-zinc-800/40"}`}>
                    <div className="bg-zinc-800 w-full aspect-square rounded-lg mb-2 shadow-md overflow-hidden relative flex items-center justify-center text-3xl select-none">
                      {track.cover}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button className="bg-green-500 text-black p-2 rounded-full shadow-lg hover:scale-105 transition text-xs font-bold w-8 h-8 flex items-center justify-center">{isThisTrackPlaying ? "⏸" : "▶"}</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1 px-0.5">
                      <div className="truncate flex-1">
                        <h3 className="text-xs sm:text-sm font-bold truncate text-zinc-200 group-hover:text-green-400 transition duration-200">{track.title}</h3>
                        <p className="text-[10px] sm:text-xs text-zinc-500 truncate mt-0.5">{track.artist}</p>
                      </div>
                      <a href={track.src} download={`${track.artist} - ${track.title}.mp3`} onClick={(e) => e.stopPropagation()} className="w-7 h-7 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md flex items-center justify-center text-xs border border-zinc-700/50 transition active:scale-95 flex-shrink-0" title="Скачать">⬇️</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <footer className="h-24 bg-zinc-950 border-t border-zinc-800 px-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-4 w-1/4">
          <div className="w-14 h-14 bg-zinc-800 rounded flex items-center justify-center text-2xl shadow-md border border-zinc-700">{currentTrack?.cover}</div>
          <div className="truncate">
            <h4 className="text-sm font-medium truncate text-green-400">{currentTrack?.title}</h4>
            <p className="text-xs text-zinc-400 truncate">{currentTrack?.artist}</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 w-2/4">
          <div className="flex items-center space-x-6 text-zinc-400">
            <button onClick={prevTrack} className="hover:text-white transition text-lg">⏮</button>
            <button onClick={togglePlay} className="bg-white text-black p-2 rounded-full hover:scale-105 transition text-lg w-10 h-10 flex items-center justify-center font-bold shadow-md">{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={nextTrack} className="hover:text-white transition text-lg">⏭</button>
          </div>
          <div className="w-full max-w-md flex items-center space-x-2 text-xs text-zinc-500 font-mono">
            <span>{Math.floor(currentTime / 60)}:{( "0" + Math.floor(currentTime % 60) ).slice(-2)}</span>
            <div className="flex-1 bg-zinc-800 h-1 rounded-full overflow-hidden relative cursor-pointer">
              <div className="bg-green-500 h-full transition-all duration-100" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}></div>
            </div>
            <span>{Math.floor(duration / 60) || 0}:{( "0" + Math.floor(duration % 60 || 0) ).slice(-2)}</span>
          </div>
        </div>
        <div className="w-1/4 flex justify-end items-center space-x-3 text-zinc-400 select-none">
          <button onClick={toggleMute} className="hover:text-white transition active:scale-95 text-base w-6 h-6 flex items-center justify-center">
            {volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : "🔊"}
          </button>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-20 sm:w-24 h-1 bg-zinc-800 accent-green-500 rounded-full appearance-none cursor-pointer hover:accent-green-400 transition" />
        </div>
      </footer>
    </div>
  );
}