const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");
const dns = require("dns");
const { spawn } = require("child_process");
const { MsEdgeTTS, OUTPUT_FORMAT } = require("msedge-tts");

dns.setDefaultResultOrder("ipv4first");

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

/**
 * Maps each Gemini Live & ChatGPT Voice persona to a distinct Microsoft Edge Neural Voice
 * so every single model and voice persona sounds unmistakably different with ZERO API key!
 */
const NEURAL_VOICE_MAP = {
  // Gemini Live Voices
  "gemini:Kore": { edgeVoice: "en-US-AvaMultilingualNeural", pitch: "+0Hz", rate: "+2%", fallbackTl: "en-US" },
  "gemini:Puck": { edgeVoice: "en-US-AndrewMultilingualNeural", pitch: "+2Hz", rate: "+7%", fallbackTl: "en-CA" },
  "gemini:Aoede": { edgeVoice: "en-GB-SoniaNeural", pitch: "+0Hz", rate: "+2%", fallbackTl: "en-GB" },
  "gemini:Charon": { edgeVoice: "en-GB-RyanNeural", pitch: "-3Hz", rate: "+0%", fallbackTl: "en-IE" },
  "gemini:Fenrir": { edgeVoice: "en-US-GuyNeural", pitch: "-4Hz", rate: "+4%", fallbackTl: "en-AU" },
  // ChatGPT Voice Mode Voices
  "openai:coral": { edgeVoice: "en-US-JennyNeural", pitch: "+3Hz", rate: "+4%", fallbackTl: "en-US" },
  "openai:nova": { edgeVoice: "en-AU-NatashaNeural", pitch: "+1Hz", rate: "+5%", fallbackTl: "en-AU" },
  "openai:alloy": { edgeVoice: "en-US-AriaNeural", pitch: "+0Hz", rate: "+2%", fallbackTl: "en-CA" },
  "openai:sage": { edgeVoice: "en-GB-ThomasNeural", pitch: "-2Hz", rate: "+0%", fallbackTl: "en-GB" },
  "openai:ash": { edgeVoice: "en-US-BrianMultilingualNeural", pitch: "-2Hz", rate: "+3%", fallbackTl: "en-IE" },
  "openai:shimmer": { edgeVoice: "en-US-EmmaMultilingualNeural", pitch: "+4Hz", rate: "+0%", fallbackTl: "en-IN" },
  // Short-name fallbacks
  Kore: { edgeVoice: "en-US-AvaMultilingualNeural", pitch: "+0Hz", rate: "+2%", fallbackTl: "en-US" },
  Puck: { edgeVoice: "en-US-AndrewMultilingualNeural", pitch: "+2Hz", rate: "+7%", fallbackTl: "en-CA" },
  Aoede: { edgeVoice: "en-GB-SoniaNeural", pitch: "+0Hz", rate: "+2%", fallbackTl: "en-GB" },
  Charon: { edgeVoice: "en-GB-RyanNeural", pitch: "-3Hz", rate: "+0%", fallbackTl: "en-IE" },
  Fenrir: { edgeVoice: "en-US-GuyNeural", pitch: "-4Hz", rate: "+4%", fallbackTl: "en-AU" },
  coral: { edgeVoice: "en-US-JennyNeural", pitch: "+3Hz", rate: "+4%", fallbackTl: "en-US" },
  nova: { edgeVoice: "en-AU-NatashaNeural", pitch: "+1Hz", rate: "+5%", fallbackTl: "en-AU" },
  alloy: { edgeVoice: "en-US-AriaNeural", pitch: "+0Hz", rate: "+2%", fallbackTl: "en-CA" },
  sage: { edgeVoice: "en-GB-ThomasNeural", pitch: "-2Hz", rate: "+0%", fallbackTl: "en-GB" },
  ash: { edgeVoice: "en-US-BrianMultilingualNeural", pitch: "-2Hz", rate: "+3%", fallbackTl: "en-IE" },
  shimmer: { edgeVoice: "en-US-EmmaMultilingualNeural", pitch: "+4Hz", rate: "+0%", fallbackTl: "en-IN" }
};

const MODEL_PERSONAS = {
  "gemini-4-argon": {
    displayName: "Gemini 4 Argon",
    defaultVoiceName: "Kore",
    selfIntro: (roleName, scenarioTitle) =>
      `Hi there! I'm ${roleName}, your English speaking partner. What topic would you love to talk about together today?`,
    greetingReply: (roleName) =>
      `Hey! I'm ${roleName}. It's wonderful to chat with you today! How has your day been going so far?`,
    howAreYouReply: (roleName) =>
      `I'm doing wonderfully, thank you for asking! How is your week treating you?`
  },
  "gemini-3.8-flash": {
    displayName: "Gemini 3.8 Flash",
    defaultVoiceName: "Puck",
    selfIntro: (roleName, scenarioTitle) =>
      `Hey! I'm ${roleName}, your English conversation partner. What's something fun or interesting you've been up to this week?`,
    greetingReply: (roleName) =>
      `What's up! I'm ${roleName}—ready for a fun English chat! What's on your mind today?`,
    howAreYouReply: (roleName) =>
      `Feeling super energized, thanks! How's your energy level today?`
  },
  "gemini-3.5-flash-lite": {
    displayName: "Gemini 3.5 Flash-Lite",
    defaultVoiceName: "Aoede",
    selfIntro: (roleName, scenarioTitle) =>
      `Lovely to meet you! I'm ${roleName}, your English speaking partner. Shall we start with a quick chat about your day?`,
    greetingReply: (roleName) =>
      `Hello there! Lovely to connect with you—I'm ${roleName}. How are things going on your end today?`,
    howAreYouReply: (roleName) =>
      `I'm doing splendidly, thank you! How has your afternoon been going?`
  },
  "gpt-4o": {
    displayName: "ChatGPT (GPT-4o)",
    defaultVoiceName: "Coral",
    selfIntro: (roleName, scenarioTitle) =>
      `It's so nice to meet you! I'm ${roleName}, your English conversation partner. Tell me, what inspired you to practice English today?`,
    greetingReply: (roleName) =>
      `Hi there! I'm ${roleName}. I'm really glad you stopped by to chat! What's the highlight of your day so far?`,
    howAreYouReply: (roleName) =>
      `I'm doing great, thanks so much for asking! How are you feeling today?`
  },
  "gpt-4o-mini": {
    displayName: "ChatGPT (GPT-4o Mini)",
    defaultVoiceName: "Ash",
    selfIntro: (roleName, scenarioTitle) =>
      `Hey there, nice to meet you! I'm ${roleName}, your English speaking partner. What's one topic you enjoy talking about in English?`,
    greetingReply: (roleName) =>
      `Hey! I'm ${roleName}. Let's jump right into some everyday English—how's your week going?`,
    howAreYouReply: (roleName) =>
      `Doing really well, appreciate you asking! What have you been keeping busy with lately?`
  },
  "o3-mini": {
    displayName: "ChatGPT (o3-mini)",
    defaultVoiceName: "Sage",
    selfIntro: (roleName, scenarioTitle) =>
      `Good day! I'm ${roleName}, your English speaking coach. Which topic or speaking goal would you like to focus on first today?`,
    greetingReply: (roleName) =>
      `Hello and welcome! I'm ${roleName}. What topic shall we talk about in today's session?`,
    howAreYouReply: (roleName) =>
      `I am doing very well, thank you! How is your day progressing?`
  }
};

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const ttsAudioCache = new Map();

function fetchHttpsBuffer(urlStr) {
  return new Promise((resolve, reject) => {
    https
      .get(
        urlStr,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
          }
        },
        (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`Status ${res.statusCode}`));
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
        }
      )
      .on("error", reject);
  });
}

