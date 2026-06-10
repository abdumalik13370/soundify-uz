"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Список популярных треков из TikTok
const TRACKS_DATA = [
  { 
    id: 1, 
    title: "Can't Get you out of my head", 
    artist: "00", 
    src: "/music/Can't Get you out of my head.mp3", 
    cover: "data:image/webp;base64,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" 
  },
  { 
    id: 2, 
    title: "Can't Tell Me Nothing", 
    artist: "00", 
    src: "/music/Can't Tell Me Nothing.mp3", 
    cover: "data:image/webp;base64,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" 
  },
  { 
    id: 3, 
    title: "Los Primos Durango", 
    artist: "00", 
    src: "/music/Los Primos Durango.mp3", 
    cover: "data:image/webp;base64,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" 
  },
  { 
    id: 4, 
    title: "обнял поцеловал", 
    artist: "00", 
    src: "/music/обнял поцеловал.mp3", 
    cover: "https://i.ytimg.com/vi/EBsEeiVUFuY/maxresdefault.jpg" 
  },
];

function TelegramBanner() {
  return (
    <div className="max-w-2xl bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group shadow-xl transition-all duration-300 hover:border-blue-500/30">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
      
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 z-10">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 w-max inline-block">
            📢 Наш канал
          </span>
          <h3 className="text-base md:text-lg font-extrabold text-white tracking-wide">
            Будьте в курсе новинок сайта!
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
            В нашем Telegram-канале мы публикуем трендовые треки, эксклюзивные премьеры и все обновления нашей платформы.
          </p>
        </div>

        <a 
          href="https://t.me/+dQVBwFFhUIMxNDJi" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-[0_4px_15px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Подписаться →
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [volume, setVolume] = useState(0.8); 
  const [prevVolume, setPrevVolume] = useState(0.8); 
  
  const [profileName, setProfileName] = useState("Мой профиль");
  const [isVerified, setIsVerified] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = currentTrackIndex !== null ? TRACKS_DATA[currentTrackIndex] : null;

  const notifyDownload = async (trackTitle: string) => {
    try {
      await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `🎧 *Новое скачивание!*\n\n🎵 *Трек:* ${trackTitle}\n👤 *Пользователь:* ${profileName}` 
        }),
      });
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem("profile_name");
    if (savedName && savedName.trim() !== "") {
      setProfileName(savedName);
    }
    
    const savedVerified = localStorage.getItem("profile_verified");
    const savedExpires = localStorage.getItem("profile_verified_expires");

    if (savedVerified === "true" && savedExpires) {
      if (Date.now() < parseInt(savedExpires)) {
        setIsVerified(true);
      } else {
        localStorage.removeItem("profile_verified");
        localStorage.removeItem("profile_verified_expires");
        setIsVerified(false);
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current || currentTrackIndex === null) return;
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
    if (audioRef.current && currentTrackIndex !== null) {
      audioRef.current.load();
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log("Ошибка воспроизведения:", e));
      }
    }
  }, [currentTrackIndex]);

  const nextTrack = () => {
    if (currentTrackIndex === null) return;
    setCurrentTrackIndex((prev) => (prev !== null ? (prev + 1) % TRACKS_DATA.length : 0));
  };

  const prevTrack = () => {
    if (currentTrackIndex === null) return;
    setCurrentTrackIndex((prev) => (prev !== null ? (prev - 1 + TRACKS_DATA.length) % TRACKS_DATA.length : 0));
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
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
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
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />

      <div className="flex flex-1 overflow-y-auto">
        <aside className="w-64 bg-zinc-950 p-6 hidden md:block border-r border-zinc-800 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="select-none">
              <h1 className="text-3xl font-black tracking-[0.1em] uppercase bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                TrendTik
              </h1>
            </div>

            <nav className="space-y-3">
              <Link href="/" className="text-white cursor-pointer font-medium transition flex items-center gap-2.5 bg-zinc-900 p-2.5 rounded-lg">
                <span>🔥</span> Тренды
              </Link>
              <Link href="/profile" className="text-zinc-400 hover:text-white cursor-pointer font-medium transition flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-zinc-900/50">
                <span>👤</span> Профиль
              </Link>
              <a 
                href="https://t.me/+dQVBwFFhUIMxNDJi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-white cursor-pointer font-semibold transition flex items-center gap-2.5 p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                <span>✈️</span> Наш канал
              </a>
            </nav>
          </div>
          
          <div className="text-[10px] text-zinc-600 text-center border-t border-zinc-900 pt-4">
            TrendTik © 2026
          </div>
        </aside>

        <main className="flex-1 bg-gradient-to-b from-zinc-900 to-black p-6 md:p-8 overflow-y-auto space-y-6">
          <header className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                TikTok Тренды <span className="animate-pulse">🔥</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">Самые популярные звуки, под которые снимают прямо сейчас</p>
            </div>
            
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
          
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5 max-w-2xl flex-1 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all duration-500"></div>
              
              <div className="w-20 h-20 rounded-full border-2 border-zinc-700 overflow-hidden bg-zinc-800 flex-shrink-0 shadow-lg relative group-hover:border-fuchsia-400 transition-colors duration-300">
                <img 
                  src="/public/photo/photo_2026-06-10_20-21-01" 
                  alt="Автор" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1.5 z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <h4 className="text-lg font-extrabold text-white tracking-wide">Abdumalik Shamsiyev </h4>
                    <svg className="w-4 h-4 text-sky-500 fill-current flex-shrink-0 drop-shadow-[0_0_10px_rgba(14,165,233,0.6)]" viewBox="0 0 24 24">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.358.277C14.771 2.535 13.488 1.5 12 1.5a4.24 4.24 0 0 0-3.414 1.787 3.865 3.865 0 0 0-1.358-.277c-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.358-.277C9.229 21.465 10.512 22.5 12 22.5c1.488 0 2.771-1.035 3.414-2.713.417.177.878.277 1.358.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.214 4.29l-3.52-3.57 1.373-1.39 2.147 2.18 5.17-5.25 1.373 1.39-6.543 6.64z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 font-medium px-2 py-0.5 rounded-full border border-zinc-700/50 w-max mx-auto sm:mx-0">20 лет</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-md">Я — создатель проекта TrendTik.</p>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-0.5">
                  <a href="#" className="flex items-center gap-1 bg-zinc-800/80 hover:bg-sky-600 hover:text-white text-zinc-300 text-[11px] font-semibold px-2.5 py-1.5 rounded-md transition duration-300 border border-zinc-700/50"><span>✈️</span> Telegram</a>
                  <a href="#" className="flex items-center gap-1 bg-zinc-800/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white text-zinc-300 text-[11px] font-semibold px-2.5 py-1.5 rounded-md transition duration-300 border border-zinc-700/50"><span>📸</span> Instagram</a>
                </div>
              </div>
            </div>

            <TelegramBanner />
          </div>

          <hr className="border-zinc-800/40" />

          <div className="pb-24">
            <h3 className="text-lg font-bold mb-3.5 text-zinc-400">Популярное на этой неделе</h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {TRACKS_DATA.map((track, index) => {
                const isThisTrackPlaying = currentTrackIndex === index && isPlaying;
                return (
                  <div 
                    key={track.id} 
                    onClick={() => playTrack(index)} 
                    className={`p-2.5 rounded-xl transition cursor-pointer group border backdrop-blur-md flex flex-col justify-between transform active:scale-95 ${currentTrackIndex === index ? "bg-zinc-800/90 border-fuchsia-500/50 shadow-lg" : "bg-zinc-900/40 hover:bg-zinc-800/60 border-zinc-800/40"}`}
                  >
                    <div className="bg-zinc-800 w-full aspect-square rounded-lg mb-2 shadow-md overflow-hidden relative select-none">
                      <img 
                        src={track.cover} 
                        alt={track.title} 
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button className="bg-fuchsia-500 text-white p-2 rounded-full shadow-lg hover:scale-105 transition text-xs font-bold w-8 h-8 flex items-center justify-center">
                          {isThisTrackPlaying ? "⏸" : "▶"}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-1 px-0.5 w-full mt-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-fuchsia-400 transition duration-200 break-words whitespace-normal">
                          {track.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 break-words whitespace-normal">
                          {track.artist}
                        </p>
                      </div>

                      <a
                        href={track.src}
                        download={`${track.artist} - ${track.title}.mp3`}
                        onClick={(e) => {
                          e.stopPropagation();
                          notifyDownload(track.title);
                        }}
                        className="w-7 h-7 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md flex items-center justify-center text-xs border border-zinc-700/50 transition active:scale-95 flex-shrink-0"
                        title="Скачать"
                      >
                        ⬇️
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>

      {currentTrackIndex !== null && currentTrack && (
        <footer className="h-24 bg-zinc-950 border-t border-zinc-800 px-4 flex items-center justify-between z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center space-x-4 w-1/4">
            <div className="w-14 h-14 bg-zinc-800 rounded overflow-hidden shadow-md border border-zinc-700 flex-shrink-0">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <h4 className="text-sm font-medium truncate text-fuchsia-400">{currentTrack.title}</h4>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
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
                <div className="bg-fuchsia-500 h-full transition-all duration-100" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}></div>
              </div>
              <span>{Math.floor(duration / 60) || 0}:{( "0" + Math.floor(duration % 60 || 0) ).slice(-2)}</span>
            </div>
          </div>

          <div className="w-1/4 flex justify-end items-center space-x-3 text-zinc-400 select-none">
            <button 
              onClick={toggleMute} 
              className="hover:text-white transition active:scale-95 text-base w-6 h-6 flex items-center justify-center"
              title={volume === 0 ? "Включить звук" : "Выключить звук"}
            >
              {volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : "🔊"}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 sm:w-24 h-1 bg-zinc-800 accent-fuchsia-500 rounded-full appearance-none cursor-pointer hover:accent-fuchsia-400 transition"
            />
          </div>
        </footer>
      )}
    </div>
  );
}