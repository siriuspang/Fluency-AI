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
// Comprehensive Grammar & Phrasing Analysis Engine
function analyzeGrammarAndPhrasing(userMessage, modelMeta) {
  const rawOriginal = (userMessage || "").trim();
  let corrected = rawOriginal;
  const notes = [];
  let isPerfect = true;

  if (!corrected) {
    return {
      corrected: "",
      correctedVariants: [],
      isPerfect: true,
      explanation: "Please enter an English sentence to speak.",
      notes: []
    };
  }

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
    { regex: /\bdidnt\b/gi, replacement: "didn't", word: '"didnt" → "didn\'t"' },
    { regex: /\bcouldnt\b/gi, replacement: "couldn't", word: '"couldnt" → "couldn\'t"' },
    { regex: /\bwouldnt\b/gi, replacement: "wouldn't", word: '"wouldnt" → "wouldn\'t"' },
    { regex: /\bshouldnt\b/gi, replacement: "shouldn't", word: '"shouldnt" → "shouldn\'t"' },
    { regex: /\bisnt\b/gi, replacement: "isn't", word: '"isnt" → "isn\'t"' },
    { regex: /\barent\b/gi, replacement: "aren't", word: '"arent" → "aren\'t"' },
    { regex: /\bwasnt\b/gi, replacement: "wasn't", word: '"wasnt" → "wasn\'t"' },
    { regex: /\bwerent\b/gi, replacement: "weren't", word: '"werent" → "weren\'t"' },
    { regex: /\bhavent\b/gi, replacement: "haven't", word: '"havent" → "haven\'t"' },
    { regex: /\bhasnt\b/gi, replacement: "hasn't", word: '"hasnt" → "hasn\'t"' },
    { regex: /\bdont\b/gi, replacement: "don't", word: '"dont" → "don\'t"' },
    { regex: /\bdoesnt\b/gi, replacement: "doesn't", word: '"doesnt" → "doesn\'t"' }
  ];

  for (const sc of splitContractions) {
    if (sc.regex.test(corrected)) {
      corrected = corrected.replace(sc.regex, sc.replacement);
      isPerfect = false;
      notes.push(`축약형 수정: ${sc.word} 형태로 아포스트로피(')를 바르게 표기합니다.`);
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
    { regex: /\blibary\b/gi, replacement: "library", word: '"libary" → "library"' },
    { regex: /\bchanllenge(s?)\b/gi, replacement: "challenge$1", word: '"chanllenge" → "challenge"' },
    { regex: /\bchallange(s?)\b/gi, replacement: "challenge$1", word: '"challange" → "challenge"' },
    { regex: /\bgrammer\b/gi, replacement: "grammar", word: '"grammer" → "grammar"' },
    { regex: /\bakward\b/gi, replacement: "awkward", word: '"akward" → "awkward"' },
    { regex: /\bdollor(s?)\b/gi, replacement: "dollar$1", word: '"dollor" → "dollar"' },
    { regex: /\brecieve\b/gi, replacement: "receive", word: '"recieve" → "receive"' },
    { regex: /\bdefinately\b/gi, replacement: "definitely", word: '"definately" → "definitely"' },
    { regex: /\bseperate\b/gi, replacement: "separate", word: '"seperate" → "separate"' },
    { regex: /\boccured\b/gi, replacement: "occurred", word: '"occured" → "occurred"' },
    { regex: /\baccomodate\b/gi, replacement: "accommodate", word: '"accomodate" → "accommodate"' },
    { regex: /\benviroment\b/gi, replacement: "environment", word: '"enviroment" → "environment"' },
    { regex: /\bbecuase\b/gi, replacement: "because", word: '"becuase" → "because"' },
    { regex: /\bpronounciation\b/gi, replacement: "pronunciation", word: '"pronounciation" → "pronunciation"' },
    { regex: /\bsuprise(d|s)?\b/gi, replacement: "surprise$1", word: '"suprise" → "surprise"' },
    { regex: /\bintersted\b/gi, replacement: "interested", word: '"intersted" → "interested"' },
    { regex: /\bdiffrent\b/gi, replacement: "different", word: '"diffrent" → "different"' },
    { regex: /\bimportent\b/gi, replacement: "important", word: '"importent" → "important"' }
  ];

  for (const sp of spellingMap) {
    if (sp.regex.test(corrected)) {
      corrected = corrected.replace(sp.regex, sp.replacement);
      isPerfect = false;
      notes.push(`스펠링 교정: ${sp.word} 올바른 철자로 수정했습니다.`);
    }
  }

  // 3. Irregular verbs with incorrect -ed (buyed -> bought, etc.)
  const badRegularPast = [
    { regex: /\bbuyed\b/gi, replacement: "bought", bad: "buyed", correct: "bought" },
    { regex: /\bcatched\b/gi, replacement: "caught", bad: "catched", correct: "caught" },
    { regex: /\bteached\b/gi, replacement: "taught", bad: "teached", correct: "taught" },
    { regex: /\bgoed\b/gi, replacement: "went", bad: "goed", correct: "went" },
    { regex: /\beated\b/gi, replacement: "ate", bad: "eated", correct: "ate" },
    { regex: /\bdrived\b/gi, replacement: "drove", bad: "drived", correct: "drove" },
    { regex: /\bfeeled\b/gi, replacement: "felt", bad: "feeled", correct: "felt" },
    { regex: /\bfinded\b/gi, replacement: "found", bad: "finded", correct: "found" },
    { regex: /\bforgetted\b/gi, replacement: "forgot", bad: "forgetted", correct: "forgot" },
    { regex: /\bheared\b/gi, replacement: "heard", bad: "heared", correct: "heard" },
    { regex: /\bkeeped\b/gi, replacement: "kept", bad: "keeped", correct: "kept" },
    { regex: /\bknowed\b/gi, replacement: "knew", bad: "knowed", correct: "knew" },
    { regex: /\bleaved\b/gi, replacement: "left", bad: "leaved", correct: "left" },
    { regex: /\blosed\b/gi, replacement: "lost", bad: "losed", correct: "lost" },
    { regex: /\bmeeted\b/gi, replacement: "met", bad: "meeted", correct: "met" },
    { regex: /\bpayed\b/gi, replacement: "paid", bad: "payed", correct: "paid" },
    { regex: /\brunned\b/gi, replacement: "ran", bad: "runned", correct: "ran" },
    { regex: /\branned\b/gi, replacement: "ran", bad: "ranned", correct: "ran" },
    { regex: /\bsayed\b/gi, replacement: "said", bad: "sayed", correct: "said" },
    { regex: /\bseed\b/gi, replacement: "saw", bad: "seed", correct: "saw" },
    { regex: /\bsended\b/gi, replacement: "sent", bad: "sended", correct: "sent" },
    { regex: /\bsleeped\b/gi, replacement: "slept", bad: "sleeped", correct: "slept" },
    { regex: /\bspeaked\b/gi, replacement: "spoke", bad: "speaked", correct: "spoke" },
    { regex: /\bspended\b/gi, replacement: "spent", bad: "spended", correct: "spent" },
    { regex: /\btaked\b/gi, replacement: "took", bad: "taked", correct: "took" },
    { regex: /\btelled\b/gi, replacement: "told", bad: "telled", correct: "told" },
    { regex: /\bthinked\b/gi, replacement: "thought", bad: "thinked", correct: "thought" },
    { regex: /\bunderstanded\b/gi, replacement: "understood", bad: "understanded", correct: "understood" },
    { regex: /\bwinned\b/gi, replacement: "won", bad: "winned", correct: "won" },
    { regex: /\bwrited\b/gi, replacement: "wrote", bad: "writed", correct: "wrote" },
    { regex: /\bcosted\b/gi, replacement: "cost", bad: "costed", correct: "cost" },
    { regex: /\bcutted\b/gi, replacement: "cut", bad: "cutted", correct: "cut" },
    { regex: /\bhurted\b/gi, replacement: "hurt", bad: "hurted", correct: "hurt" }
  ];

  for (const vr of badRegularPast) {
    if (vr.regex.test(corrected)) {
      corrected = corrected.replace(vr.regex, vr.replacement);
      isPerfect = false;
      notes.push(`불규칙 동사 과거형 교정: "${vr.bad}"는 규칙 변화(-ed)가 아니라 불규칙 과거형 "${vr.correct}"로 씁니다.`);
    }
  }

  // 4. Auxiliary / double past (didn't went -> didn't go, did you saw -> did you see)
  const pastAfterDidnt = {
    went: "go", saw: "see", bought: "buy", came: "come", had: "have",
    took: "take", spoke: "speak", ate: "eat", wrote: "write", told: "tell",
    made: "make", knew: "know", heard: "hear", left: "leave", met: "meet"
  };
  for (const [badPast, baseVerb] of Object.entries(pastAfterDidnt)) {
    const reg = new RegExp(`\\b(didn'?t|did\\s+not|did\\s+[a-z]+\\s+not|did\\s+[a-z]+)\\s+${badPast}\\b`, "gi");
    if (reg.test(corrected)) {
      corrected = corrected.replace(reg, `$1 ${baseVerb}`);
      isPerfect = false;
      notes.push(`조동사 어법 교정: "did/didn't" 뒤에는 항상 동사원형("${baseVerb}")을 사용합니다.`);
    }
  }

  // 5. Subject-Verb Agreement: (he/she/it have -> has, etc.)
  if (/\b(he|she|it|my friend|my mom|my father|my sister|my brother|my boss)\s+have\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(he|she|it|my friend|my mom|my father|my sister|my brother|my boss)\s+have\b/gi, "$1 has");
    isPerfect = false;
    notes.push('주어-동사 수일치: 3인칭 단수 주어(he/she/it 등)에는 "have" 대신 "has"를 사용합니다.');
  }

  if (/\b(she|he|it)\s+don'?t\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(she|he|it)\s+don'?t\b/gi, "$1 doesn't");
    isPerfect = false;
    notes.push('주어-동사 수일치: 3인칭 단수 부정형은 "don\'t"가 아닌 "doesn\'t"를 사용합니다.');
  }

  if (/\b(she|he|it)\s+do\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(she|he|it)\s+do\b/gi, "$1 does");
    isPerfect = false;
    notes.push('주어-동사 수일치: 3인칭 단수 긍정형은 "do"가 아닌 "does"를 사용합니다.');
  }

  // 6. Past time marker with base verb ("yesterday I go" -> "yesterday I went")
  if (/\b(yesterday|last\s+(?:night|week|month|year))\b/i.test(corrected)) {
    const pastMap = {
      go: "went", see: "saw", buy: "bought", eat: "ate", make: "made",
      come: "came", take: "took", write: "wrote", have: "had", meet: "met"
    };
    for (const [base, past] of Object.entries(pastMap)) {
      const pReg = new RegExp(`\\b(yesterday|last\\s+(?:night|week|month|year))\\s+([a-z]+\\s+)?${base}\\b`, "gi");
      if (pReg.test(corrected)) {
        corrected = corrected.replace(pReg, `$1 $2${past}`);
        isPerfect = false;
        notes.push(`시제 일치: 명확한 과거 시점(yesterday/last...) 부사와 함께 쓰일 때는 과거형 "${past}"를 사용합니다.`);
      }
    }
  }

  // 7. Collocation fixes: "have a trip" -> "take a trip" / "go on a trip"
  if (/\b(having|have|had)\s+a\s+trip\b/i.test(corrected)) {
    corrected = corrected
      .replace(/\bhaving\s+a\s+trip\b/gi, "taking a trip")
      .replace(/\bhave\s+a\s+trip\b/gi, "take a trip")
      .replace(/\bhad\s+a\s+trip\b/gi, "took a trip");
    isPerfect = false;
    notes.push('자연스러운 연어(Collocation): 영어에서는 여행을 갈 때 "have a trip" 대신 "take a trip" 또는 "go on a trip"을 씁니다.');
  }

  // 8. "to the [Name] city" -> "to [Name]" (e.g. "to the Chung-ju city" -> "to Chungju")
  if (/\bto\s+the\s+([A-Za-z\-]+)\s+city\b/i.test(corrected)) {
    corrected = corrected.replace(/\bto\s+the\s+([A-Za-z\-]+)\s+city\b/gi, (_, c) => {
      const cleanCity = c.replace(/-/g, "");
      const formatted = cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1).toLowerCase();
      return `to ${formatted}`;
    });
    isPerfect = false;
    notes.push('고유명사 표현: 도시 이름 앞에는 정관사 "the"나 뒤에 "city"를 붙이지 않고 간결하게 지명만 표기합니다.');
  }

  // 9. Missing articles before destination nouns: "go to supermarket/store/hospital"
  if (/\b(go|goes|went|going|gone)\s+to\s+(supermarket|grocery\s+store|store|hospital|airport|station|bank|pharmacy|post\s+office|park|gym|doctor)\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(go|goes|went|going|gone)\s+to\s+(supermarket|grocery\s+store|store|hospital|airport|station|bank|pharmacy|post\s+office|park|gym|doctor)\b/gi, "$1 to the $2");
    isPerfect = false;
    notes.push('관사 누락 보완: 특정 목적지 장소 앞에는 정관사 "the"를 붙여 표기합니다 (예: "to the supermarket").');
  }

  // "go to home" -> "go home"
  if (/\b(go|goes|went|going|gone)\s+to\s+home\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(go|goes|went|going|gone)\s+to\s+home\b/gi, "$1 home");
    isPerfect = false;
    notes.push('전치사 제거: "home"은 방향을 나타내는 부사이므로 앞에 "to"를 붙이지 않고 "go home"으로 씁니다.');
  }

  // 10. Number + singular noun ("two apple" -> "two apples")
  const pluralNounsRegex = /\b(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(apple|car|book|friend|day|hour|dollar|problem|student|person|year|month)\b/gi;
  if (pluralNounsRegex.test(corrected)) {
    corrected = corrected.replace(pluralNounsRegex, (match, num, noun) => {
      if (noun.toLowerCase() === "person") return `${num} people`;
      return `${num} ${noun}s`;
    });
    isPerfect = false;
    notes.push('명사 복수형: 2 이상의 수사 뒤에 오는 가산명사는 복수형(-s/people)으로 일치시킵니다.');
  }

  // 11. Konglish & Adjective fixes
  // "I am boring" -> "I am bored"
  if (/\b(i am|i'm)\s+boring\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(i am|i'm)\s+boring\b/gi, "$1 bored");
    isPerfect = false;
    notes.push('감정 형용사: 주어 자신이 지루함을 느낄 때는 수동 형태의 감정 분사 "bored"를 사용합니다 ("boring"은 남을 지루하게 만드는 사람/사물).');
  }

  // "I am agree" -> "I agree"
  if (/\b(i am|i'm)\s+agree\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(i am|i'm)\s+agree\b/gi, "I agree");
    isPerfect = false;
    notes.push('"agree"는 동사이므로 be동사 없이 "I agree"로 바로 표현합니다.');
  }

  // "by walk" -> "on foot"
  if (/\bby\s+walk\b/i.test(corrected)) {
    corrected = corrected.replace(/\bby\s+walk\b/gi, "on foot");
    isPerfect = false;
    notes.push('수단 전치사: 걸어서 이동할 때는 "by walk"가 아니라 "on foot" 또는 동사 "walk"를 씁니다.');
  }

  // "every days" -> "every day"
  if (/\bevery\s+days\b/i.test(corrected)) {
    corrected = corrected.replace(/\bevery\s+days\b/gi, "every day");
    isPerfect = false;
    notes.push('"every" 뒤에는 항상 단수 명사가 오므로 "every day"가 맞습니다.');
  }

  // "discuss about" -> "discuss"
  if (/\bdiscuss\s+about\b/i.test(corrected)) {
    corrected = corrected.replace(/\bdiscuss\s+about\b/gi, "discuss");
    isPerfect = false;
    notes.push('"discuss"는 타동사이므로 전치사 "about" 없이 바로 목적어를 취합니다.');
  }

  // "look forward to see" -> "look forward to seeing"
  if (/\blook\s+forward\s+to\s+see\b/i.test(corrected)) {
    corrected = corrected.replace(/\blook\s+forward\s+to\s+see\b/gi, "look forward to seeing");
    isPerfect = false;
    notes.push('"look forward to"의 "to"는 전치사이므로 뒤에 동명사(-ing)가 옵니다.');
  }

  // 12. Spacing and Punctuation
  corrected = corrected.replace(/\s+([.,!?])/g, "$1").trim();
  if (corrected.length > 0) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
    if (!/[.!?]$/.test(corrected)) {
      const isQ = /^(can|could|would|should|will|do|does|did|is|are|was|were|what|why|how|where|when|who)\b/i.test(corrected);
      corrected += isQ ? "?" : ".";
    }
  }

  if (notes.length === 0) {
    notes.push(`문장이 문법적으로 정확합니다! 아래의 원어민 추천 표현들도 함께 연습해 보세요.`);
  }

  const explanation = notes.join(" ");
  const correctedVariants = buildCorrectedSentenceVariants(rawOriginal, corrected, isPerfect);

  return {
    corrected,
    correctedVariants,
    isPerfect,
    explanation,
    notes
  };
}