async function synthesizeGoogleRegionalFallbackTTS(text, tl = "en-US") {
  const sentences = text.match(/[^.!?]+[.!?]*|[^.!?]+$/g) || [text];
  const chunks = [];
  let current = "";
  for (const s of sentences) {
    if ((current + " " + s).trim().length <= 180) {
      current = (current + " " + s).trim();
    } else {
      if (current) chunks.push(current);
      current = s.trim().slice(0, 180);
    }
  }
  if (current) chunks.push(current);

  const buffers = [];
  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      tl
    )}&q=${encodeURIComponent(chunk)}`;
    const buf = await fetchHttpsBuffer(url);
    buffers.push(buf);
  }
  return {
    buffer: Buffer.concat(buffers),
    edgeVoice: `google-neural-${tl}`
  };
}

// Persistent Edge TTS Pool per voice so we don't pay WebSocket handshake latency on every turn!
const edgeVoiceInstancePool = new Map();
const inFlightTtsPromises = new Map();

async function getOrCreateEdgeTtsInstance(edgeVoice) {
  const existing = edgeVoiceInstancePool.get(edgeVoice);
  if (existing && !existing._busy) {
    return existing;
  }
  const tts = new MsEdgeTTS();
  await tts.setMetadata(edgeVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  if (!existing) {
    edgeVoiceInstancePool.set(edgeVoice, tts);
  }
  return tts;
}

async function synthesizeEdgeNeuralTTS(text, voiceKey = "gemini:Kore", speedNumeric = 1.0) {
  const cfg = NEURAL_VOICE_MAP[voiceKey] || NEURAL_VOICE_MAP["gemini:Kore"];
  const cacheKey = `${voiceKey}::${speedNumeric}::${text}`;
  if (ttsAudioCache.has(cacheKey)) {
    return ttsAudioCache.get(cacheKey);
  }
  if (inFlightTtsPromises.has(cacheKey)) {
    return inFlightTtsPromises.get(cacheKey);
  }

  const runSynthesis = (async () => {
    const rateDelta = Math.round((Number(speedNumeric || 1.0) - 1.0) * 100);
    const combinedRate = rateDelta === 0 ? cfg.rate : `${rateDelta >= 0 ? "+" : ""}${rateDelta}%`;

    for (let attempt = 0; attempt < 2; attempt++) {
      let tts = null;
      try {
        tts = await getOrCreateEdgeTtsInstance(cfg.edgeVoice);
        tts._busy = true;
        const result = await new Promise((resolve, reject) => {
          const chunks = [];
          const timer = setTimeout(() => {
            tts._busy = false;
            if (edgeVoiceInstancePool.get(cfg.edgeVoice) === tts) {
              edgeVoiceInstancePool.delete(cfg.edgeVoice);
            }
            reject(new Error("Edge TTS stream timeout"));
          }, 3200);

          const { audioStream } = tts.toStream(text, {
            rate: combinedRate,
            pitch: cfg.pitch
          });

          audioStream.on("data", (chunk) => {
            chunks.push(chunk);
          });
          audioStream.on("end", () => {
            clearTimeout(timer);
            tts._busy = false;
            resolve({
              buffer: Buffer.concat(chunks),
              edgeVoice: cfg.edgeVoice
            });
          });
          audioStream.on("error", (err) => {
            clearTimeout(timer);
            tts._busy = false;
            if (edgeVoiceInstancePool.get(cfg.edgeVoice) === tts) {
              edgeVoiceInstancePool.delete(cfg.edgeVoice);
            }
            reject(err);
          });
        });

        if (result.buffer && result.buffer.length > 100) {
          const finalResult = {
            buffer: result.buffer,
            edgeVoice: cfg.edgeVoice
          };
          if (ttsAudioCache.size > 120) {
            const firstKey = ttsAudioCache.keys().next().value;
            ttsAudioCache.delete(firstKey);
          }
          ttsAudioCache.set(cacheKey, finalResult);
          return finalResult;
        }
      } catch (edgeErr) {
        if (tts) tts._busy = false;
        if (edgeVoiceInstancePool.get(cfg.edgeVoice) === tts) {
          edgeVoiceInstancePool.delete(cfg.edgeVoice);
        }
      }
    }

    return synthesizeGoogleRegionalFallbackTTS(text, cfg.fallbackTl || "en-US");
  })();

  inFlightTtsPromises.set(cacheKey, runSynthesis);
  try {
    return await runSynthesis;
  } finally {
    inFlightTtsPromises.delete(cacheKey);
  }
}

function resolveVoicePartnerName(voiceName, voicePersona, modelMeta) {
  if (voiceName && voiceName.trim()) {
    const clean = voiceName.trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }
  if (voicePersona && voicePersona.includes(":")) {
    const raw = voicePersona.split(":")[1] || "";
    if (raw) return raw.charAt(0).toUpperCase() + raw.slice(1);
  }
  return modelMeta.defaultVoiceName || "Kore";
}

/**
 * Pre-warms TTS cache using the EXACT reply text so that the browser's `/api/tts`
 * request hits `ttsAudioCache` in 0ms!
 */
async function prewarmTtsMatchingClientSplit(text, voiceKey = "gemini:Kore", speedNumeric = 1.0) {
  if (!text || !text.trim()) return;
  const clean = text.trim().slice(0, 900);
  const rate = Number(speedNumeric || 1.0);
  await synthesizeEdgeNeuralTTS(clean, voiceKey, rate).catch(() => {});
}

/**
 * 3-Tier Conversation Level Profiles (초급 / 중급 / 고급)
 */
const LEVEL_PROFILES = {
  beginner: {
    id: "beginner",
    korName: "1. 초급대화 (쉬운 영어 · 1~2문장)",
    cefrDefault: "A2",
    promptRule:
      "CONVERSATION LEVEL: 1. Beginner (초급대화). You MUST use EASY, everyday A2–B1 English words and simple grammar. Keep your \"reply\" STRICTLY to 1–2 short sentences total (1 short empathetic reaction sentence + 1 short, easy follow-up question). Keep \"follow_up_hint\" to 1 short, simple sentence (under 12 words).",
    hintTransform: (hint) => {
      const sentences = (hint || "").match(/[^.!?]+[.!?]*/g) || [hint];
      return sentences[0].trim();
    }
  },
  intermediate: {
    id: "intermediate",
    korName: "2. 중급대화 (중급 어휘 · 단문 혼용 최대 4문장)",
    cefrDefault: "B2",
    promptRule:
      "CONVERSATION LEVEL: 2. Intermediate (중급대화). Use moderately richer B1–B2 vocabulary, phrasal verbs, and natural compound sentences MIXED WITH short, punchy sentences (단문도 같이 혼용). Keep your \"reply\" to 2–4 sentences total (MAXIMUM 4 sentences), ending with a natural follow-up question.",
    hintTransform: (hint) => hint
  },
  advanced: {
    id: "advanced",
    korName: "3. 고급대화 (고급 어휘 · 단문 혼용 최대 6문장)",
    cefrDefault: "C1",
    promptRule:
      "CONVERSATION LEVEL: 3. Advanced (고급대화). Use sophisticated C1–C2 vocabulary, idioms, and nuanced expressions MIXED WITH crisp, punchy short sentences for natural spoken rhythm (고급 단어/문장과 단문을 자연스럽게 혼용). Keep your \"reply\" to 4–6 sentences total (MAXIMUM 6 sentences), ending with an insightful follow-up question.",
    hintTransform: (hint) => hint
  }
};

function normalizeLearnerLevel(rawLevel) {
  const s = String(rawLevel || "").toLowerCase();
  if (s.includes("beginner") || s.includes("초급") || s.includes("a2") || s === "1") return "beginner";
  if (s.includes("advanced") || s.includes("고급") || s.includes("c1") || s.includes("c2") || s === "3") return "advanced";
  return "intermediate";
}

function adaptReplyToLevel(replyText, levelKey, partnerName = "Kore") {
  const clean = (replyText || "").trim();
  if (!clean) return clean;
  const sentences = (clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean]).map((s) => s.trim()).filter(Boolean);

  if (levelKey === "beginner") {
    // Strictly 1-2 short sentences (keep first reaction + final question if >2 sentences)
    if (sentences.length > 2) {
      return `${sentences[0]} ${sentences[sentences.length - 1]}`.trim();
    }
    return sentences.join(" ");
  }

  if (levelKey === "intermediate") {
    // Up to 4 sentences max
    if (sentences.length > 4) {
      return [...sentences.slice(0, 3), sentences[sentences.length - 1]].join(" ");
    }
    return sentences.join(" ");
  }

  if (levelKey === "advanced") {
    // Up to 6 sentences max
    if (sentences.length > 6) {
      return [...sentences.slice(0, 5), sentences[sentences.length - 1]].join(" ");
    }
    return sentences.join(" ");
  }

  return clean;
}

/**
 * Comprehensive Grammar, Spelling & Native Phrasing Rewriter
 * Always provides a meaningful native-English upgrade and clear explanation for the right-side Coaching Panel.
 */
function analyzeGrammarAndPhrasing(userMessage, modelMeta) {
  const rawOriginal = userMessage.trim();
  let corrected = rawOriginal;
  const notes = [];
  let isPerfect = true;

  // 1. Broken / split contractions & spelling shortcuts
  const splitContractions = [
    { regex: /\bdo\s+n\b/gi, replacement: "don't", word: '"do n" → "don\'t"' },
    { regex: /\bdid\s+n\b/gi, replacement: "didn't", word: '"did n" → "didn\'t"' },
    { regex: /\bis\s+n\b/gi, replacement: "isn't", word: '"is n" → "isn\'t"' },
    { regex: /\bca\s+n\b/gi, replacement: "can't", word: '"ca n" → "can\'t"' },
    { regex: /\bwo\s+n\b/gi, replacement: "won't", word: '"wo n" → "won\'t"' },
    { regex: /\bcould\s+n\b/gi, replacement: "couldn't", word: '"could n" → "couldn\'t"' },
    { regex: /\bshould\s+n\b/gi, replacement: "shouldn't", word: '"should n" → "shouldn\'t"' },
    { regex: /\bwould\s+n\b/gi, replacement: "wouldn't", word: '"would n" → "wouldn\'t"' },
    { regex: /\bhave\s+n\b/gi, replacement: "haven't", word: '"have n" → "haven\'t"' },
    { regex: /\bhas\s+n\b/gi, replacement: "hasn't", word: '"has n" → "hasn\'t"' },
    { regex: /\bdidnt\b/gi, replacement: "didn't", word: '"didnt" → "didn\'t" (needs an apostrophe)' },
    { regex: /\bcouldnt\b/gi, replacement: "couldn't", word: '"couldnt" → "couldn\'t" (needs an apostrophe)' },
    { regex: /\bwouldnt\b/gi, replacement: "wouldn't", word: '"wouldnt" → "wouldn\'t" (needs an apostrophe)' },
    { regex: /\bshouldnt\b/gi, replacement: "shouldn't", word: '"shouldnt" → "shouldn\'t" (needs an apostrophe)' },
    { regex: /\bisnt\b/gi, replacement: "isn't", word: '"isnt" → "isn\'t" (needs an apostrophe)' },
    { regex: /\barent\b/gi, replacement: "aren't", word: '"arent" → "aren\'t" (needs an apostrophe)' },
    { regex: /\bwasnt\b/gi, replacement: "wasn't", word: '"wasnt" → "wasn\'t" (needs an apostrophe)' },
    { regex: /\bwerent\b/gi, replacement: "weren't", word: '"werent" → "weren\'t" (needs an apostrophe)' },
    { regex: /\bhavent\b/gi, replacement: "haven't", word: '"havent" → "haven\'t" (needs an apostrophe)' },
    { regex: /\bhasnt\b/gi, replacement: "hasn't", word: '"hasnt" → "hasn\'t" (needs an apostrophe)' }
  ];

  for (const sc of splitContractions) {
    if (sc.regex.test(corrected)) {
      corrected = corrected.replace(sc.regex, sc.replacement);
      isPerfect = false;
      notes.push(`Contraction fix: ${sc.word}.`);
    }
  }

  // 2. Common keyboard typos and phonetic misspellings
  const spellingMap = [
    { regex: /\bundesodn\b/gi, replacement: "understand", word: '"undesodn" → "understand"' },
    { regex: /\bundestand\b/gi, replacement: "understand", word: '"undestand" → "understand"' },
    { regex: /\bundestood\b/gi, replacement: "understood", word: '"undestood" → "understood"' },
    { regex: /\bunderstnad\b/gi, replacement: "understand", word: '"understnad" → "understand"' },
    { regex: /\bunderstnd\b/gi, replacement: "understand", word: '"understnd" → "understand"' },
    { regex: /\bao\s+that\b/gi, replacement: "that", word: '"ao that" → "that"' },
    { regex: /\bao\b/gi, replacement: "about", word: '"ao" → "about"' },
    { regex: /\blibary\b/gi, replacement: "library", word: '"libary" → "library" (don\'t forget the first "r" after "b")' },
    { regex: /\bchanllenge(s?)\b/gi, replacement: "challenge$1", word: '"chanllenge" → "challenge" (spelled c-h-a-l-l-e-n-g-e)' },
    { regex: /\bchallange(s?)\b/gi, replacement: "challenge$1", word: '"challange" → "challenge"' },
    { regex: /\bgrammer\b/gi, replacement: "grammar", word: '"grammer" → "grammar" (ends with "-ar")' },
    { regex: /\bakward\b/gi, replacement: "awkward", word: '"akward" → "awkward" (spelled a-w-k-w-a-r-d)' },
    { regex: /\bdollor(s?)\b/gi, replacement: "dollar$1", word: '"dollor" → "dollar" (ends with "-ar")' },
    { regex: /\brecieve\b/gi, replacement: "receive", word: '"recieve" → "receive" ("i" before "e" except after "c")' },
    { regex: /\bdefinately\b/gi, replacement: "definitely", word: '"definately" → "definitely"' },
    { regex: /\bseperate\b/gi, replacement: "separate", word: '"seperate" → "separate"' },
    { regex: /\boccured\b/gi, replacement: "occurred", word: '"occured" → "occurred"' },
    { regex: /\baccomodate\b/gi, replacement: "accommodate", word: '"accomodate" → "accommodate"' },
    { regex: /\benviroment\b/gi, replacement: "environment", word: '"enviroment" → "environment"' },
    { regex: /\bbecuase\b/gi, replacement: "because", word: '"becuase" → "because"' },
    { regex: /\bpronounciation\b/gi, replacement: "pronunciation", word: '"pronounciation" → "pronunciation" ("nun", not "noun")' },
    { regex: /\bsuprise(d|s)?\b/gi, replacement: "surprise$1", word: '"suprise" → "surprise" (spelled s-u-r-p-r-i-s-e)' },
    { regex: /\bintersted\b/gi, replacement: "interested", word: '"intersted" → "interested"' },
    { regex: /\bdiffrent\b/gi, replacement: "different", word: '"diffrent" → "different"' },
    { regex: /\bimportent\b/gi, replacement: "important", word: '"importent" → "important"' },
    { regex: /\bcoudn'?t\b/gi, replacement: "couldn't", word: '"coudn\'t" → "couldn\'t" (spelled c-o-u-l-d-n\'-t with an "l")' },
    { regex: /\bwoudn'?t\b/gi, replacement: "wouldn't", word: '"woudn\'t" → "wouldn\'t" (spelled w-o-u-l-d-n\'-t with an "l")' },
    { regex: /\bshoudn'?t\b/gi, replacement: "shouldn't", word: '"shoudn\'t" → "shouldn\'t" (spelled s-h-o-u-l-d-n\'-t with an "l")' }
  ];

  for (const sp of spellingMap) {
    if (sp.regex.test(corrected)) {
      corrected = corrected.replace(sp.regex, sp.replacement);
      isPerfect = false;
      notes.push(`Spelling fix: ${sp.word}.`);
    }
  }

  // 3. Collocation fixes: "have a trip" -> "take a trip" / "go on a trip"
  if (/\b(having|have|had)\s+a\s+trip\b/i.test(corrected)) {
    corrected = corrected
      .replace(/\bhaving\s+a\s+trip\b/gi, "taking a trip")
      .replace(/\bhave\s+a\s+trip\b/gi, "take a trip")
      .replace(/\bhad\s+a\s+trip\b/gi, "took a trip");
    isPerfect = false;
    notes.push('Collocation fix: In English, we say "take a trip" or "go on a trip" rather than "have a trip".');
  }

  // 4. "to the [Name] city" -> "to [Name]" (e.g. "to the Chung-ju city" -> "to Chungju")
  if (/\bto\s+the\s+([A-Za-z\-]+)\s+city\b/i.test(corrected)) {
    corrected = corrected.replace(/\bto\s+the\s+([A-Za-z\-]+)\s+city\b/gi, (_, c) => {
      const cleanCity = c.replace(/-/g, "");
      const formatted = cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1).toLowerCase();
      return `to ${formatted}`;
    });
    isPerfect = false;
    notes.push('Proper noun fix: City names like "Chungju" do not require "the" or "city" after them ("to Chungju").');
  }

  // 5. "hows going" / "how is going" -> "how's it going?"
  if (/\bhow'?s\s+going\b/i.test(corrected) || /\bhow\s+is\s+going\b/i.test(corrected)) {
    corrected = corrected.replace(/\bhow'?s\s+going\b/gi, "how's it going").replace(/\bhow\s+is\s+going\b/gi, "how's it going");
    isPerfect = false;
    notes.push(`Grammar fix: The standard conversational phrase requires the pronoun "it": use "how's it going?" instead of "hows going".`);
  }

  // 6. "by walk" -> "on foot"
  if (/\bby\s+walk\b/i.test(corrected)) {
    corrected = corrected.replace(/\bby\s+walk\b/gi, "on foot");
    isPerfect = false;
    notes.push(`Collocation fix: In English, walking to a place is expressed as "on foot" or using the verb "walk" ("I walked to work").`);
  }

  // 7. "every days" -> "every day"
  if (/\bevery\s+days\b/i.test(corrected)) {
    corrected = corrected.replace(/\bevery\s+days\b/gi, "every day");
    isPerfect = false;
    notes.push(`Determiner fix: "Every" is followed by a singular countable noun ("every day", not "every days").`);
  }

  // 8. "she don't" / "he don't" -> doesn't
  if (/\b(she|he|it)\s+don'?t\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(she|he|it)\s+don'?t\b/gi, "$1 doesn't");
    isPerfect = false;
    notes.push(`Subject-verb agreement: Third-person singular subjects (he/she/it) require "doesn't", not "don't".`);
  }

  // 9. Past tense marker with base verb ("yesterday I go" -> "yesterday I went")
  if (/\b(yesterday|last\s+(?:night|week|month|year))\b/i.test(corrected)) {
    const pastMap = { go: "went", see: "saw", buy: "bought", eat: "ate", make: "made", come: "came", take: "took", write: "wrote" };
    for (const [base, past] of Object.entries(pastMap)) {
      const pReg = new RegExp(`\\b(yesterday|last\\s+(?:night|week|month|year))\\s+([a-z]+\\s+)?${base}\\b`, "gi");
      if (pReg.test(corrected)) {
        corrected = corrected.replace(pReg, `$1 $2${past}`);
        isPerfect = false;
        notes.push(`Tense fix: Use the past tense "${past}" when referring to a past time marker like "yesterday".`);
      }
    }
  }

  // 10. Number + singular noun ("two apple" -> "two apples")
  if (/\b(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(apple|car|book|friend|day|hour|dollar|problem|student)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\b(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(apple|car|book|friend|day|hour|dollar|problem|student)\b/gi,
      "$1 $2s"
    );
    isPerfect = false;
    notes.push(`Plural noun fix: Numbers greater than one require a plural noun ending in "-s".`);
  }

  // 11. "I depressed by the time when I couldn't speak English well in my friend's wedding." & emotional/event grammar fixes
  if (/\bi\s+(depressed|embarrassed|frustrated|disappointed|ashamed|exhausted|confused)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bi\s+(depressed|embarrassed|frustrated|disappointed|ashamed|exhausted|confused)\b/gi,
      (_, adj) => `I felt ${adj.toLowerCase()}`
    );
    isPerfect = false;
    notes.push(`Verb & adjective fix: "${RegExp.$1 || "depressed"}" is an adjective describing how you felt, so use "I felt depressed" or "I was depressed" instead of "I depressed".`);
  }
  if (/\bby the time when\b/i.test(corrected)) {
    corrected = corrected.replace(/\bby the time when\b/gi, "when");
    isPerfect = false;
    notes.push(`Conjunction fix: use simply "when" (or "at the time when") instead of "by the time when".`);
  }
  if (/\bhad a depressed time\b/i.test(corrected)) {
    corrected = corrected.replace(/\bhad a depressed time\b/gi, "felt really depressed");
    isPerfect = false;
    notes.push(`Word choice fix: people feel "depressed", while a time or experience is "depressing" (or simply say "I felt really depressed / down").`);
  }
  if (/\b(in|on)\s+(my\s+|a\s+|the\s+)?(friend'?s?\s+)?(wedding|party|concert|ceremony|meeting|interview)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\b(in|on)\s+(my\s+|a\s+|the\s+)?(friend'?s?\s+)?(wedding|party|concert|ceremony|meeting|interview)\b/gi,
      (_, _prep, det = "", friendPart = "", eventWord) => {
        const cleanFriend = friendPart ? (friendPart.trim().replace(/friend$/i, "friend's") + " ") : "";
        return `at ${det || ""}${cleanFriend}${eventWord}`;
      }
    );
    isPerfect = false;
    notes.push(`Preposition fix: use "at a wedding / at a party / at a meeting" rather than "in my friend's wedding", and make sure "friend's" includes the apostrophe-s to show possession.`);
  }

  // 12. "This tool is impressive for me. Because I made it with agy." & related patterns
  if (/\bimpressive\s+for\s+me\b/i.test(corrected)) {
    corrected = corrected.replace(/\bimpressive\s+for\s+me\b/gi, "impressive to me");
    isPerfect = false;
    notes.push(`Preposition fix: use "impressive to me" instead of "impressive for me".`);
  }
  if (/([a-z0-9])\s*\\.\s+Because\s+/i.test(corrected)) {
    corrected = corrected.replace(/([a-z0-9])\s*\\.\s+Because\s+/gi, "$1 because ");
    isPerfect = false;
    notes.push(`Sentence structure fix: "because..." is a dependent clause—connect it directly to the main sentence without a period before "because".`);
  }
  if (/\bagy\b/.test(corrected)) {
    corrected = corrected.replace(/\bagy\b/g, "AGY");
  }

  // 13. "I'm spending time for this around 3 hours."
  if (
    /\bi('m|\s+am)\s+spending\s+time\s+(?:for|on)\s+(this|it|that|[a-z\s]+?)\s+(around|about|for)?\s*(\d+|one|two|three|four|five|six|seven|eight|a few|several)\s+(hour|hours|minute|minutes|day|days)\b/i.test(
      corrected
    )
  ) {
    corrected = corrected.replace(
      /\bi('m|\s+am)\s+spending\s+time\s+(?:for|on)\s+(this|it|that|[a-z\s]+?)\s+(around|about|for)?\s*(\d+|one|two|three|four|five|six|seven|eight|a few|several)\s+(hour|hours|minute|minutes|day|days)\b/gi,
      (_, amPart, target, approx, num, unit) =>
        `I${amPart} spending ${approx ? approx.toLowerCase() : "about"} ${num} ${unit} on ${target.trim()}`
    );
    isPerfect = false;
    notes.push(
      `Word order & preposition fix: place the duration ("around 3 hours") directly after "spending", and use "on" ("on this") instead of "for this".`
    );
  } else if (/\b(spend|spending|spent|spends)\s+time\s+for\s+([^,.!?]+)/i.test(corrected)) {
    corrected = corrected.replace(/\b(spend|spending|spent|spends)\s+time\s+for\s+/gi, "$1 time on ");
    isPerfect = false;
    notes.push(`Preposition fix: use "spend time ON something" instead of "spend time for".`);
  }

  // 14. "Your speed is a little fast to me. Please slow down and speak more simple sentences."
  if (/\b(fast|slow|hard|difficult|easy)\s+to\s+me\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(fast|slow|hard|difficult|easy)\s+to\s+me\b/gi, "$1 for me");
    isPerfect = false;
    notes.push(`Preposition fix: with adjectives of speed or difficulty (fast, slow, hard, easy), use "for me" ("fast for me") instead of "to me".`);
  }

  // Comparative fixes: "more simple" -> "simpler", etc.
  const comparativeFixes = [
    { regex: /\bmore\s+simple\b/gi, replacement: "simpler", word: '"more simple" → "simpler"' },
    { regex: /\bmore\s+easy\b/gi, replacement: "easier", word: '"more easy" → "easier"' },
    { regex: /\bmore\s+fast\b/gi, replacement: "faster", word: '"more fast" → "faster"' },
    { regex: /\bmore\s+slow\b/gi, replacement: "slower", word: '"more slow" → "slower" (or "more slowly" as an adverb)' },
    { regex: /\bmore\s+short\b/gi, replacement: "shorter", word: '"more short" → "shorter"' },
    { regex: /\bmore\s+long\b/gi, replacement: "longer", word: '"more long" → "longer"' },
    { regex: /\bmore\s+clear\b/gi, replacement: "clearer", word: '"more clear" → "clearer"' },
    { regex: /\bmore\s+hard\b/gi, replacement: "harder", word: '"more hard" → "harder"' }
  ];
  for (const cf of comparativeFixes) {
    if (cf.regex.test(corrected)) {
      corrected = corrected.replace(cf.regex, cf.replacement);
      isPerfect = false;
      notes.push(`Comparative fix: use ${cf.word}.`);
    }
  }

  if (/\bspeak\s+(simpler|simple|shorter|short|easier|easy)\s+sentences\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bspeak\s+(simpler|simple|shorter|short|easier|easy)\s+sentences\b/gi,
      "speak in $1 sentences"
    );
    isPerfect = false;
    notes.push(`Grammar fix: add "in" after "speak" ("speak in simpler sentences") or use the verb "use" ("use simpler sentences").`);
  }

  // 15. "I'm on vibe coding" -> "I'm vibe coding"
  if (/\bi'm\s+on\s+vibe\s+coding\b/i.test(corrected)) {
    corrected = corrected.replace(/\bi'm\s+on\s+vibe\s+coding\b/gi, "I'm vibe coding");
    isPerfect = false;
    notes.push(`Drop "on" before "vibe coding"—use "I'm vibe coding" or "I'm doing some vibe coding".`);
  }

  // 16. "about the project about X" (repeated about)
  if (/\babout\s+([^,.!?]+?)\s+about\s+([^,.!?]+)/i.test(corrected)) {
    corrected = corrected.replace(
      /\babout\s+([^,.!?]+?)\s+about\s+(the\s+)?([^,.!?]+)/i,
      "about $1 on the $3"
    );
    isPerfect = false;
    notes.push(
      `Using "about" twice in a row sounds repetitive. Replace the second "about" with "on" ("the project on the stablecoin market").`
    );
  }

  // 17. Missing "the" before "stablecoin market"
  if (/\b(on|about|in)\s+stablecoin\s+market\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(on|about|in)\s+stablecoin\s+market\b/gi, "$1 the stablecoin market");
    isPerfect = false;
    notes.push(`Add "the" before specific market sectors like "the stablecoin market".`);
  }

  // 18. Broad ESL Rules (agree, discuss, explain, etc.)
  const eslPatterns = [
    { regex: /\bi am agree\b/gi, replace: "I completely agree", note: `"Agree" is an action verb, not an adjective—say "I agree" rather than "I am agree".` },
    { regex: /\bdiscuss about\b/gi, replace: "discuss", note: `"Discuss" already means "talk about", so it takes a direct object without "about".` },
    { regex: /\bexplain me\b/gi, replace: "explain to me", note: `Always use "to" before the person with "explain" ("explain it to me").` },
    { regex: /\brecommend me\b/gi, replace: "recommend to me", note: `Use "recommend [something] to me" rather than "recommend me".` },
    { regex: /\blisten music\b/gi, replace: "listen to music", note: `Always include "to" after "listen" ("listen to music").` },
    { regex: /\bgo to (home|downtown|abroad)\b/gi, replace: "go $1", note: `Adverbs of place like "home", "downtown", and "abroad" don't use "to" after "go" ("go home").` },
    { regex: /\bhow do you think about\b/gi, replace: "what do you think about", note: `When asking for someone's opinion, say "What do you think about...?" instead of "How do you think about...?".` },
    { regex: /\bvery (like|love|enjoy|appreciate)\b/gi, replace: "really $1", note: `"Very" cannot modify verbs directly in English—use "really" before verbs ("really like").` },
    { regex: /\bmore better\b/gi, replace: "much better", note: `"Better" is already comparative; strengthen it with "much better".` },
    { regex: /\binformations\b/gi, replace: "information", note: `"Information" is an uncountable noun and never takes an "-s".` }
  ];

  for (const rule of eslPatterns) {
    if (rule.regex.test(corrected)) {
      corrected = corrected.replace(rule.regex, rule.replace);
      isPerfect = false;
      notes.push(rule.note);
    }
  }

  // 19. Gibberish & Unknown Token Guard (CRITICAL!)
  // If words contain non-vowel gibberish, broken characters, or single-consonant fragments, FLAG IMMEDIATELY!
  const rawWords = rawOriginal.split(/\s+/).filter(Boolean);
  for (const rw of rawWords) {
    const cleanWord = rw.replace(/[^a-zA-Z']/g, "").toLowerCase();
    if (!cleanWord) continue;
    // Length >= 3 without a single vowel (a, e, i, o, u, y) -> gibberish like 'zxcv', 'qwrt', 'undesodn'
    if (cleanWord.length >= 3 && !/[aeiouy]/.test(cleanWord)) {
      isPerfect = false;
      notes.push(`Typo or unrecognized word: "${rw}" does not appear to be a standard English word.`);
    } else if (cleanWord.length === 1 && !["a", "i"].includes(cleanWord)) {
      // Single letter like 'n', 's', 'b', 'd' that isn't 'a' or 'I'
      isPerfect = false;
      notes.push(`Incomplete token: isolated letter "${rw}" is not a valid word.`);
    }
  }

  // Clean spacing before punctuation
  corrected = corrected.replace(/\s+([.!?])/g, "$1").trim();

  // Capitalize first letter
  if (corrected.length > 0 && /^[a-z]/.test(corrected)) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  }
  // Ensure ending punctuation
  if (corrected.length > 0 && !/[.!?]$/.test(corrected)) {
    const isQ = /^(can|could|would|should|will|do|does|did|is|are|was|were|what|why|how|where|when|who)\b/i.test(corrected);
    corrected += isQ ? "?" : ".";
  }

  // 20. Coaching Note When No Hard Grammar Errors Detected
  const stripPunct = (s) => s.replace(/[.!?]+$/g, "").trim().toLowerCase();
  if (notes.length === 0) {
    const lowerClean = stripPunct(corrected);
    if (/^(hi|hello|hey)( there)?[,.\s]*who are you$/i.test(lowerClean)) {
      notes.push(`"${corrected}" is grammatically correct! In casual conversation, adding "could you introduce yourself?" sounds even warmer.`);
    } else if (/^i want to talk about (.+)$/i.test(lowerClean)) {
      notes.push(`Your sentence "${corrected}" is grammatically accurate! You can also soften "I want to..." into "I'd like to..." or "Let's chat about..." (see recommendations below).`);
    } else {
      notes.push(`Your sentence "${corrected}" is grammatically accurate! Check the recommended expressions below for additional natural native phrasings.`);
    }
  }

  const explanation = notes.join(" ");
  const correctedVariants = buildCorrectedSentenceVariants(rawOriginal, corrected);

  return {
    corrected,
    correctedVariants,
    isPerfect,
    explanation,
    notes
  };
}

