import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Maxfiy kalitlarni .env fayldan xavfsiz o'qib olish
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Agar kalitlar topilmasa xatolik qaytarish
    if (!botToken || !chatId) {
      console.error("Telegram kalitlari topilmadi (.env faylni tekshiring)");
      return NextResponse.json({ error: "Server konfiguratsiyasida xatolik" }, { status: 500 });
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API xatoligi:", errorData);
      return NextResponse.json({ error: "Telegramga xabar yuborilmadi" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Xatolik:", error);
    return NextResponse.json({ error: "Ichki server xatoligi" }, { status: 500 });
  }
}