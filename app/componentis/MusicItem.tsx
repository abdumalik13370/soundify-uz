"use client";

export default function MusicItem({ track }: { track: { id: number; title: string; artist: string; url: string } }) {

  // Telegramga xabar yuborish funksiyasi
  const notifyDownload = async (trackTitle: string) => {
    try {
      const userName = localStorage.getItem("profile_name") || "Mehmon";
      
      await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `🎧 *Yangi yuklama!*\n\n🎵 *Musiqa:* ${trackTitle}\n👤 *Foydalanuvchi:* ${userName}` 
        }),
      });
    } catch (error) {
      console.error("Telegramga xabar yuborishda xatolik:", error);
    }
  };

  const handleDownload = () => {
    // 1. Musiqani yuklab olish uchun havola ochish
    const link = document.createElement("a");
    link.href = track.url;
    link.download = `${track.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Telegramga xabar jo'natish
    notifyDownload(track.title);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-lg border border-zinc-800">
      <div>
        <h3 className="text-white font-bold">{track.title}</h3>
        <p className="text-zinc-400 text-sm">{track.artist}</p>
      </div>
      <button 
        onClick={handleDownload}
        className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg font-bold text-sm transition"
      >
        Yuklash ⬇️
      </button>
    </div>
  );
}