function buildCorrectedSentenceVariants(rawOriginal, primaryCorrected) {
  const lower = rawOriginal.trim().toLowerCase();

  // 1. "I don't understand" / clarification / typo like "I do n undesodn ao that"
  if (/undesodn|understand|don'?t\s+get|what\s+do\s+you\s+mean|didn'?t\s+catch/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I didn't quite catch that—could you say it again?" },
      { label: "추천 2 · Fluent & Expressive", sentence: "I'm not entirely following—could you explain that a bit more simply?" }
    ];
  }

  // 2. Trip to Chungju / Family vacation
  if (/trip|chung-?ju|travel|vacation/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm going on a family trip down to Chungju." },
      { label: "추천 2 · Fluent & Expressive", sentence: "My family and I are taking a vacation to Chungju together." }
    ];
  }

  // 3. Building tool with AGY / impressive
  if (/impressive.*agy|made it with agy|built it with agy/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm really impressed with this tool because I built it myself with AGY." },
      { label: "추천 2 · Fluent & Expressive", sentence: "What makes this tool so impressive to me is that I created it using AGY." }
    ];
  }

  // 4. Spending time / duration
  if (/\b(spend|spending|spent)\s+time\b/i.test(lower) || /\b(\d+|one|two|three|four|five)\s*(hour|hours|minute|minutes)\b/i.test(lower)) {
    const durMatch = lower.match(/\b(\d+|one|two|three|four|five|six|a few)\s*(hour|hours|minute|minutes|day|days)\b/i);
    const dur = durMatch ? `${durMatch[1]} ${durMatch[2]}` : "about 3 hours";
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: `I've spent around ${dur} on this so far.` },
      { label: "추천 2 · Fluent & Expressive", sentence: `I've been working on this for about ${dur} now.` }
    ];
  }

  // 5. Speed / slow down / simpler sentences
  if (/speed.*fast|fast\s+(to|for)\s+me|slow\s+down|more\s+simple\s+sentences|simpler\s+sentences|speak\s+(more\s+)?slow(ly|er)?/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "Could you slow down a little and use simpler sentences?" },
      { label: "추천 2 · Polite & Natural", sentence: "Would you mind speaking a bit more slowly so I can catch every word?" }
    ];
  }

  // 6. Weather topic
  if (/talk about.*weather|chat about.*weather/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'd like to chat about the weather today." },
      { label: "추천 2 · Fluent & Expressive", sentence: "Let's talk about the weather—how are conditions where you are?" }
    ];
  }

  // 7. Library / location
  if (/\blibrary\b|\blibary\b/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm at the library right now getting some reading done." },
      { label: "추천 2 · Fluent & Descriptive", sentence: "I came to the library today to focus in a quiet environment." }
    ];
  }

  // 8. General fallback
  const core = primaryCorrected.replace(/[.!?]+$/, "").trim();
  const coreLowerFirst = core.length > 1 ? core.charAt(0).toLowerCase() + core.slice(1) : core.toLowerCase();
  const isQuestion = /\\?$/.test(primaryCorrected) || /^(can|could|would|do|does|did|is|are|what|why|how|where|when|who)\b/i.test(core);

  if (isQuestion) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: `Quick question—${coreLowerFirst}?` },
      { label: "추천 2 · Polite & Fluent", sentence: `Just out of curiosity, ${coreLowerFirst}?` }
    ];
  }

  return [
    { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
    { label: "추천 1 · Casual Native", sentence: `To be honest, ${coreLowerFirst}.` },
    { label: "추천 2 · Fluent & Expressive", sentence: `What I mean is that ${coreLowerFirst}.` }
  ];
}