function buildCorrectedSentenceVariants(rawOriginal, primaryCorrected, isPerfect) {
  const lower = rawOriginal.trim().toLowerCase();

  // 1. "I don't understand" / clarification / typo like "I do n undesodn ao that"
  if (/undesodn|understand|don'?t\s+get|what\s+do\s+you\s+mean|didn'?t\s+catch/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: "I don't understand that." },
      { label: "추천 1 · Casual Native", sentence: "I didn't quite catch that—could you say it again?" },
      { label: "추천 2 · Fluent & Expressive", sentence: "I'm not entirely following—could you explain that a bit more simply?" }
    ];
  }

  // 2. Trip to Chungju / Family vacation
  if (/trip|chung-?ju|travel|vacation/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm heading on a family trip down to Chungju." },
      { label: "추천 2 · Fluent & Expressive", sentence: "My family and I are taking a weekend getaway to Chungju." }
    ];
  }

  // 3. Supermarket / shopping / yesterday
  if (/supermarket|grocery|store|apple|buyed|bought/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "She ran to the supermarket yesterday and picked up a couple of apples." },
      { label: "추천 2 · Fluent & Expressive", sentence: "She went to the grocery store yesterday to purchase some fresh apples." }
    ];
  }

  // 4. Bored / emotional feelings
  if (/boring|bored|tired|exhausted/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm feeling pretty bored today and looking for something fun to do." },
      { label: "추천 2 · Fluent & Expressive", sentence: "I've got some free time today and find myself feeling a bit restless." }
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

  // General intelligent variants
  const core = primaryCorrected.replace(/[.!?]+$/, "").trim();
  const isQuestion = /\?$/.test(primaryCorrected) || /^(can|could|would|do|does|did|is|are|what|why|how|where|when|who)\b/i.test(core);

  if (isQuestion) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: `Could you tell me, ${core.charAt(0).toLowerCase() + core.slice(1)}?` },
      { label: "추천 2 · Fluent & Expressive", sentence: `I was wondering, ${core.charAt(0).toLowerCase() + core.slice(1)}?` }
    ];
  }

  return [
    { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
    { label: "추천 1 · Casual Native", sentence: `Actually, ${core.charAt(0).toLowerCase() + core.slice(1)}.` },
    { label: "추천 2 · Fluent & Expressive", sentence: `To put it another way, ${core.charAt(0).toLowerCase() + core.slice(1)}.` }
  ];
}


