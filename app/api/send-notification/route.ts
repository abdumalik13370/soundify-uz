import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // 🔴 O'ZINGIZNING MA'LUMOTLARINGIZNI YOZING
    const BOT_TOKEN = "";
    const CHAT_ID = "5729075567";

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    // Telegram API-ga so'rov yuborish
    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown", // Matnni chiroyli formatlash uchun
      }),
    });

    if (!res.ok) {
      throw new Error("Telegramga xabar ketmadi");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Xatolik yuz berdi" }, { status: 500 });
  }
}