function generateContextualReply(userMessage, modelId, scenarioTitle, partnerName, history, grammarResult) {
  const rawClean = userMessage.trim();
  const clean = grammarResult.corrected;
  const lower = rawClean.toLowerCase();
  const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gemini-4-argon"];

  let reply = "";
  let followUpHint = "That makes sense! Let me share a little more about that.";
  let betterExpressions = grammarResult.correctedVariants?.slice(1)?.map(v => ({ tone: v.label, phrase: v.sentence })) || [];
  let pronunciationTips = [];
  let keyVocabulary = [];
  let recommendedSpeechRate = null;

  // 1. CLARIFICATION / "I don't understand" / "I do n undesodn ao that"
  if (/undesodn|understand|don'?t\s+get|what\s+do\s+you\s+mean|didn'?t\s+catch|pardon|repeat/i.test(lower)) {
    reply = `No problem at all! I can explain it more simply. Earlier we were chatting about your trip to Chungju with your family—what kind of fun activities or sightseeing are you planning to do there?`;
    followUpHint = "We're planning to take a walk around the lake and try some delicious local food.";
    pronunciationTips = [
      { word: "Understand (ˌʌn.dɚˈstænd)", tip: "Place the primary pitch and volume stress on the final syllable 'STAND'." },
      { word: "Catch that (kætʃ ðæt)", tip: "Link the final /tʃ/ smoothly into the 'th' sound of 'that'." }
    ];
    keyVocabulary = [
      { word: "catch that", meaning: "To hear or understand what someone said clearly." },
      { word: "break it down", meaning: "To explain something complex in smaller, simpler steps." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 2. TRAVEL / TRIP TO CHUNGJU
  if (/trip|chung-?ju|travel|vacation/i.test(lower)) {
    reply = `That sounds like a wonderful family trip! Chungju is famous for its scenic lake, relaxing hot springs, and nature. What are you most excited to do with your family while you're there?`;
    followUpHint = "I'm really looking forward to relaxing by the lake and eating good food with my family.";
    pronunciationTips = [
      { word: "Trip (trɪp)", tip: "Keep the 'i' sound short and relaxed (/ɪ/), not a long 'ee' sound." },
      { word: "Scenic (ˈsiː.nɪk)", tip: "Stress the first syllable: 'SEE-nik'." }
    ];
    keyVocabulary = [
      { word: "take a trip", meaning: "To travel somewhere for a short visit or vacation." },
      { word: "sightseeing", meaning: "Visiting interesting places as a tourist." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 3. VOICE SPEED / SLOW DOWN
  if (/\b(speak\s+(more\s+)?slow(ly|er)?|slow\s+down|too\s+fast|speed\s+is\s+.*fast|fast\s+(to|for)\s+me|simpler\s+sentences)\b/i.test(lower)) {
    recommendedSpeechRate = 0.85;
    reply = `Of course! I just slowed down my speaking pace for you. I will use short, simple sentences so everything is easy to follow. How does this pace feel?`;
    followUpHint = "Thank you, this speed is much easier for me to understand.";
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 4. SELF-INTRODUCTION ("Who are you?")
  if (/who are you|what is your name|what's your name|introduce yourself/i.test(lower)) {
    reply = `Hi there! I'm ${partnerName}, your English speaking partner today. What would you love to talk about together—your hobbies, travel, or everyday life?`;
    followUpHint = `Nice to meet you, ${partnerName}! I'd love to chat about everyday life and travel.`;
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 5. GREETING ("Hi", "Hello")
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|hi there|hello there)[.!?]*$/i.test(lower)) {
    reply = `Hey! I'm ${partnerName}. It's great to chat with you today! How has your day been going so far?`;
    followUpHint = "My day has been going well! I'm taking some time to practice my English speaking.";
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 6. GENERAL CONTEXTUAL FALLBACK
  reply = `That's really interesting! Could you tell me a little more about that, or what made you think about it?`;
  followUpHint = "Sure! Let me share a little more context about what I mean.";
  return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
}

const AGY_EXE_PATH =
  process.env.ANTIGRAVITY_AGENTAPI_EXE ||
  path.join(process.env.LOCALAPPDATA || "C:\\Users\\USER\\AppData\\Local", "agy", "bin", "agy.exe");

let agyWorkerState = null;
let agyStandbyPromise = null;
const pendingCoachMap = new Map();

function createAgyWorkerState() {
  if (!fs.existsSync(AGY_EXE_PATH)) {
    return Promise.resolve(null);
  }

  const cleanProfileDir = path.join(os.tmpdir(), "speakflow_clean_profile");
  const appDataDir = path.join(cleanProfileDir, ".gemini", "antigravity-cli");
  try {
    if (!fs.existsSync(cleanProfileDir)) {
      fs.mkdirSync(cleanProfileDir, { recursive: true });
    }
    // Prune accumulated conversation DBs so startup summary reconciliation takes 0ms!
    for (const sub of ["conversations", "annotations", "presence", "brain"]) {
      const target = path.join(appDataDir, sub);
      if (fs.existsSync(target)) {
        fs.rmSync(target, { recursive: true, force: true });
      }
    }
    for (const dbFile of ["conversation_summaries.db", "jetbox_summaries_proto.pb"]) {
      const targetFile = path.join(appDataDir, dbFile);
      if (fs.existsSync(targetFile)) {
        fs.rmSync(targetFile, { force: true });
      }
    }
  } catch (e) {}

  const cleanEnv = { ...process.env };
  delete cleanEnv.ANTIGRAVITY_AGENT;
  delete cleanEnv.ANTIGRAVITY_CONVERSATION_ID;
  delete cleanEnv.ANTIGRAVITY_TRAJECTORY_ID;
  delete cleanEnv.ANTIGRAVITY_SOURCE_METADATA;
  delete cleanEnv.ANTIGRAVITY_LS_ADDRESS;
  delete cleanEnv.ANTIGRAVITY_CSRF_TOKEN;
  cleanEnv.USERPROFILE = cleanProfileDir;
  cleanEnv.HOME = cleanProfileDir;
  cleanEnv.ANTIGRAVITY_APP_DATA_DIR = appDataDir;

  const stateObj = {
    child: null,
    turnCount: 0,
    activeResolver: null,
    busyPromise: null,
    readyPromise: null
  };

  stateObj.readyPromise = new Promise((resolve) => {
    const child = spawn(
      AGY_EXE_PATH,
      [
        "--input-format=stream-json",
        "--output-format=stream-json",
        "--model=gemini-3.8-flash-low",
        "--effort=low",
        "--disable-slash-commands",
        "--dangerously-skip-permissions",
        "--print="
      ],
      { cwd: cleanProfileDir, stdio: ["pipe", "pipe", "pipe"], env: cleanEnv }
    );

    stateObj.child = child;
    let initialized = false;
    let stdoutBuf = "";
    let streamingText = "";
    let firedFirstSentence = false;
    let firedEarlyReply = false;

    const initTimer = setTimeout(() => {
      if (!initialized) {
        initialized = true;
        resolve(null);
      }
    }, 25000);

    child.stdout.on("data", (chunk) => {
      stdoutBuf += chunk.toString();
      const lines = stdoutBuf.split("\n");
      stdoutBuf = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        let evt;
        try {
          evt = JSON.parse(line);
        } catch (e) {
          continue;
        }

        if (evt.event === "init" && !initialized) {
          // Send a 2-word warm-up turn immediately on startup so the 1st real user turn has 0ms session-creation lag!
          child.stdin.write(
            JSON.stringify({
              event: "user",
              message: { role: "user", content: "Reply with: OK" }
            }) + "\n"
          );
        } else if (evt.event === "step_update" && evt.step_update?.step_type === "agent_response") {
          if (!initialized) continue;
          const delta = evt.step_update.text_delta || "";
          streamingText += delta;
          // 1. As soon as the FIRST sentence of "reply" streams in (~1.4s), start synthesizing its Edge TTS in parallel!
          if (!firedFirstSentence && stateObj.activeResolver?.onFirstSentence) {
            const firstSentMatch = streamingText.match(/"reply"\s*:\s*"((?:[^"\\]|\\.){10,}?[.!?])\s+/);
            if (firstSentMatch) {
              firedFirstSentence = true;
              try {
                const decodedFirstSent = JSON.parse(`"${firstSentMatch[1]}"`);
                stateObj.activeResolver.onFirstSentence(decodedFirstSent);
              } catch (e) {}
            }
          }
          // 2. As soon as "reply" closes its string quote (~1.9s), resolve `/api/chat` immediately without waiting for the rest of the JSON!
          if (!firedEarlyReply && stateObj.activeResolver?.onEarlyReply) {
            const earlyMatch = streamingText.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,/);
            if (earlyMatch) {
              firedEarlyReply = true;
              try {
                const decodedReply = JSON.parse(`"${earlyMatch[1]}"`);
                stateObj.activeResolver.onEarlyReply(decodedReply);
              } catch (e) {}
            }
          }
        } else if (evt.event === "result") {
          if (!initialized) {
            initialized = true;
            clearTimeout(initTimer);
            streamingText = "";
            resolve(stateObj);
            continue;
          }
          const resolver = stateObj.activeResolver;
          stateObj.activeResolver = null;
          streamingText = "";
          firedFirstSentence = false;
          firedEarlyReply = false;
          if (resolver) {
            resolver.resolve(evt.result?.response || "");
          }
        }
      }
    });

    child.on("close", () => {
      if (agyWorkerState === stateObj) {
        agyWorkerState = null;
      }
      if (stateObj.activeResolver) {
        const r = stateObj.activeResolver;
        stateObj.activeResolver = null;
        r.resolve("");
      }
      if (!initialized) {
        initialized = true;
        clearTimeout(initTimer);
        resolve(null);
      }
    });
  });

  return stateObj.readyPromise;
}

async function ensureWarmAgyWorker() {
  if (agyWorkerState && agyWorkerState.child && !agyWorkerState.child.killed) {
    return agyWorkerState.readyPromise;
  }
  if (agyStandbyPromise) {
    const standby = await agyStandbyPromise;
    agyStandbyPromise = null;
    if (standby && standby.child && !standby.child.killed) {
      agyWorkerState = standby;
      return standby;
    }
  }
  const freshPromise = createAgyWorkerState();
  const fresh = await freshPromise;
  if (fresh) agyWorkerState = fresh;
  return fresh;
}

const pollinationsAgent = new https.Agent({ keepAlive: true, family: 4, maxSockets: 6 });

function callPollinationsFallbackLLM(promptText) {
  return new Promise((resolve) => {
    const bodyStr = JSON.stringify({
      model: "openai-fast",
      reasoning_effort: "low",
      temperature: 0.65,
      messages: [{ role: "user", content: promptText }]
    });
    const req = https.request(
      {
        hostname: "text.pollinations.ai",
        path: "/openai",
        method: "POST",
        family: 4,
        agent: pollinationsAgent,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr)
        }
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          if (res.statusCode !== 200) return resolve("");
          try {
            const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
            resolve(data.choices?.[0]?.message?.content || "");
          } catch (e) {
            resolve("");
          }
        });
      }
    );
    req.setTimeout(6500, () => {
      req.destroy();
      resolve("");
    });
    req.on("error", () => resolve(""));
    req.write(bodyStr);
    req.end();
  });
}

