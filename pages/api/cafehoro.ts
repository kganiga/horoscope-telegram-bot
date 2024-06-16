import { NextApiRequest, NextApiResponse } from "next";
import { Telegraf, Context, session, Scenes } from "telegraf";
import { Markup } from "telegraf";
import axios from "axios";
import getRawBody from "raw-body";
import { parse } from "node-html-parser";

// Define the session data interface
interface SessionData {
  zodiac?: ZodiacSign;
}

// Define the zodiac sign type
type ZodiacSign = keyof typeof zodiacs;

// Define the bot context including session data
interface BotContext extends Context {
  session: SessionData;
}

// Zodiacs and URLs
const zodiacs = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpio",
  sagittarius: "Sagittarius",
  capricorn: "Capricorn",
  aquarius: "Aquarius",
  pisces: "Pisces",
} as const;

const horoscopeUrls = {
  today: "https://cafeastrology.com/{sign}dailyhoroscope.html",
  tomorrow: "https://cafeastrology.com/{sign}dailyhoroscopetom.html",
  dayAfterTomorrow:
    "https://cafeastrology.com/{sign}-daily-horoscope-day-after-tomorrow.html",
};

// Apply session middleware and ensure it is correctly typed
const bot = new Telegraf<BotContext>(process.env.TELE_BOT_TOKEN as string);
bot.use(session({ defaultSession: () => ({}) }));

bot.start((ctx) => ctx.reply("Welcome! Please select your zodiac sign."));

Object.keys(zodiacs).forEach((zodiac) => {
  bot.command(zodiac, (ctx) => {
    // Ensure ctx.session is initialized
    ctx.session.zodiac = zodiac as ZodiacSign;
    ctx.reply(
      `You selected ${zodiacs[zodiac as ZodiacSign]}. Please choose the day:`,
      Markup.inlineKeyboard([
        Markup.button.callback("Today", "today"),
        Markup.button.callback("Tomorrow", "tomorrow"),
        Markup.button.callback("Day after tomorrow", "dayAfterTomorrow"),
      ])
    );
  });
});

bot.action(["today", "tomorrow", "dayAfterTomorrow"], async (ctx) => {
  const dayKey = ctx.match[0] as keyof typeof horoscopeUrls;
  const { zodiac } = ctx.session;

  if (!zodiac) {
    ctx.reply("Please select your zodiac sign first.");
    return;
  }

  const urlTemplate = horoscopeUrls[dayKey];
  const url = urlTemplate.replace("{sign}", zodiac);

  try {
    const response = await axios.get(url);
    const html = response.data;
    const root = parse(html);
    const entryContent = root.querySelector(".entry-content");

    if (!entryContent) {
      throw new Error("Failed to extract horoscope content.");
    }

    const paragraphs = entryContent.querySelectorAll("p");
    const formattedText = paragraphs
      .slice(0, 5)
      .map((p) => p.text.trim())
      .join("\n\n");

    await ctx.reply(formattedText);
  } catch (error: unknown) {
    // Use 'error: unknown' to handle unknown type
    if (error instanceof Error) {
      console.error("Error fetching or processing URL:", error);
      ctx.reply("Error fetching or processing URL: " + error.message);
    } else {
      console.error("Unknown error:", error);
      ctx.reply("Unknown error occurred.");
    }
  } finally {
    // Reset session
    delete ctx.session.zodiac;
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const buffer = await getRawBody(req);
      const update = JSON.parse(buffer.toString("utf8"));
      await bot.handleUpdate(update, res);
    } catch (error: unknown) {
      // Use 'error: unknown' to handle unknown type
      console.error("Error handling update:", error);
      res
        .status(500)
        .send(
          "Error handling update: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
    }
  } else {
    res.status(200).send("This endpoint is for handling Telegram updates.");
  }
};

export default handler;