function generateContextualReply(userMessage, modelId, scenarioTitle, partnerName, history, grammarResult) {
  const rawClean = (userMessage || "").trim();
  const clean = grammarResult.corrected || rawClean;
  const lower = clean.toLowerCase();
  const modelMeta = (typeof MODEL_PERSONAS !== "undefined" && MODEL_PERSONAS[modelId]) ? MODEL_PERSONAS[modelId] : null;

  let reply = "";
  let followUpHint = "That sounds great! Let me share a little more about that.";
  let betterExpressions = (grammarResult.correctedVariants && grammarResult.correctedVariants.slice(1).map(v => ({ tone: v.label, phrase: v.sentence }))) || [];
  let pronunciationTips = [];
  let keyVocabulary = [];
  let recommendedSpeechRate = null;

  // 1. Clarification / "I don't understand" / "I didn't catch that"
  if (/undesodn|understand|don'?t\s+get|what\s+do\s+you\s+mean|didn'?t\s+catch|pardon|repeat|say\s+again/i.test(lower)) {
    reply = `No worries at all! Let me slow down and rephrase. Which part would you like me to explain more simply?`;
    followUpHint = "Could you explain the last question one more time with simpler words?";
    pronunciationTips = [
      { word: "Understand (ˌʌn.dɚˈstænd)", tip: "Stress the last syllable clearly: 'un-der-STAND'." },
      { word: "Explain (ɪkˈspleɪn)", tip: "Link the 'k' and 'sp' smoothly without adding extra vowels." }
    ];
    keyVocabulary = [
      { word: "break down", meaning: "To explain something complex in simpler parts." },
      { word: "catch that", meaning: "To hear or understand what was said." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 2. Travel & Vacation (e.g. Chungju, trips, flights)
  if (/trip|travel|vacation|chung-?ju|flight|hotel|tour|sightseeing|beach|mountains/i.test(lower)) {
    reply = `Traveling is always such a refreshing experience! What are you most excited to see or do on your trip?`;
    followUpHint = "I'm really looking forward to sightseeing, trying good local food, and relaxing with my family.";
    pronunciationTips = [
      { word: "Scenic (ˈsiː.nɪk)", tip: "Start with a soft 's' and stress the first syllable: 'SEE-nik'." },
      { word: "Vacation (veɪˈkeɪ.ʃən)", tip: "Keep the middle syllable stressed: 'vay-KAY-shun'." }
    ];
    keyVocabulary = [
      { word: "getaway", meaning: "A short vacation or holiday." },
      { word: "sightseeing", meaning: "Visiting interesting places as a tourist." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 3. Food, Cooking & Dining (e.g. pizza, pasta, dinner, supermarket, grocery)
  if (/food|cook|cooked|cooking|dinner|lunch|breakfast|eat|ate|pizza|pasta|supermarket|grocery|restaurant|delicious|meal/i.test(lower)) {
    reply = `That sounds delicious! Did you make it yourself with a special recipe, or did you try it at a favorite spot?`;
    followUpHint = "I made it at home with fresh ingredients, and it turned out really flavorful.";
    pronunciationTips = [
      { word: "Delicious (dɪˈlɪʃ.əs)", tip: "Soft 'sh' sound in the middle: 'dih-LISH-us'." },
      { word: "Recipe (ˈres.ə.pi)", tip: "Three syllables: 'REH-suh-pee'." }
    ];
    keyVocabulary = [
      { word: "from scratch", meaning: "Made completely from raw ingredients without shortcuts." },
      { word: "flavorful", meaning: "Full of rich, enjoyable taste." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 4. Work, Coding, Tech & AI
  if (/work|job|coding|code|developer|project|software|agent|tech|ai|study|studying|meeting/i.test(lower)) {
    reply = `Sounds like you've been working on something fascinating! What's the most exciting challenge you're tackling right now?`;
    followUpHint = "I've been building a project using AI tools, and it's making my workflow much faster.";
    pronunciationTips = [
      { word: "Develop (dɪˈvel.əp)", tip: "Stress the second syllable: 'dih-VEL-up'." },
      { word: "Challenge (ˈtʃæl.ɪndʒ)", tip: "Clear 'ch' sound at the beginning: 'CHAL-inj'." }
    ];
    keyVocabulary = [
      { word: "workflow", meaning: "The sequence of steps in a work process." },
      { word: "hands-on", meaning: "Practical, active involvement in doing something." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 5. Feelings, Boredom, Relaxation & Weekend
  if (/bored|boring|tired|exhausted|relax|relaxing|weekend|free time|rest|sleep/i.test(lower)) {
    reply = `I completely understand how you feel. When you have downtime like this, what's your favorite way to unwind and recharge?`;
    followUpHint = "I usually like listening to music, going for a walk, or catching up on sleep.";
    pronunciationTips = [
      { word: "Unwind (ʌnˈwaɪnd)", tip: "Long 'eye' sound: 'un-WYND'." },
      { word: "Recharge (riːˈtʃɑːrdʒ)", tip: "Stress the second syllable: 'ree-CHARJ'." }
    ];
    keyVocabulary = [
      { word: "unwind", meaning: "To relax after a period of work or stress." },
      { word: "downtime", meaning: "Time spent relaxing and resting." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 6. User asks a question (Why, How, What, Can you, Do you)
  if (/\?$/.test(clean) || /^(what|how|why|when|where|who|can you|could you|do you|are you)/i.test(clean)) {
    reply = `That's a thoughtful question! I really enjoy helping people build confidence in English while sharing fun cultural insights. What inspired you to ask about that?`;
    followUpHint = "I'm always curious to learn new perspectives and practice asking questions naturally.";
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 7. General Dynamic Contextual Fallback (Rotating & Topic Aware)
  const dynamicReplies = [
    `That gives a great glimpse into your day! What was the most interesting or memorable part of that for you?`,
    `I love hearing about that! How did everything turn out in the end?`,
    `That sounds like a meaningful experience. What are you planning to do next with that?`,
    `That's really cool! Have you always enjoyed doing that, or is it something relatively new for you?`
  ];
  const charHash = clean.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  reply = dynamicReplies[charHash % dynamicReplies.length];
  followUpHint = "It was a really nice experience, and I'm happy I got to try something new today.";

  return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
}



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