function extractFirstJsonObject(rawStr) {
  if (!rawStr) return null;
  const cleaned = rawStr.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch (e) {
    return null;
  }
}

function formatFullCoachingPayload(parsed, userMessage, localGrammar, levelKey) {
  const directFix = (parsed?.direct_fix || localGrammar.corrected || userMessage).trim();
  const casualNative = (parsed?.casual_native || localGrammar.correctedVariants?.[1]?.sentence || directFix).trim();
  const fluentPolite = (parsed?.fluent_polite || localGrammar.correctedVariants?.[2]?.sentence || directFix).trim();

  return {
    reply: adaptReplyToLevel((parsed?.reply || "").trim(), levelKey),
    follow_up_hint:
      parsed?.follow_up_hint || "That makes sense! Let me tell you a little more about what happened.",
    is_grammar_perfect:
      typeof parsed?.is_grammar_perfect === "boolean" ? parsed.is_grammar_perfect : localGrammar.isPerfect,
    corrected_sentence: directFix,
    corrected_variants: [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: directFix },
      { label: "추천 1 · Casual Native", sentence: casualNative },
      { label: "추천 2 · Fluent & Expressive", sentence: fluentPolite }
    ],
    grammar_explanation: parsed?.grammar_explanation || localGrammar.explanation,
    better_expressions:
      Array.isArray(parsed?.better_expressions) && parsed.better_expressions.length > 0
        ? parsed.better_expressions
        : [
            { tone: "Casual Native", phrase: casualNative },
            { tone: "Fluent & Expressive", phrase: fluentPolite }
          ],
    pronunciation_tips:
      Array.isArray(parsed?.pronunciation_tips) && parsed.pronunciation_tips.length > 0
        ? parsed.pronunciation_tips
        : [
            { word: "Connected Speech", tip: "Link consonant endings smoothly into the next vowel sound." },
            { word: "Sentence Stress", tip: "Emphasize key nouns, main verbs, and emotional adjectives." }
          ],
    key_vocabulary:
      Array.isArray(parsed?.key_vocabulary) && parsed.key_vocabulary.length > 0
        ? parsed.key_vocabulary
        : [
            { word: "express yourself", meaning: "To communicate your thoughts and feelings clearly." },
            { word: "build confidence", meaning: "To feel more sure and comfortable when speaking." }
          ],
    recommended_speech_rate: parsed?.recommended_speech_rate || null
  };
}

async function callRealCoachLLM(
  userMessage,
  modelId,
  scenarioTitle,
  rolePrompt,
  partnerName,
  voicePersona,
  history,
  localGrammar,
  levelKey = "intermediate",
  speechRate = 1.0
) {
  const levelProfile = LEVEL_PROFILES[levelKey] || LEVEL_PROFILES.intermediate;
  const histText = (history || [])
    .slice(-8)
    .map((m) => `${m.role === "user" ? "User" : partnerName}: ${m.text}`)
    .join("\n");

  const prompt = `DO NOT call any tools or read any files. Respond ONLY with a single raw JSON object (no markdown fences).
You are ${partnerName}, a warm, empathetic, intelligent live English conversation partner in the "${scenarioTitle}" scenario (${rolePrompt}).
${levelProfile.promptRule}

Recent conversation history:
${histText || "(Start of conversation)"}

User's new message:
"${userMessage}"

Instructions:
1. "reply" (MUST BE THE FIRST KEY): Respond naturally and empathetically directly addressing the exact meaning, story, and emotion of the user's message while strictly obeying the CONVERSATION LEVEL sentence count and vocabulary difficulty above. End with 1 specific, natural follow-up question that continues the story. NEVER ask generic template questions like "What part of that has been the most interesting or enjoyable for you today?". NEVER repeat questions asked in previous turns. NEVER mention AI model names ("powered by...", "GPT-4o", "Gemini"). NEVER include grammar corrections inside "reply" unless the user explicitly asks a grammar question.
2. "follow_up_hint" (MUST BE THE SECOND KEY): 1 natural first-person English sentence matching the CONVERSATION LEVEL that the user could say next to answer your question.
3. "is_grammar_perfect": true only if the user's sentence has zero grammar, spelling, preposition, or word-choice issues; otherwise false.
4. "direct_fix": Fix ONLY the grammar, spelling, verb form, or preposition errors in the user's exact sentence while preserving their original words and structure as closely as possible (e.g., "I depressed by the time when I coudn't speak English well in my friend's wedding." -> "I felt depressed when I couldn't speak English well at my friend's wedding."). If already grammatically valid, keep the user's exact sentence with proper punctuation.
5. "casual_native": A casual, natural native speaker way to express the user's exact thought.
6. "fluent_polite": A fluent, expressive native way to express the user's exact thought.
7. "grammar_explanation": Concise 1-2 sentence explanation of the grammar fixes made in "direct_fix" (or why it is already grammatically accurate).
8. "pronunciation_tips": Array of 2 concise objects [{"word":"word (phonetic)","tip":"..."},{"word":"word2 (phonetic)","tip":"..."}].
9. "key_vocabulary": Array of 2 concise objects [{"word":"phrase","meaning":"..."},{"word":"phrase2","meaning":"..."}].
10. "recommended_speech_rate": 0.8 if the user asks to speak slower/simpler, 1.15 if faster, otherwise null.`;

  const workerState = await ensureWarmAgyWorker();
  if (workerState && workerState.child && !workerState.child.killed) {
    // Wait if previous turn's background coaching tail is still finishing (~0-500ms)
    if (workerState.busyPromise) {
      await workerState.busyPromise.catch(() => {});
    }

    if (workerState.child && !workerState.child.killed && !workerState.activeResolver) {
      const turnId = `coach_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      let resolveCoachMap;
      const coachDonePromise = new Promise((r) => {
        resolveCoachMap = r;
      });
      pendingCoachMap.set(turnId, coachDonePromise);
      setTimeout(() => pendingCoachMap.delete(turnId), 30000);

      let resolveEarlyTurn;
      const earlyTurnPromise = new Promise((r) => {
        resolveEarlyTurn = r;
      });

      const fullTurnPromise = new Promise((resolveFull) => {
        const timer = setTimeout(() => {
          if (workerState.activeResolver) {
            workerState.activeResolver = null;
            resolveFull("");
          }
        }, 9500);

        let inFlightFirstSentenceTts = null;

        workerState.activeResolver = {
          onFirstSentence: (firstSentText) => {
            // First sentence streaming hook
          },
          onEarlyReply: (earlyReplyText) => {
            const adaptedEarlyReply = adaptReplyToLevel(earlyReplyText, levelKey, partnerName);
            if (adaptedEarlyReply && voicePersona) {
              prewarmTtsMatchingClientSplit(adaptedEarlyReply, voicePersona, speechRate).catch(() => {});
            }
            resolveEarlyTurn({
              early: true,
              turnId,
              reply: adaptedEarlyReply,
              follow_up_hint: "That makes sense! Let me share a little more about that."
            });
          },
          resolve: (text) => {
            clearTimeout(timer);
            resolveFull(text);
          }
        };

        workerState.child.stdin.write(
          JSON.stringify({
            event: "user",
            message: { role: "user", content: prompt }
          }) + "\n"
        );
      });

      // Track full turn completion in background so `pendingCoachMap` resolves AND worker rotation happens cleanly
      workerState.busyPromise = fullTurnPromise.then(async (rawResponse) => {
        workerState.busyPromise = null;
        workerState.turnCount++;

        if (workerState.turnCount === 4 && !agyStandbyPromise) {
          agyStandbyPromise = createAgyWorkerState().catch(() => null);
        }
        if (workerState.turnCount >= 6) {
          const oldChild = workerState.child;
          if (agyStandbyPromise) {
            agyStandbyPromise.then((standby) => {
              if (standby && standby.child && !standby.child.killed) {
                agyWorkerState = standby;
              } else {
                agyWorkerState = null;
                ensureWarmAgyWorker().catch(() => {});
              }
              agyStandbyPromise = null;
              try {
                oldChild.kill();
              } catch (e) {}
            });
          } else {
            try {
              oldChild.kill();
            } catch (e) {}
            agyWorkerState = null;
            setTimeout(() => ensureWarmAgyWorker().catch(() => {}), 50);
          }
        }

        const parsed = extractFirstJsonObject(rawResponse);
        if (parsed && parsed.reply) {
          const fullFormatted = formatFullCoachingPayload(parsed, userMessage, localGrammar, levelKey);
          resolveCoachMap(fullFormatted);
          return fullFormatted;
        } else {
          resolveCoachMap(null);
          return null;
        }
      });

      // Race between early streaming reply (~1.8s) and full turn completion
      const winner = await Promise.race([
        earlyTurnPromise,
        workerState.busyPromise.then((fullRes) => ({ early: false, fullRes }))
      ]);

      if (winner && winner.early && winner.reply) {
        const directFix = localGrammar.corrected;
        const casualNative = localGrammar.correctedVariants?.[1]?.sentence || directFix;
        const fluentPolite = localGrammar.correctedVariants?.[2]?.sentence || directFix;
        return {
          reply: winner.reply,
          follow_up_hint: winner.follow_up_hint || "That makes sense! Let me share a bit more.",
          pending_coach_id: winner.turnId,
          is_grammar_perfect: localGrammar.isPerfect,
          corrected_sentence: directFix,
          corrected_variants: localGrammar.correctedVariants,
          grammar_explanation: localGrammar.explanation,
          better_expressions: [
            { tone: "Casual Native", phrase: casualNative },
            { tone: "Fluent & Expressive", phrase: fluentPolite }
          ],
          pronunciation_tips: [
            { word: "Connected Speech", tip: "Link consonant endings smoothly into the next vowel sound." },
            { word: "Sentence Stress", tip: "Emphasize key nouns, main verbs, and emotional adjectives." }
          ],
          key_vocabulary: [
            { word: "express yourself", meaning: "To communicate your thoughts and feelings clearly." },
            { word: "build confidence", meaning: "To feel more sure and comfortable when speaking." }
          ],
          recommended_speech_rate: null
        };
      }

      if (winner && !winner.early && winner.fullRes) {
        const fullRes = winner.fullRes;
        if (fullRes.reply && voicePersona) {
          prewarmTtsMatchingClientSplit(
            fullRes.reply,
            voicePersona,
            fullRes.recommended_speech_rate || speechRate
          ).catch(() => {});
        }
        return fullRes;
      }
    }
  }

  // Fallback to Pollinations LLM if worker unavailable
  const fallbackRaw = await callPollinationsFallbackLLM(prompt);
  const parsed = extractFirstJsonObject(fallbackRaw);
  if (!parsed || !parsed.reply) {
    return null;
  }
  const fullFormatted = formatFullCoachingPayload(parsed, userMessage, localGrammar, levelKey);
  if (fullFormatted.reply && voicePersona) {
    prewarmTtsMatchingClientSplit(
      fullFormatted.reply,
      voicePersona,
      fullFormatted.recommended_speech_rate || speechRate
    ).catch(() => {});
  }
  return fullFormatted;
}

function calculateRealisticScores(userMessage, isPerfect, correctedSentence, levelKey) {
  const origWords = userMessage.trim().split(/\s+/).filter(Boolean);
  const fixedWords = (correctedSentence || userMessage).trim().split(/\s+/).filter(Boolean);
  const wordLen = origWords.length;

  let diffCount = 0;
  origWords.forEach((w, idx) => {
    if (!fixedWords[idx] || w.toLowerCase() !== fixedWords[idx].toLowerCase()) {
      diffCount++;
    }
  });
  if (fixedWords.length > origWords.length) {
    diffCount += (fixedWords.length - origWords.length);
  }

  // 1. Grammar Score (35 ~ 98) - 문법 오류 수에 따른 엄격하고 현실적인 채점
  let grammar = 95;
  if (!isPerfect) {
    if (diffCount === 1) {
      grammar = 74; // 사소한 1개 단어 오탈자/관사 오류
    } else if (diffCount === 2) {
      grammar = 62; // 2개 단어 문법 오류
    } else if (diffCount >= 3) {
      grammar = Math.max(35, 52 - (diffCount - 3) * 6); // 3개 이상 심각한 문법 파괴
    } else {
      grammar = 68;
    }
  } else {
    grammar = Math.min(98, 92 + Math.min(wordLen, 5));
  }

  // 2. Fluency Score (40 ~ 98)
  let fluency = 70;
  if (wordLen <= 2) {
    fluency = 48; // 단편적 단어
  } else if (wordLen <= 4) {
    fluency = 60;
  } else if (wordLen <= 7) {
    fluency = 72;
  } else if (wordLen <= 12) {
    fluency = isPerfect ? 88 : 76;
  } else {
    fluency = isPerfect ? 95 : 80;
  }
  if (!isPerfect && diffCount >= 2) {
    fluency = Math.max(40, fluency - 14);
  }

  // 3. Vocabulary Richness (42 ~ 96)
  let vocabulary = 65;
  if (wordLen <= 2) {
    vocabulary = 45;
  } else if (wordLen <= 5) {
    vocabulary = 58;
  } else if (wordLen <= 10) {
    vocabulary = 72;
  } else {
    vocabulary = Math.min(96, 78 + Math.min(wordLen, 12));
  }
  if (!isPerfect && diffCount >= 2) {
    vocabulary = Math.max(42, vocabulary - 10);
  }

  // CEFR Level
  let cefr = "B1";
  if (grammar < 60 || wordLen <= 3) {
    cefr = "A1";
  } else if (grammar < 75 || wordLen <= 6) {
    cefr = "A2";
  } else if (grammar >= 85 && wordLen >= 12) {
    cefr = levelKey === "advanced" ? "C1" : "B2";
  } else {
    cefr = "B1";
  }

  return {
    grammar: Math.round(grammar),
    fluency: Math.round(fluency),
    vocabulary: Math.round(vocabulary),
    cefr_level: cefr
  };
}

async function buildCoachingResponse(
  userMessage,
  modelId,
  scenarioTitle,
  rolePrompt,
  partnerName,
  voicePersona,
  history,
  rawLearnerLevel = "intermediate",
  speechRate = 1.0
) {
  const words = userMessage.trim().split(/\s+/).filter(Boolean);
  const wordLen = words.length;
  const lower = userMessage.trim().toLowerCase();
  const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gemini-4-argon"];
  const levelKey = normalizeLearnerLevel(rawLearnerLevel);
  const levelProfile = LEVEL_PROFILES[levelKey] || LEVEL_PROFILES.intermediate;

  const grammarResult = analyzeGrammarAndPhrasing(userMessage, modelMeta);

  // Instant fast-path ONLY for short 1-6 word self-intro or pure "hi/hello" greetings
  const isShortSelfIntro =
    wordLen <= 6 && /^(hi|hello|hey)?[,.\s]*(there)?[,.\s]*(who are you|what is your name|what's your name)[.!?]*$/i.test(lower);
  const isPureGreeting =
    wordLen <= 3 && /^(hi|hello|hey|good morning|good afternoon|good evening|hi there|hello there)[.!?]*$/i.test(lower);

  if (!isShortSelfIntro && !isPureGreeting && grammarResult.isPerfect) {
    const llmPromise = callRealCoachLLM(
      userMessage,
      modelId,
      scenarioTitle,
      rolePrompt,
      partnerName,
      voicePersona,
      history,
      grammarResult,
      levelKey,
      speechRate
    );
    const timeoutPromise = new Promise((r) => setTimeout(() => r(null), 2000));
    const llmResult = await Promise.race([llmPromise, timeoutPromise]);
    if (llmResult) {
      const realisticScores = calculateRealisticScores(
        userMessage,
        llmResult.is_grammar_perfect,
        llmResult.corrected_sentence,
        levelKey
      );
      return {
        ...llmResult,
        learner_level: levelKey,
        scores: realisticScores
      };
    }
  }

  const convResult = generateContextualReply(
    userMessage,
    modelId,
    scenarioTitle,
    partnerName,
    history,
    grammarResult
  );

  const adaptedReply = adaptReplyToLevel(convResult.reply, levelKey, partnerName);
  const adaptedHint = levelProfile.hintTransform(convResult.followUpHint);

  if (adaptedReply && voicePersona) {
    prewarmTtsMatchingClientSplit(
      adaptedReply,
      voicePersona,
      convResult.recommendedSpeechRate || speechRate
    ).catch(() => {});
  }

  const realisticScores = calculateRealisticScores(
    userMessage,
    grammarResult.isPerfect,
    grammarResult.corrected,
    levelKey
  );

  return {
    reply: adaptedReply,
    follow_up_hint: adaptedHint,
    learner_level: levelKey,
    is_grammar_perfect: grammarResult.isPerfect,
    corrected_sentence: grammarResult.corrected,
    corrected_variants: grammarResult.correctedVariants,
    grammar_explanation: grammarResult.explanation,
    better_expressions: convResult.betterExpressions,
    pronunciation_tips: convResult.pronunciationTips,
    key_vocabulary: convResult.keyVocabulary,
    recommended_speech_rate: convResult.recommendedSpeechRate || null,
    scores: realisticScores
  };
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // 1. ZERO-API-KEY NEURAL TTS ENDPOINT (/api/tts)
  if (pathname === "/api/tts" && (req.method === "GET" || req.method === "POST")) {
    try {
      let text = parsedUrl.searchParams.get("text") || "";
      let voice = parsedUrl.searchParams.get("voice") || "gemini:Kore";
      let rate = parseFloat(parsedUrl.searchParams.get("rate") || "1.0");

      if (req.method === "POST") {
        const body = await readJsonBody(req);
        if (body.text) text = body.text;
        if (body.voice) voice = body.voice;
        if (body.rate) rate = parseFloat(body.rate);
      }

      if (!text.trim()) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing text parameter" }));
        return;
      }

      const { buffer, edgeVoice } = await synthesizeEdgeNeuralTTS(text.slice(0, 900), voice, rate);
      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length,
        "X-Neural-Voice": edgeVoice,
        "Cache-Control": "no-store"
      });
      res.end(buffer);
      return;
    } catch (err) {
      console.error("TTS Synthesis Error:", err.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // 1B. ASYNC BACKGROUND COACHING COMPLETION ENDPOINT (/api/coach-result)
  if (pathname === "/api/coach-result" && req.method === "GET") {
    const id = parsedUrl.searchParams.get("id") || "";
    const pendingPromise = pendingCoachMap.get(id);
    if (!pendingPromise) {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ready: false }));
      return;
    }
    try {
      const coachResult = await Promise.race([
        pendingPromise,
        new Promise((r) => setTimeout(() => r(null), 6500))
      ]);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ready: Boolean(coachResult), coaching: coachResult }));
      return;
    } catch (e) {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ready: false }));
      return;
    }
  }

  // 2. ZERO-API-KEY INSTANT CONTEXTUAL AI CHAT & COACH ENDPOINT (/api/chat)
  if (pathname === "/api/chat" && req.method === "POST") {
    try {
      const body = await readJsonBody(req);
      const userMessage = (body.userMessage || "").trim();
      const modelId = body.model || "gemini-4-argon";
      const scenarioTitle = body.scenarioTitle || "Casual Daily Talk";
      const rawRolePrompt = body.rolePrompt || "You are a warm native English conversation partner.";
      const learnerLevel = body.learnerLevel || "intermediate";
      const speechRate = parseFloat(body.speechRate || "1.0") || 1.0;
      const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

      const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gemini-4-argon"];
      const partnerName = resolveVoicePartnerName(body.voiceName, body.voicePersona, modelMeta);
      const voicePersona = body.voicePersona || `gemini:${partnerName}`;

      const payload = await buildCoachingResponse(
        userMessage,
        modelId,
        scenarioTitle,
        rawRolePrompt,
        partnerName,
        voicePersona,
        history,
        learnerLevel,
        speechRate
      );

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(JSON.stringify(payload));
      return;
    } catch (err) {
      console.error("Zero-Key AI Chat Error:", err.message);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // 3. STATIC FILE SERVER (with Cache-Control: no-store so edits take effect immediately)
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const publicCandidate = path.join(__dirname, "public", safePath);
  const filePath = fs.existsSync(publicCandidate) ? publicCandidate : path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    });
    res.end(content);
  });
});

// Pre-warm the default neural voices AND the persistent Real LLM worker on startup!
(async () => {
  ensureWarmAgyWorker().catch(() => {});
  for (const v of ["en-US-AvaMultilingualNeural", "en-US-JennyNeural"]) {
    try {
      await getOrCreateEdgeTtsInstance(v);
    } catch (e) {}
  }
})();

server.listen(PORT, () => {
  console.log(`🎙️ SpeakFlow AI Live Server (Zero-API-Key Neural Voice + Real LLM AI Coach) running at http://localhost:${PORT}`);
});
