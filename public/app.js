/**
 * SpeakFlow AI — Gemini Live & ChatGPT Voice English Coach
 * Supports:
 *  1. Gemini 3.8 Live WebSocket (wss://.../BidiGenerateContent with gemini-3.8-live) & Gemini 3.8 Flash TTS (Puck, Aoede, Kore, Charon, Fenrir)
 *  2. Gemini 3.5 Transcribe (gemini-3.5-transcribe) & OpenAI Whisper (whisper-1) AI Voice Recording Transcription
 *  3. OpenAI ChatGPT (gpt-4o, gpt-4o-mini, o3-mini) & ChatGPT Voice Mode TTS (gpt-4o-mini-tts: coral, nova, alloy, sage, ash, shimmer)
 *  4. Speaking History & Review Notebook: Auto-saves & bookmarks corrected sentences, vocabulary, and full chat sessions
 */

const SCENARIOS = {
  casual: {
    id: "casual",
    icon: "",
    svgIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    title: "Casual Daily Talk",
    subtitle: "Practice natural, everyday English conversation with your AI partner.",
    rolePrompt:
      "You are Alex, a warm, encouraging native English conversation partner chatting over coffee. Keep your conversational replies natural, engaging, and 2-3 sentences long, ending with an open-ended question.",
    openingMessage:
      "Hey there! Great to catch up over coffee today. How has your week been going so far, and have you been working on anything exciting lately?",
    starterHint:
      "My week has been pretty busy with work, but I've been trying to set aside 20 minutes every day to practice speaking English.",
    initialCoaching: {
      lastUtterance: "Ready for your first response! Try answering your AI partner's question aloud.",
      correctedSentence: "Your grammar & phrasing check will appear here after you speak.",
      grammarExplanation: "Tip: Use the Present Perfect Continuous ('I have been working on...') to talk about ongoing activities started recently.",
      isPerfect: true,
      betterExpressions: [
        { tone: "Casual Native", phrase: "It's been a pretty hectic week, to be honest, but I'm hanging in there!" },
        { tone: "Warm & Engaging", phrase: "Things have been going well! Lately, I've been diving into a few new projects." },
        { tone: "Idiomatic", phrase: "I've had a lot on my plate this week, mostly catching up on work." }
      ],
      pronunciationTips: [
        { word: "Have you been (həv-yə-bɪn)", tip: "Reduce 'have you' to 'həv-yə' and link smoothly into 'been' with a short /ɪ/ vowel." },
        { word: "Exciting (ɪk-ˈsaɪ-tɪŋ)", tip: "Stress the second syllable 'SAI'. In American English, the 't' softens to a quick flap [ɾ]." }
      ],
      vocabulary: [
        { word: "have a lot on one's plate", meaning: "To be very busy with many responsibilities or tasks." },
        { word: "catch up", meaning: "To talk to someone you haven't seen in a while about recent news." },
        { word: "set aside (time)", meaning: "To reserve time specifically for a purpose." }
      ]
    }
  },
  interview: {
    id: "interview",
    icon: "",
    svgIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    title: "Job Interview Coach",
    subtitle: "Practice behavioral and situational interview questions using the STAR method.",
    rolePrompt:
      "You are Jordan, a senior hiring manager conducting a professional yet supportive English job interview. Ask realistic behavioral or career questions, respond thoughtfully to the candidate's answer, and ask a natural follow-up question.",
    openingMessage:
      "Welcome, and thank you for joining me today! To kick things off, could you walk me through your background and tell me what excites you most about this role?",
    starterHint:
      "Thank you for having me. Over the past few years, I've focused on building user-centric products and solving complex workflow problems.",
    initialCoaching: {
      lastUtterance: "Interview tip: Structure your answer with Present → Past → Future.",
      correctedSentence: "Use strong action verbs like 'spearheaded', 'optimized', and 'collaborated'.",
      grammarExplanation: "When describing past achievements with present relevance, combine Past Simple for specific projects and Present Perfect for overall career impact.",
      isPerfect: true,
      betterExpressions: [
        { tone: "Executive", phrase: "I'd love to give you a quick overview. I specialize in driving cross-functional projects from concept to launch." },
        { tone: "Impact-Focused", phrase: "Throughout my career, my main focus has been streamlining operations and delivering measurable results." },
        { tone: "Enthusiastic", phrase: "What really drew me to this position is the opportunity to scale innovative AI solutions." }
      ],
      pronunciationTips: [
        { word: "Walk me through (wɔːk-mi-θruː)", tip: "Emphasize 'walk' and 'through'; make sure the 'th' in 'through' is voiceless /θ/." },
        { word: "Experience (ɪk-ˈspɪr-i-əns)", tip: "Primary stress is on the second syllable 'SPIR'." }
      ],
      vocabulary: [
        { word: "walk (someone) through", meaning: "To explain something step by step clearly." },
        { word: "spearhead", meaning: "To lead an initiative, project, or attack." },
        { word: "track record", meaning: "Past achievements or performance over time." }
      ]
    }
  },
  business: {
    id: "business",
    icon: "",
    svgIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    title: "Business Meeting & Pitch",
    subtitle: "Lead stakeholder updates, negotiate priorities, and articulate ideas clearly.",
    rolePrompt:
      "You are Morgan, a Product VP in a strategy meeting. Discuss project timelines, trade-offs, and key metrics with the user in clear executive English.",
    openingMessage:
      "Thanks for hopping on this call. Before we finalize the Q4 roadmap, where do we stand on the current sprint deliverables, and are there any blockers we should address?",
    starterHint:
      "We're currently on track to hit our main milestone by Friday, though we may need extra design bandwidth for the onboarding flow.",
    initialCoaching: {
      lastUtterance: "Meeting tip: Lead with the bottom line (status) before explaining details.",
      correctedSentence: "Try starting with 'We're on track for...' or 'Our top priority right now is...'",
      grammarExplanation: "In executive meetings, concise active voice is much stronger than passive voice.",
      isPerfect: true,
      betterExpressions: [
        { tone: "Concise Status", phrase: "We're green across most deliverables, with one minor bottleneck in QA that we're actively mitigating." },
        { tone: "Diplomatic Pushback", phrase: "To keep the launch date intact, I'd recommend scoping down the secondary dashboard features." },
        { tone: "Action-Oriented", phrase: "Let's align on the key trade-offs so we can unblock the engineering team today." }
      ],
      pronunciationTips: [
        { word: "Deliverables (dɪ-ˈlɪv-ər-ə-bəlz)", tip: "Stress the second syllable 'LIV', and blend the middle syllables smoothly." },
        { word: "Prioritize (praɪ-ˈɔːr-ə-taɪz)", tip: "Clear diphthong /aɪ/ on the first and last syllables; stress 'OR'." }
      ],
      vocabulary: [
        { word: "on track", meaning: "Progressing as planned toward a goal or deadline." },
        { word: "bandwidth", meaning: "Capacity, time, or resources available to take on work." },
        { word: "mitigate", meaning: "To make a risk or problem less severe." }
      ]
    }
  },
  travel: {
    id: "travel",
    icon: "",
    svgIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    title: "Travel & Boutique Hotel",
    subtitle: "Handle real-world travel situations, check-ins, dining, and local recommendations.",
    rolePrompt:
      "You are Elena, the head concierge at a boutique hotel in London/New York. Help the guest with check-in requests, upgrades, local hidden gems, and dining reservations.",
    openingMessage:
      "Good afternoon, and welcome to The Grand Horizon Hotel! How was your flight in, and how may I help make your stay as comfortable as possible today?",
    starterHint:
      "Hi! The flight was a bit long, so I'm hoping to check in early if a quiet room on a high floor is available.",
    initialCoaching: {
      lastUtterance: "Polite requests sound most natural with 'I was wondering if...' or 'Would it be possible to...'",
      correctedSentence: "Use modal verbs ('could', 'would') to sound polite without being overly stiff.",
      grammarExplanation: "Past continuous ('I was hoping' / 'I was wondering') makes requests sound extra courteous in hospitality settings.",
      isPerfect: true,
      betterExpressions: [
        { tone: "Polite & Natural", phrase: "I was wondering if there's any chance we could do an early check-in?" },
        { tone: "Local Recommendation", phrase: "Could you point me toward a great local coffee spot off the beaten path?" },
        { tone: "Room Preference", phrase: "If possible, I'd love a room facing away from the main street." }
      ],
      pronunciationTips: [
        { word: "Available (ə-ˈveɪ-lə-bəl)", tip: "Stress the second syllable 'VAY', and keep the unstressed syllables light (/ə/)." },
        { word: "Reservation (ˌrez-ər-ˈveɪ-ʃən)", tip: "Primary stress falls on 'VAY' before '-tion'." }
      ],
      vocabulary: [
        { word: "off the beaten path", meaning: "A place not visited by many tourists; authentic and local." },
        { word: "complimentary", meaning: "Provided free of charge as a courtesy." },
        { word: "accommodate", meaning: "To fulfill a request or provide what is needed." }
      ]
    }
  },
  shadowing: {
    id: "shadowing",
    icon: "",
    svgIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    title: "Pronunciation & Shadowing Drill",
    subtitle: "Master American/British rhythm, word linking, stress, and intonation patterns.",
    rolePrompt:
      "You are Coach Sam, an expert English phonetics and prosody coach. Give the user a target sentence to shadow, evaluate how natural their phrasing is, and explain connected speech (linking, reductions, stress timing).",
    openingMessage:
      "Welcome to Shadowing Studio! Let's warm up with connected speech. Listen to this sentence and repeat it aloud: \"I would've called you earlier if I'd known you were in town.\" Or tell me any phrase you find tricky to pronounce!",
    starterHint:
      "I would've called you earlier if I'd known you were in town.",
    initialCoaching: {
      lastUtterance: "Target Drill: \"I would've called you earlier if I'd known you were in town.\"",
      correctedSentence: "Focus on rhythm: stress CONTENT words (called, earlier, known, town) and glide through FUNCTION words.",
      grammarExplanation: "Third conditional contraction: 'would have' → 'would've' (/ˈwʊd.əv/), 'I had' → 'I'd' (/aɪd/).",
      isPerfect: true,
      betterExpressions: [
        { tone: "Connected Speech Breakdown", phrase: "\"would've\" sounds like 'WOOD-uv', and \"called you\" blends into 'CALD-joo' (/dʒu/)." },
        { tone: "Alternative Natural Phrase", phrase: "I totally would've reached out if I knew you were around!" },
        { tone: "Intonation Contour", phrase: "Start with a high pitch on 'CALLED', dip on 'earlier', and fall decisively on 'TOWN'." }
      ],
      pronunciationTips: [
        { word: "Called you → 'Cald-joo'", tip: "When /d/ meets /j/, they assimilate into a soft 'j' sound (/dʒ/): 'called-joo'." },
        { word: "If I'd → 'ɪ-faɪd'", tip: "Link the final /f/ of 'if' directly to the vowel in 'I'd' as one smooth syllable." }
      ],
      vocabulary: [
        { word: "connected speech", meaning: "How words blend together naturally in spoken English." },
        { word: "schwa (/ə/)", meaning: "The relaxed, unstressed vowel sound in words like 'to', 'of', and 'have'." },
        { word: "stress-timed rhythm", meaning: "Stressed syllables occur at roughly equal intervals regardless of unstressed syllables between them." }
      ]
    }
  }
};

const COACHING_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: {
      type: "string",
      description: "The AI conversation partner's natural spoken response (2-4 sentences, engaging and ending with a natural question or prompt)."
    },
    follow_up_hint: {
      type: "string",
      description: "A natural 1-sentence example response the learner could say next to continue the conversation."
    },
    is_grammar_perfect: {
      type: "boolean",
      description: "True if the user's English was completely natural and grammatically accurate; false if there are improvements to suggest."
    },
    corrected_sentence: {
      type: "string",
      description: "A corrected, natural version of what the user said. If already great, polish it slightly or affirm its accuracy."
    },
    grammar_explanation: {
      type: "string",
      description: "Concise, encouraging explanation of the grammar point, word choice, or why the correction sounds more natural."
    },
    better_expressions: {
      type: "array",
      description: "Three alternative ways a native speaker would express the user's message in different tones.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          tone: { type: "string", description: "e.g., Casual Native, Professional, Idiomatic" },
          phrase: { type: "string", description: "The full alternative English sentence." }
        },
        required: ["tone", "phrase"]
      }
    },
    pronunciation_tips: {
      type: "array",
      description: "Two actionable pronunciation, stress, or word-linking tips based on words in the user's message or the AI's reply.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          word: { type: "string", description: "Word or linked phrase with phonetic hint, e.g. 'want to (wanna)'" },
          tip: { type: "string", description: "How to stress, link, or pronounce it naturally." }
        },
        required: ["word", "tip"]
      }
    },
    key_vocabulary: {
      type: "array",
      description: "Two or three useful English words, phrasal verbs, or idioms relevant to this turn.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          word: { type: "string", description: "The word, collocation, or idiom." },
          meaning: { type: "string", description: "Clear definition and usage note." }
        },
        required: ["word", "meaning"]
      }
    },
    scores: {
      type: "object",
      additionalProperties: false,
      properties: {
        fluency: { type: "integer", description: "Score from 60 to 100 evaluating flow and completeness." },
        grammar: { type: "integer", description: "Score from 60 to 100 evaluating grammatical accuracy." },
        vocabulary: { type: "integer", description: "Score from 60 to 100 evaluating vocabulary richness." },
        cefr_level: { type: "string", enum: ["A2", "B1", "B2", "C1", "C2"], description: "Estimated CEFR speaking level of the user's response." }
      },
      required: ["fluency", "grammar", "vocabulary", "cefr_level"]
    }
  },
  required: [
    "reply",
    "follow_up_hint",
    "is_grammar_perfect",
    "corrected_sentence",
    "grammar_explanation",
    "better_expressions",
    "pronunciation_tips",
    "key_vocabulary",
    "scores"
  ]
};

const DEFAULT_SENTENCE_HISTORY = [
  {
    id: "sample-sent-1",
    timestamp: "Today, 2:10 PM",
    scenario: "Casual Daily Talk",
    provider: "gemini-4-argon",
    userSaid: "I am agree with your opinion about remote working.",
    corrected: "I completely agree with your point about remote work.",
    explanation: "'Agree' is a verb, not an adjective, so drop 'am'. Also, 'remote work' sounds more natural than 'remote working'.",
    betterExpression: "I'm totally on the same page when it comes to remote work.",
    starred: true
  },
  {
    id: "sample-sent-2",
    timestamp: "Today, 2:15 PM",
    scenario: "Business Meeting & Pitch",
    provider: "gpt-4o",
    userSaid: "We need to discuss about the schedule for next week launch.",
    corrected: "We need to discuss the schedule for next week's launch.",
    explanation: "'Discuss' takes a direct object without 'about', and 'next week's launch' uses the possessive form.",
    betterExpression: "Let's align on the timeline for next week's rollout.",
    starred: false
  }
];

const DEFAULT_VOCAB_HISTORY = [
  {
    id: "sample-voc-1",
    word: "on the same page",
    meaning: "In agreement; sharing the same understanding of a situation.",
    scenario: "Business Meeting & Pitch",
    timestamp: "Today",
    starred: true
  },
  {
    id: "sample-voc-2",
    word: "have a lot on one's plate",
    meaning: "To have many responsibilities, tasks, or commitments at the same time.",
    scenario: "Casual Daily Talk",
    timestamp: "Today",
    starred: false
  },
  {
    id: "sample-voc-3",
    word: "walk (someone) through",
    meaning: "To slowly and clearly explain a process or background step by step.",
    scenario: "Job Interview Coach",
    timestamp: "Today",
    starred: true
  }
];

function normalizeLearnerLevel(rawLevel) {
  const s = String(rawLevel || "").toLowerCase();
  if (s.includes("beginner") || s.includes("초급") || s.includes("a2") || s === "1") return "beginner";
  if (s.includes("advanced") || s.includes("고급") || s.includes("c1") || s.includes("c2") || s === "3") return "advanced";
  return "intermediate";
}

const LEVEL_PROFILES_CLIENT = {
  beginner: {
    label: "🌱 Lv.1 초급대화 (쉬운 영어 · 1~2문장)",
    promptRule:
      "CONVERSATION LEVEL: 1. Beginner (초급대화). Use easy everyday A2-B1 vocabulary and simple grammar. Keep your reply strictly to 1-2 short sentences total (1 short empathetic reaction + 1 short, easy follow-up question).",
    openingOverrides: {
      casual: "Hi there! How is your day going today?",
      interview: "Welcome! Can you tell me a little bit about yourself?",
      business: "Thanks for joining! How is our project going this week?",
      travel: "Welcome! May I see your passport, please?",
      debate: "Hi! Do you think AI is helpful for students?"
    },
    hintOverrides: {
      casual: "My day is going well, and I am practicing English today.",
      interview: "Sure! I have worked in my field for three years.",
      business: "Our project is going well, and we are on schedule.",
      travel: "Here is my passport. I would like a window seat, please.",
      debate: "Yes, I think AI helps students learn faster."
    }
  },
  intermediate: {
    label: "🌿 Lv.2 중급대화 (중급 어휘 · 최대 4문장)",
    promptRule:
      "CONVERSATION LEVEL: 2. Intermediate (중급대화). Mix moderately richer B1-B2 vocabulary and compound sentences together with short punchy sentences (단문 혼용). Keep your reply between 2 and 4 sentences total (maximum 4 sentences).",
    openingOverrides: null,
    hintOverrides: null
  },
  advanced: {
    label: "🌳 Lv.3 고급대화 (고급 어휘 · 최대 6문장)",
    promptRule:
      "CONVERSATION LEVEL: 3. Advanced (고급대화). Mix sophisticated C1-C2 vocabulary, idioms, and nuanced sentences together with crisp short sentences for natural spoken rhythm (단문 혼용). Keep your reply between 4 and 6 sentences total (maximum 6 sentences).",
    openingOverrides: {
      casual:
        "Hey there! It's always refreshing to pause a hectic schedule and catch up over coffee. I've been curious about what's been keeping you inspired lately. How has your week been unfolding, and have you dived into any exciting projects or personal goals?",
      interview:
        "Welcome, and thank you for making time for our conversation today. In this round, I'd love to explore how you navigate high-stakes challenges and drive cross-functional impact. Let's start with a quick overview. Could you walk me through your background and highlight a pivotal achievement that defines your leadership style?",
      business:
        "Thanks for hopping on this call. Before we lock in the Q4 strategic roadmap, I want to make sure we have complete visibility into our current sprint velocity. Every detail counts right now. Where do we stand on the core deliverables, and are there any cross-team bottlenecks we should clear today?",
      travel:
        "Good evening, and welcome to our priority check-in desk! It looks like we have a full transatlantic flight tonight, though I'd be happy to check our cabin inventory for any preferred seating upgrades. May I take a look at your passport, and do you have any special baggage or lounge requests for your itinerary?",
      debate:
        "Welcome to today's critical thinking forum. Generative AI is rapidly reshaping higher education, sparking fierce debate over whether it empowers personalized learning or erodes foundational critical thinking. Both sides have compelling merit. Where do you stand on this issue, and what guardrails do you think universities should establish?"
    },
    hintOverrides: null
  }
};

// Application State
const state = {
  scenario: "casual",
  provider: localStorage.getItem("speakflow_ai_provider") || "gemini", // "gemini" | "openai"
  apiKey: localStorage.getItem("speakflow_gemini_api_key") || "",
  openaiApiKey: localStorage.getItem("speakflow_openai_api_key") || "",
  model: (localStorage.getItem("speakflow_gemini_model") === "gemini-3.8-flash" ? "gemini-3.8-flash" : "gemini-3.8-flash"),
  openaiModel: "gpt-4o",
  thinkingLevel: localStorage.getItem("speakflow_thinking_level") || "low",
  learnerLevel: normalizeLearnerLevel(localStorage.getItem("speakflow_learner_level") || "intermediate"),
  // Default to "auto-ai" so as soon as a Gemini/OpenAI key is present, it uses the real AI Live Voice!
  ttsEngine: localStorage.getItem("speakflow_tts_engine") || "auto-ai",
  sttEngine: localStorage.getItem("speakflow_stt_engine") || "hybrid",
  voicePersona: localStorage.getItem("speakflow_voice_persona") || "female", // e.g., "gemini:Puck", "openai:coral"
  voiceAccent: localStorage.getItem("speakflow_voice_accent") || "en-US",
  speechRate: parseFloat(localStorage.getItem("speakflow_speech_rate") || "1.0"),
  conversationMode: localStorage.getItem("speakflow_conversation_mode") || (localStorage.getItem("speakflow_auto_speak") === "false" ? "chat" : "voice"),
  autoSpeak: localStorage.getItem("speakflow_conversation_mode") ? (localStorage.getItem("speakflow_conversation_mode") === "voice") : (localStorage.getItem("speakflow_auto_speak") !== "false"),
  // Conversation state
  currentSessionId: "session-" + Date.now(),
  currentMessages: [],
  currentCoaching: null,
  previousInteractionId: null,
  openaiChatHistory: [],
  turnCount: 1,
  wordsSpoken: 0,
  isRecording: false,
  isGenerating: false,
  recognition: null,
  mediaRecorder: null,
  audioChunks: [],
  // Live Voice Call Mode State (Gemini 3.8 Live WebSocket / ChatGPT Live Loop)
  liveWs: null,
  liveAudioCtx: null,
  liveMicStream: null,
  liveScriptProcessor: null,
  liveNextPlayTime: 0,
  isLiveCallActive: false,
  // Persisted History & Review Notebook
  activeHistoryTab: "sentences",
  sentenceHistory: JSON.parse(localStorage.getItem("speakflow_sentence_history") || "null") || DEFAULT_SENTENCE_HISTORY,
  vocabHistory: JSON.parse(localStorage.getItem("speakflow_vocab_history") || "null") || DEFAULT_VOCAB_HISTORY,
  sessionHistory: JSON.parse(localStorage.getItem("speakflow_session_history") || "[]")
};

// DOM References

// ==================== NATURAL SPEECH SYNTHESIS ENGINE (PRE-CACHED VOICES) ====================
let appVoicesCache = [];
function loadSystemVoices() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const v = window.speechSynthesis.getVoices();
    if (v && v.length > 0) {
      appVoicesCache = v;
    }
  }
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadSystemVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadSystemVoices();
  };
}

const dom = {
  scenarioList: document.getElementById("scenarioList"),
  activeScenarioIcon: document.getElementById("activeScenarioIcon"),
  activeScenarioTitle: document.getElementById("activeScenarioTitle"),
  activeScenarioSubtitle: document.getElementById("activeScenarioSubtitle"),
  headerProviderIcon: document.getElementById("headerProviderIcon"),
  quickModelSelect: document.getElementById("quickModelSelect"),
  quickVoicePersonaSelect: document.getElementById("quickVoicePersonaSelect"),
  audioToggleBtn: document.getElementById("audioToggleBtn"),
  audioToggleIcon: document.getElementById("audioToggleIcon"),
  audioToggleLabel: document.getElementById("audioToggleLabel"),
  quickModeIcon: document.getElementById("quickModeIcon"),
  quickModeSelect: document.getElementById("quickModeSelect"),
  quickLevelSelect: document.getElementById("quickLevelSelect"),
  startLiveOrbBtn: document.getElementById("startLiveOrbBtn"),
  saveSessionBtn: document.getElementById("saveSessionBtn"),
  openSavedChatsBtn: document.getElementById("openSavedChatsBtn"),
  savedConversationsModal: document.getElementById("savedConversationsModal"),
  closeSavedConvBtn: document.getElementById("closeSavedConvBtn"),
  savedConvListView: document.getElementById("savedConvListView"),
  savedConvList: document.getElementById("savedConvList"),
  savedConvDetailView: document.getElementById("savedConvDetailView"),
  backToSavedListBtn: document.getElementById("backToSavedListBtn"),
  savedDetailMeta: document.getElementById("savedDetailMeta"),
  savedChatTranscript: document.getElementById("savedChatTranscript"),
  resumeSavedChatBtn: document.getElementById("resumeSavedChatBtn"),
  deleteCurrentSavedChatBtn: document.getElementById("deleteCurrentSavedChatBtn"),
  chatStream: document.getElementById("chatStream"),
  hintText: document.getElementById("hintText"),
  listenHintBtn: document.getElementById("listenHintBtn"),
  useHintBtn: document.getElementById("useHintBtn"),
  micBtn: document.getElementById("micBtn"),
  micLabel: document.getElementById("micLabel"),
  voiceVisualizer: document.getElementById("voiceVisualizer"),
  listeningStatus: document.getElementById("listeningStatus"),
  stopMicBtn: document.getElementById("stopMicBtn"),
  selfAudioBar: document.getElementById("selfAudioBar"),
  userAudioPlayback: document.getElementById("userAudioPlayback"),
  userInput: document.getElementById("userInput"),
  sendBtn: document.getElementById("sendBtn"),
  resetChatBtn: document.getElementById("resetChatBtn"),
  // Live Voice Overlay
  liveVoiceOverlay: document.getElementById("liveVoiceOverlay"),
  liveModeEngineBadge: document.getElementById("liveModeEngineBadge"),
  closeLiveOrbBtn: document.getElementById("closeLiveOrbBtn"),
  liveOrbVisual: document.getElementById("liveOrbVisual"),
  liveOrbEmoji: document.getElementById("liveOrbEmoji"),
  liveStateTitle: document.getElementById("liveStateTitle"),
  liveStateSubtitle: document.getElementById("liveStateSubtitle"),
  liveUserTranscript: document.getElementById("liveUserTranscript"),
  liveAiTranscript: document.getElementById("liveAiTranscript"),
  toggleLiveStreamBtn: document.getElementById("toggleLiveStreamBtn"),
  endLiveCallBtn: document.getElementById("endLiveCallBtn"),
  // Coaching panel
  bookmarkCurrentCorrectionBtn: document.getElementById("bookmarkCurrentCorrectionBtn"),
  grammarStatusBadge: document.getElementById("grammarStatusBadge"),
  grammarScoreBadge: document.getElementById("grammarScoreBadge"),
  fluencyScoreBadge: document.getElementById("fluencyScoreBadge"),
  coachingScorePill: document.getElementById("coachingScorePill"),
  userSentenceStatus: document.getElementById("userSentenceStatus"),
  lastUserUtterance: document.getElementById("lastUserUtterance"),
  correctedSentence: document.getElementById("correctedSentence"),
  grammarExplanation: document.getElementById("grammarExplanation"),
  betterExpressionsList: document.getElementById("betterExpressionsList"),
  pronunciationBox: document.getElementById("pronunciationBox"),
  vocabList: document.getElementById("vocabList"),
  // Metrics
  cefrBadge: document.getElementById("cefrBadge"),
  fluencyScore: document.getElementById("fluencyScore"),
  fluencyBar: document.getElementById("fluencyBar"),
  grammarScore: document.getElementById("grammarScore"),
  grammarBar: document.getElementById("grammarBar"),
  vocabScore: document.getElementById("vocabScore"),
  vocabBar: document.getElementById("vocabBar"),
  turnCount: document.getElementById("turnCount"),
  wordCount: document.getElementById("wordCount"),
  savedPhrasesCount: document.getElementById("savedPhrasesCount"),
  // History Modal & Hub
  openHistoryBtn: document.getElementById("openHistoryBtn"),
  historyTotalBadge: document.getElementById("historyTotalBadge"),
  historyModal: document.getElementById("historyModal"),
  closeHistoryBtn: document.getElementById("closeHistoryBtn"),
  doneHistoryBtn: document.getElementById("doneHistoryBtn"),
  exportHistoryBtn: document.getElementById("exportHistoryBtn"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  historySearchInput: document.getElementById("historySearchInput"),
  filterStarredOnly: document.getElementById("filterStarredOnly"),
  tabCountSentences: document.getElementById("tabCountSentences"),
  tabCountVocab: document.getElementById("tabCountVocab"),
  tabCountSessions: document.getElementById("tabCountSessions"),
  tabPanelSentences: document.getElementById("tabPanelSentences"),
  tabPanelVocabulary: document.getElementById("tabPanelVocabulary"),
  tabPanelSessions: document.getElementById("tabPanelSessions"),
  sentenceHistoryList: document.getElementById("sentenceHistoryList"),
  vocabHistoryList: document.getElementById("vocabHistoryList"),
  sessionHistoryList: document.getElementById("sessionHistoryList"),
  // Settings & Status
  apiStatusDot: document.getElementById("apiStatusDot"),
  apiStatusText: document.getElementById("apiStatusText"),
  openSettingsBtn: document.getElementById("openSettingsBtn"),
  settingsModal: document.getElementById("settingsModal"),
  closeSettingsBtn: document.getElementById("closeSettingsBtn"),
  providerSelect: document.getElementById("providerSelect"),
  geminiModelGroup: document.getElementById("geminiModelGroup"),
  openaiModelGroup: document.getElementById("openaiModelGroup"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  toggleKeyVisibility: document.getElementById("toggleKeyVisibility"),
  openaiApiKeyInput: document.getElementById("openaiApiKeyInput"),
  toggleOpenaiKeyVisibility: document.getElementById("toggleOpenaiKeyVisibility"),
  modelSelect: document.getElementById("modelSelect"),
  openaiModelSelect: document.getElementById("openaiModelSelect"),
  ttsEngineSelect: document.getElementById("ttsEngineSelect"),
  sttEngineSelect: document.getElementById("sttEngineSelect"),
  learnerLevelSelect: document.getElementById("learnerLevelSelect"),
  voiceAccentSelect: document.getElementById("voiceAccentSelect"),
  speechRateSelect: document.getElementById("speechRateSelect"),
  autoSpeakToggle: document.getElementById("autoSpeakToggle"),
  testVoiceBtn: document.getElementById("testVoiceBtn"),
  testConnectionBtn: document.getElementById("testConnectionBtn"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  toastNotification: document.getElementById("toastNotification"),
  // Mobile Navigation
  appShell: document.getElementById("appShell"),
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  mobileSidebarCloseBtn: document.getElementById("mobileSidebarCloseBtn"),
  mobileDrawerBackdrop: document.getElementById("mobileDrawerBackdrop"),
  mobileTabChat: document.getElementById("mobileTabChat"),
  mobileTabCoach: document.getElementById("mobileTabCoach"),
  mobileCoachBadge: document.getElementById("mobileCoachBadge"),
  mobileBackToChatBtn: document.getElementById("mobileBackToChatBtn")
};

function setMobileActiveView(viewName) {
  if (!dom.appShell) return;
  dom.appShell.setAttribute("data-mobile-view", viewName);
  if (dom.mobileTabChat) dom.mobileTabChat.classList.toggle("active", viewName === "chat");
  if (dom.mobileTabCoach) dom.mobileTabCoach.classList.toggle("active", viewName === "coach");
  if (viewName === "coach" && dom.mobileCoachBadge) {
    dom.mobileCoachBadge.classList.add("hidden");
  }
}

function openMobileSidebar() {
  if (dom.appShell) dom.appShell.classList.add("sidebar-open");
}

function closeMobileSidebar() {
  if (dom.appShell) dom.appShell.classList.remove("sidebar-open");
}

// Initialize Application
function initApp() {
  persistHistoryToStorage();
  syncSettingsUI();
  setupSpeechRecognition();
  bindEvents();
  loadScenario(state.scenario);
  updateHistoryBadges();
  setMobileActiveView("chat");
}

function getActiveModelString() {
  return state.provider === "openai" ? state.openaiModel : state.model;
}

function hasGeminiKey() {
  return Boolean(state.apiKey && state.apiKey.trim().length > 10);
}

function hasOpenAIKey() {
  return Boolean(state.openaiApiKey && state.openaiApiKey.trim().length > 10);
}

function hasActiveApiKey() {
  return state.provider === "openai" ? hasOpenAIKey() : hasGeminiKey();
}

const MODEL_DEFAULT_VOICE_MAP = {
  "gemini-4-argon": "gemini:Kore",
  "gemini-3.8-flash": "gemini:Puck",
  "gemini-3.5-flash-lite": "gemini:Aoede",
  "gpt-4o": "openai:coral",
  "gpt-4o-mini": "openai:ash",
  "o3-mini": "openai:sage"
};

function getParsedVoicePersona() {
  const isMale = (state.voicePersona === "male");
  return {
    voiceProvider: isMale ? "openai" : "gemini",
    voiceName: isMale ? "Guy" : "Jenny",
    voiceDisplayName: isMale ? "Male (Natural)" : "Female (Natural)",
    gender: isMale ? "male" : "female"
  };
}

function getDynamicRolePrompt(scenarioKey) {
  const sc = SCENARIOS[scenarioKey] || SCENARIOS.casual;
  const { voiceDisplayName } = getParsedVoicePersona();
  return sc.rolePrompt.replace(
    /You are (Alex|Jordan|Morgan|Elena|Coach Sam),/i,
    `You are ${voiceDisplayName},`
  );
}

function syncSettingsUI() {
  dom.providerSelect.value = state.provider;
  dom.apiKeyInput.value = state.apiKey;
  dom.openaiApiKeyInput.value = state.openaiApiKey;
  dom.modelSelect.value = state.model;
  dom.openaiModelSelect.value = state.openaiModel;
  state.learnerLevel = normalizeLearnerLevel(state.learnerLevel);
  if (dom.learnerLevelSelect) dom.learnerLevelSelect.value = state.learnerLevel;
  if (dom.quickLevelSelect) dom.quickLevelSelect.value = state.learnerLevel;
  dom.ttsEngineSelect.value = state.ttsEngine;
  if (dom.sttEngineSelect) dom.sttEngineSelect.value = state.sttEngine;
  dom.voiceAccentSelect.value = state.voiceAccent;
  dom.speechRateSelect.value = String(state.speechRate);
  dom.autoSpeakToggle.checked = state.autoSpeak;

  if (dom.quickModeSelect) {
    dom.quickModeSelect.value = state.conversationMode || (state.autoSpeak ? "voice" : "chat");
  }
  if (dom.quickModeIcon) {
    dom.quickModeIcon.innerHTML = (state.conversationMode === "voice" || state.autoSpeak)
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  }
  if (dom.userInput) {
    dom.userInput.addEventListener("input", () => {
      interruptPipecatPlayback();
    });
  }
  if (dom.userInput) {
    dom.userInput.placeholder = (state.conversationMode === "voice" || state.autoSpeak)
      ? "Type in English (or press mic to speak)..."
      : "Type in English (Chat Mode · Silent Messenger)...";
  }

  dom.geminiModelGroup.classList.toggle("hidden", state.provider !== "gemini");
  dom.openaiModelGroup.classList.toggle("hidden", state.provider !== "openai");

  const quickValue = `${state.provider}:${getActiveModelString()}`;
  if ([...dom.quickModelSelect.options].some((o) => o.value === quickValue)) {
    dom.quickModelSelect.value = quickValue;
  }
  if (
    dom.quickVoicePersonaSelect &&
    [...dom.quickVoicePersonaSelect.options].some((o) => o.value === state.voicePersona)
  ) {
    dom.quickVoicePersonaSelect.value = state.voicePersona;
  }

  dom.headerProviderIcon.innerHTML = state.provider === "openai"
    ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M12 2v6"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/></svg>`
    : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`;

  const activeModel = getActiveModelString();
  const { voiceName } = getParsedVoicePersona();
  const demoBanner = document.getElementById("demoModeBanner");
  if (demoBanner) demoBanner.classList.add("hidden");

  if (dom.apiStatusDot) dom.apiStatusDot.className = "status-dot live";
  const label = state.provider === "openai" ? "Live ChatGPT" : "Live Gemini";
  if (dom.apiStatusText) {
    if (hasActiveApiKey()) {
      dom.apiStatusText.textContent = `${label} (${activeModel} · Voice: ${voiceName} · Custom Key)`;
    } else {
      dom.apiStatusText.textContent = `${label} (${activeModel} · Voice: ${voiceName} · No Key Needed)`;
    }
  }
}

function isSentenceSavedInHistory(targetText) {
  if (!targetText || !state.sentenceHistory) return false;
  const norm = targetText.trim().toLowerCase();
  return state.sentenceHistory.some(
    (s) => (s.corrected && s.corrected.trim().toLowerCase() === norm) ||
           (s.userSaid && s.userSaid.trim().toLowerCase() === norm)
  );
}

function removeSentenceFromHistory(targetText) {
  if (!targetText || !state.sentenceHistory) return;
  const norm = targetText.trim().toLowerCase();
  state.sentenceHistory = state.sentenceHistory.filter(
    (s) => (s.corrected && s.corrected.trim().toLowerCase() !== norm) &&
           (s.userSaid && s.userSaid.trim().toLowerCase() !== norm)
  );
  persistHistoryToStorage();
  updateHistoryBadges();
  if (dom.historyModal && !dom.historyModal.classList.contains("hidden")) {
    renderHistoryModalContent();
  }
}

function openHistoryModal(targetTab = "sentences") {
  renderHistoryModalContent();
  dom.historyModal.classList.remove("hidden");
  document.querySelectorAll(".history-tab").forEach((b) => {
    const isTarget = b.dataset.tab === targetTab;
    b.classList.toggle("active", isTarget);
  });
  state.activeHistoryTab = targetTab;
  dom.tabPanelSentences.classList.toggle("hidden", targetTab !== "sentences");
  dom.tabPanelVocabulary.classList.toggle("hidden", targetTab !== "vocabulary");
  dom.tabPanelSessions.classList.toggle("hidden", targetTab !== "sessions");
}

function showToast(message, actionCallback = null) {
  dom.toastNotification.textContent = message;
  dom.toastNotification.classList.remove("hidden");
  dom.toastNotification.onclick = actionCallback || (() => {
    openHistoryModal("sentences");
  });
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    dom.toastNotification.classList.add("hidden");
  }, 3400);
}

function copyTextToClipboard(text, onSuccess) {
  if (!text) return;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      if (onSuccess) onSuccess();
    }).catch(() => fallbackCopy(text, onSuccess));
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Copy failed:", err);
  }
}

function formatNow() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function loadScenario(scenarioKey) {
  const sc = SCENARIOS[scenarioKey] || SCENARIOS.casual;
  state.scenario = sc.id;
  state.currentSessionId = "session-" + Date.now();
  state.currentMessages = [];
  state.previousInteractionId = null;
  state.openaiChatHistory = [];
  state.turnCount = 1;
  dom.turnCount.textContent = "1";

  document.querySelectorAll(".scenario-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.scenario === sc.id);
  });

  dom.activeScenarioIcon.innerHTML = sc.svgIcon || sc.icon;
  dom.activeScenarioTitle.textContent = sc.title;
  dom.activeScenarioSubtitle.textContent = sc.subtitle;

  const levelKey = normalizeLearnerLevel(state.learnerLevel);
  const levelCfg = LEVEL_PROFILES_CLIENT[levelKey] || LEVEL_PROFILES_CLIENT.intermediate;
  const openingMsg = levelCfg.openingOverrides?.[sc.id] || sc.openingMessage;
  const starterHint = levelCfg.hintOverrides?.[sc.id] || sc.starterHint;

  dom.chatStream.innerHTML = "";
  appendMessage("ai", openingMsg);

  dom.hintText.textContent = `"${starterHint}"`;

  state.currentCoaching = sc.initialCoaching;
  renderCoachingFeedback(sc.initialCoaching);
}

function appendMessage(role, text, recordInSession = true) {
  if (recordInSession) {
    state.currentMessages.push({
      role,
      text,
      timestamp: formatNow()
    });
  }

  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  // AI 메시지에만 정갈한 모노크롬 AI 아이콘 아바타 표시, 사용자(user)는 아이콘을 완전 생략하여 깔끔한 우측 정렬
  if (role === "ai") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`;
    row.appendChild(avatar);
  }

  const wrap = document.createElement("div");
  wrap.className = "bubble-wrap";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);

  const actions = document.createElement("div");
  actions.className = "bubble-actions";

  const listenBtn = document.createElement("button");
  listenBtn.className = "btn-bubble-action";
  listenBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Listen</span>`;
  listenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    speakText(text);
  });
  actions.appendChild(listenBtn);

  const copyBtn = document.createElement("button");
  copyBtn.className = "btn-bubble-action";
  copyBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    copyTextToClipboard(text, () => {
      copyBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span style="color:#22c55e;">Copied!</span>`;
      showToast("Copied sentence to clipboard!");
      setTimeout(() => {
        copyBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
      }, 1500);
    });
  });
  actions.appendChild(copyBtn);

  const saveSentenceBtn = document.createElement("button");
  saveSentenceBtn.className = "btn-bubble-action";
  const refreshSaveBtnUI = () => {
    const isSaved = isSentenceSavedInHistory(text);
    if (isSaved) {
      saveSentenceBtn.classList.add("saved");
      saveSentenceBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="#10b981" stroke="#10b981" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Saved</span>`;
    } else {
      saveSentenceBtn.classList.remove("saved");
      saveSentenceBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
    }
  };
  refreshSaveBtnUI();

  saveSentenceBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentlySaved = isSentenceSavedInHistory(text);
    if (currentlySaved) {
      removeSentenceFromHistory(text);
      refreshSaveBtnUI();
      showToast("Removed from Review Notebook");
    } else {
      saveSentenceToHistory({
        userSaid: role === "user" ? text : "(Saved AI Expression)",
        corrected: text,
        explanation: role === "user" ? "Bookmarked speaking turn." : "Bookmarked native response.",
        betterExpression: text,
        starred: true
      });
      refreshSaveBtnUI();
      showToast("Saved to Review Notebook! (Click to view)");
    }
  });
  actions.appendChild(saveSentenceBtn);

  wrap.appendChild(actions);
  row.appendChild(wrap);
  dom.chatStream.appendChild(row);
  dom.chatStream.scrollTop = dom.chatStream.scrollHeight;
}

// ==================== WORD-LEVEL DIFF & HTML HELPERS ====================
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function computeWordDiff(origText, fixedText) {
  if (!origText || !fixedText) {
    return {
      origHtml: escapeHtml(origText || ""),
      fixedHtml: escapeHtml(fixedText || ""),
      hasErrors: false
    };
  }

  // Tokenize by whitespace
  const origWords = origText.trim().split(/\s+/).filter(Boolean);
  const fixedWords = fixedText.trim().split(/\s+/).filter(Boolean);

  // Normalization for matching (strip punctuation, lowercase)
  const cleanWord = (w) => w.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, "");

  const n = origWords.length;
  const m = fixedWords.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (cleanWord(origWords[i - 1]) === cleanWord(fixedWords[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = n, j = m;
  const origDiff = [];
  const fixedDiff = [];
  let errorCount = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cleanWord(origWords[i - 1]) === cleanWord(fixedWords[j - 1])) {
      origDiff.unshift({ text: origWords[i - 1], type: "same" });
      fixedDiff.unshift({ text: fixedWords[j - 1], type: "same" });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      // Added or corrected in new sentence
      fixedDiff.unshift({ text: fixedWords[j - 1], type: "fixed" });
      errorCount++;
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      // Error in original sentence
      origDiff.unshift({ text: origWords[i - 1], type: "error" });
      errorCount++;
      i--;
    }
  }

  const origHtml = origDiff
    .map((item) =>
      item.type === "error"
        ? `<span class="diff-error">${escapeHtml(item.text)}</span>`
        : escapeHtml(item.text)
    )
    .join(" ");

  const fixedHtml = fixedDiff
    .map((item) =>
      item.type === "fixed"
        ? `<span class="diff-fixed">${escapeHtml(item.text)}</span>`
        : escapeHtml(item.text)
    )
    .join(" ");

  return { origHtml, fixedHtml, hasErrors: errorCount > 0 };
}

function renderCoachingFeedback(coaching) {
  state.currentCoaching = coaching;

  const rawUserUtterance = (coaching.lastUtterance || "").trim();
  const primarySentence = (coaching.correctedSentence || rawUserUtterance || "").trim();
  const isInitialOrPlaceholder = !rawUserUtterance || rawUserUtterance.startsWith("Speak or type") || rawUserUtterance.startsWith("대화를 입력") || rawUserUtterance.startsWith("Ready for your first");

  // 1. 내 문장 가시성 대폭 향상 & 틀린 단어 빨간색 취소선 하이라이트
  if (isInitialOrPlaceholder) {
    if (dom.lastUserUtterance) {
      dom.lastUserUtterance.textContent = `"대화를 입력하거나 음성으로 말하면 어법 분석과 교정이 여기에 표시됩니다."`;
    }
    if (dom.userSentenceStatus) {
      dom.userSentenceStatus.textContent = "";
      dom.userSentenceStatus.className = "user-sentence-status hidden";
    }
  } else {
    const diff = computeWordDiff(rawUserUtterance, primarySentence);
    if (dom.lastUserUtterance) {
      dom.lastUserUtterance.innerHTML = `"${diff.origHtml}"`;
    }
    if (dom.userSentenceStatus) {
      const cleanRaw = rawUserUtterance.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanFix = primarySentence.toLowerCase().replace(/[^a-z0-9]/g, "");
      const hasErrors = diff.hasErrors || (!coaching.isPerfect && cleanRaw !== cleanFix);

      if (!hasErrors && coaching.isPerfect) {
        dom.userSentenceStatus.textContent = "✅ 어법 완벽 (오류 없음)";
        dom.userSentenceStatus.className = "user-sentence-status perfect";
      } else {
        dom.userSentenceStatus.textContent = "";
        dom.userSentenceStatus.className = "user-sentence-status hidden";
      }
    }
  }

  if (dom.grammarExplanation) {
    dom.grammarExplanation.textContent = coaching.grammarExplanation || "문맥에 맞는 정확한 시제, 전치사, 관사 및 원어민 어순을 안내해 드립니다.";
  }

  // Mobile: If user receives new coaching while on Chat view, show notification badge on Coach tab!
  if (!isInitialOrPlaceholder && dom.mobileCoachBadge && dom.appShell && dom.appShell.getAttribute("data-mobile-view") !== "coach") {
    dom.mobileCoachBadge.classList.remove("hidden");
  }

  // 2. 실시간 평가 점수표 업데이트 (어법 점수 / 자연스러움 점수)
  if (coaching.scores || state.latestScores) {
    const sc = coaching.scores || state.latestScores;
    const gScore = typeof sc.grammar === "number" ? sc.grammar : (coaching.isPerfect ? 96 : 88);
    const fScore = typeof sc.fluency === "number" ? sc.fluency : 85;

    if (dom.grammarScoreBadge) {
      dom.grammarScoreBadge.textContent = `어법 ${gScore}점`;
    }
    if (dom.fluencyScoreBadge) {
      dom.fluencyScoreBadge.textContent = `자연스러움 ${fScore}점`;
    }
  }

  // 3. '어법 교정' 메인 카드와 '추천 1, 추천 2' 서브 카드를 명확하게 분리 렌더링
  dom.correctedSentence.innerHTML = "";

  // 3-1. 메인 'Grammar Fix' 카드 생성
  const primaryCard = document.createElement("div");
  primaryCard.className = "primary-fix-card";

  const primaryTop = document.createElement("div");
  primaryTop.className = "primary-fix-top";

  const primaryBadge = document.createElement("span");
  primaryBadge.className = "primary-fix-badge";
  primaryBadge.textContent = "Grammar Fix";

  const primaryBtnGroup = document.createElement("div");
  primaryBtnGroup.style.display = "flex";
  primaryBtnGroup.style.gap = "5px";

  const btnListenPrimary = document.createElement("button");
  btnListenPrimary.className = "btn-bubble-action";
  btnListenPrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Listen</span>`;
  btnListenPrimary.addEventListener("click", (e) => {
    e.stopPropagation();
    speakText(primarySentence);
  });

  const btnCopyPrimary = document.createElement("button");
  btnCopyPrimary.className = "btn-bubble-action";
  btnCopyPrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
  btnCopyPrimary.addEventListener("click", (e) => {
    e.stopPropagation();
    copyTextToClipboard(primarySentence, () => {
      btnCopyPrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span style="color:#22c55e;">Copied!</span>`;
      showToast(`Copied "Grammar Fix" to clipboard!`);
      setTimeout(() => {
        btnCopyPrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
      }, 1500);
    });
  });

  const btnSavePrimary = document.createElement("button");
  btnSavePrimary.className = "btn-bubble-action";
  const refreshSavePrimaryUI = () => {
    const isSaved = isSentenceSavedInHistory(primarySentence);
    if (isSaved) {
      btnSavePrimary.classList.add("saved");
      btnSavePrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="#10b981" stroke="#10b981" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Saved</span>`;
    } else {
      btnSavePrimary.classList.remove("saved");
      btnSavePrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
    }
  };
  refreshSavePrimaryUI();

  btnSavePrimary.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentlySaved = isSentenceSavedInHistory(primarySentence);
    if (currentlySaved) {
      removeSentenceFromHistory(primarySentence);
      refreshSavePrimaryUI();
      showToast(`Removed "Grammar Fix" from Review Notebook`);
    } else {
      saveSentenceToHistory({
        userSaid: rawUserUtterance || "(Practice Sentence)",
        corrected: primarySentence,
        explanation: `Grammar Fix`,
        betterExpression: primarySentence,
        starred: true
      });
      refreshSavePrimaryUI();
      showToast(`Saved "Grammar Fix" to Review Notebook! (Click to view)`);
    }
  });

  primaryBtnGroup.appendChild(btnListenPrimary);
  primaryBtnGroup.appendChild(btnCopyPrimary);
  primaryBtnGroup.appendChild(btnSavePrimary);
  primaryTop.appendChild(primaryBadge);
  primaryTop.appendChild(primaryBtnGroup);

  const primaryTextDiv = document.createElement("div");
  primaryTextDiv.className = "primary-fix-text";

  // 맞는 문장 보여줄 때 고쳐진/누락된 단어를 녹색 강조로 표기
  if (!isInitialOrPlaceholder) {
    const diff = computeWordDiff(rawUserUtterance, primarySentence);
    primaryTextDiv.innerHTML = `"${diff.fixedHtml}"`;
  } else {
    primaryTextDiv.textContent = `"${primarySentence}"`;
  }

  primaryCard.appendChild(primaryTop);
  primaryCard.appendChild(primaryTextDiv);
  dom.correctedSentence.appendChild(primaryCard);

  // 3-2. 추천 1, 추천 2 서브 카드 생성 (군더더기 설명 문구 없이 바로 이어짐)
  let altPhrases = [];
  if (Array.isArray(coaching.betterExpressions) && coaching.betterExpressions.length > 0) {
    altPhrases = coaching.betterExpressions
      .filter((ex) => ex?.phrase && ex.phrase.trim() !== primarySentence.trim())
      .map((ex) => ({ phrase: ex.phrase.trim() }));
  }
  if (altPhrases.length === 0 && Array.isArray(coaching.correctedVariants) && coaching.correctedVariants.length > 1) {
    altPhrases = coaching.correctedVariants
      .slice(1)
      .filter((v) => v?.sentence && v.sentence.trim() !== primarySentence.trim())
      .map((v) => ({ phrase: v.sentence.trim() }));
  }

  if (altPhrases.length > 0) {
    const altSection = document.createElement("div");
    altSection.className = "alt-variants-section";

    altPhrases.slice(0, 2).forEach((ex, idx) => {
      const altCard = document.createElement("div");
      altCard.className = "alt-variant-card";

      const altTop = document.createElement("div");
      altTop.className = "alt-variant-top";

      const altLabel = document.createElement("span");
      altLabel.className = "alt-variant-label";
      altLabel.textContent = `Alternative ${idx + 1}`;

      const altBtns = document.createElement("div");
      altBtns.style.display = "flex";
      altBtns.style.gap = "5px";

      const btnListenAlt = document.createElement("button");
      btnListenAlt.className = "btn-bubble-action";
      btnListenAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Listen</span>`;
      btnListenAlt.addEventListener("click", (e) => {
        e.stopPropagation();
        speakText(ex.phrase);
      });

      const btnCopyAlt = document.createElement("button");
      btnCopyAlt.className = "btn-bubble-action";
      btnCopyAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
      btnCopyAlt.addEventListener("click", (e) => {
        e.stopPropagation();
        copyTextToClipboard(ex.phrase, () => {
          btnCopyAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span style="color:#22c55e;">Copied!</span>`;
          showToast(`Copied "Alternative ${idx + 1}" to clipboard!`);
          setTimeout(() => {
            btnCopyAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
          }, 1500);
        });
      });

      const btnSaveAlt = document.createElement("button");
      btnSaveAlt.className = "btn-bubble-action";
      const refreshSaveAltUI = () => {
        const isSaved = isSentenceSavedInHistory(ex.phrase);
        if (isSaved) {
          btnSaveAlt.classList.add("saved");
          btnSaveAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="#10b981" stroke="#10b981" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Saved</span>`;
        } else {
          btnSaveAlt.classList.remove("saved");
          btnSaveAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
        }
      };
      refreshSaveAltUI();

      btnSaveAlt.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentlySaved = isSentenceSavedInHistory(ex.phrase);
        if (currentlySaved) {
          removeSentenceFromHistory(ex.phrase);
          refreshSaveAltUI();
          showToast(`Removed "Alternative ${idx + 1}" from Review Notebook`);
        } else {
          saveSentenceToHistory({
            userSaid: rawUserUtterance || "(Practice Sentence)",
            corrected: ex.phrase,
            explanation: `Alternative ${idx + 1} — ${coaching.grammarExplanation || ""}`,
            betterExpression: ex.phrase,
            starred: true
          });
          refreshSaveAltUI();
          showToast(`Saved "Alternative ${idx + 1}" to Review Notebook! (Click to view)`);
        }
      });

      altBtns.appendChild(btnListenAlt);
      altBtns.appendChild(btnCopyAlt);
      altBtns.appendChild(btnSaveAlt);
      altTop.appendChild(altLabel);
      altTop.appendChild(altBtns);

      const altText = document.createElement("div");
      altText.className = "alt-variant-text";
      altText.textContent = `"${ex.phrase}"`;

      altCard.appendChild(altTop);
      altCard.appendChild(altText);
      altSection.appendChild(altCard);
    });

    dom.correctedSentence.appendChild(altSection);
  }

  if (dom.grammarStatusBadge) {
    if (coaching.isPerfect) {
      dom.grammarStatusBadge.className = "badge-status good";
      dom.grammarStatusBadge.textContent = "Ready";
    } else {
      dom.grammarStatusBadge.className = "badge-status refine";
      dom.grammarStatusBadge.textContent = "Ready";
    }
  }

  // 4. Sound More Like a Native
  dom.betterExpressionsList.innerHTML = "";
  const nativeExpressions = Array.isArray(coaching.betterExpressions) && coaching.betterExpressions.length > 0
    ? coaching.betterExpressions
    : (altPhrases.map((a, i) => ({ tone: i === 0 ? "Casual Native" : "Fluent & Expressive", phrase: a.phrase })));

  nativeExpressions.forEach((item) => {
    const card = document.createElement("div");
    card.className = "expression-item";

    const top = document.createElement("div");
    top.className = "expression-top";

    const tag = document.createElement("span");
    tag.className = "tone-tag";
    tag.textContent = item.tone;

    const btnGroup = document.createElement("div");
    btnGroup.style.display = "flex";
    btnGroup.style.gap = "6px";

    const btnListen = document.createElement("button");
    btnListen.className = "btn-bubble-action";
    btnListen.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Listen</span>`;
    btnListen.addEventListener("click", () => speakText(item.phrase));

    const btnSave = document.createElement("button");
    btnSave.className = "btn-bubble-action";
    btnSave.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
    btnSave.addEventListener("click", () => {
      saveSentenceToHistory({
        userSaid: coaching.lastUtterance || "(Native Upgrade)",
        corrected: item.phrase,
        explanation: `Native ${item.tone} expression upgrade.`,
        betterExpression: item.phrase,
        starred: true
      });
      showToast("Saved expression to Review Notebook!");
    });

    btnGroup.appendChild(btnListen);
    btnGroup.appendChild(btnSave);

    top.appendChild(tag);
    top.appendChild(btnGroup);

    const phrase = document.createElement("div");
    phrase.className = "expression-phrase";
    phrase.textContent = `"${item.phrase}"`;

    card.appendChild(top);
    card.appendChild(phrase);
    dom.betterExpressionsList.appendChild(card);
  });

  // 5. Pronunciation & Rhythm Tips
  dom.pronunciationBox.innerHTML = "";
  (coaching.pronunciationTips || []).forEach((pt) => {
    const div = document.createElement("div");
    div.className = "pron-tip";
    const strong = document.createElement("strong");
    strong.textContent = pt.word;
    const span = document.createElement("span");
    span.textContent = pt.tip;
    div.appendChild(strong);
    div.appendChild(span);
    dom.pronunciationBox.appendChild(div);
  });

  // 6. Vocabulary & Idioms
  dom.vocabList.innerHTML = "";
  (coaching.vocabulary || []).forEach((v) => {
    const div = document.createElement("div");
    div.className = "vocab-item";

    const top = document.createElement("div");
    top.className = "vocab-item-top";

    const word = document.createElement("div");
    word.className = "vocab-word";
    word.textContent = v.word;

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "5px";

    const speakWordBtn = document.createElement("button");
    speakWordBtn.className = "btn-bubble-action";
    speakWordBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    speakWordBtn.title = "Listen to word";
    speakWordBtn.addEventListener("click", () => speakText(v.word));

    const saveWordBtn = document.createElement("button");
    saveWordBtn.className = "btn-bubble-action";
    saveWordBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>Save</span>`;
    saveWordBtn.title = "Save to Vocabulary Bank";
    saveWordBtn.addEventListener("click", () => {
      saveVocabToHistory(v.word, v.meaning, true);
      showToast(`Saved "${v.word}" to Vocabulary Bank!`);
    });

    actions.appendChild(speakWordBtn);
    actions.appendChild(saveWordBtn);
    top.appendChild(word);
    top.appendChild(actions);

    const meaning = document.createElement("div");
    meaning.className = "vocab-meaning";
    meaning.textContent = v.meaning;

    div.appendChild(top);
    div.appendChild(meaning);
    dom.vocabList.appendChild(div);
  });
}


function updateMetrics(scores, userText) {
  const words = userText.trim().split(/\s+/).filter(Boolean).length;
  state.wordsSpoken += words;
  state.turnCount += 1;

  dom.turnCount.textContent = String(state.turnCount);
  dom.wordCount.textContent = String(state.wordsSpoken);

  if (scores) {
    state.latestScores = scores;
    dom.cefrBadge.textContent = `CEFR: ${scores.cefr_level || "B2"}`;
    dom.fluencyScore.textContent = `${scores.fluency}%`;
    dom.fluencyBar.style.width = `${scores.fluency}%`;
    dom.grammarScore.textContent = `${scores.grammar}%`;
    dom.grammarBar.style.width = `${scores.grammar}%`;
    dom.vocabScore.textContent = `${scores.vocabulary}%`;
    dom.vocabBar.style.width = `${scores.vocabulary}%`;

    // 실시간 평가 점수표 (어법 & 자연스러움)
    if (dom.grammarScoreBadge) {
      dom.grammarScoreBadge.textContent = `어법 ${scores.grammar}점`;
    }
    if (dom.fluencyScoreBadge) {
      dom.fluencyScoreBadge.textContent = `자연스러움 ${scores.fluency}점`;
    }
  }
  updateHistoryBadges();
}

// ==================== SPEAKING HISTORY & REVIEW NOTEBOOK LOGIC ====================
function persistHistoryToStorage() {
  localStorage.setItem("speakflow_sentence_history", JSON.stringify(state.sentenceHistory));
  localStorage.setItem("speakflow_vocab_history", JSON.stringify(state.vocabHistory));
  localStorage.setItem("speakflow_session_history", JSON.stringify(state.sessionHistory));
}

function updateHistoryBadges() {
  const totalItems = state.sentenceHistory.length + state.vocabHistory.length;
  if (dom.historyTotalBadge) dom.historyTotalBadge.textContent = String(totalItems);
  dom.savedPhrasesCount.textContent = String(totalItems);
  dom.tabCountSentences.textContent = String(state.sentenceHistory.length);
  dom.tabCountVocab.textContent = String(state.vocabHistory.length);
  dom.tabCountSessions.textContent = String(state.sessionHistory.length);
}

function saveSentenceToHistory({ userSaid, corrected, explanation, betterExpression = "", starred = false }) {
  const exists = state.sentenceHistory.find(
    (s) => s.userSaid === userSaid && s.corrected === corrected
  );
  if (exists) {
    if (starred) exists.starred = true;
    persistHistoryToStorage();
    updateHistoryBadges();
    return;
  }

  state.sentenceHistory.unshift({
    id: "sent-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    timestamp: formatNow(),
    scenario: SCENARIOS[state.scenario]?.title || "Speaking Practice",
    provider: getActiveModelString(),
    userSaid,
    corrected,
    explanation,
    betterExpression,
    starred
  });

  persistHistoryToStorage();
  updateHistoryBadges();
}

function saveVocabToHistory(word, meaning, starred = false) {
  const cleanWord = word.trim();
  const exists = state.vocabHistory.find(
    (v) => v.word.toLowerCase() === cleanWord.toLowerCase()
  );
  if (exists) {
    if (starred) exists.starred = true;
    persistHistoryToStorage();
    updateHistoryBadges();
    return;
  }

  state.vocabHistory.unshift({
    id: "voc-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    word: cleanWord,
    meaning,
    scenario: SCENARIOS[state.scenario]?.title || "Speaking Practice",
    timestamp: formatNow(),
    starred
  });

  persistHistoryToStorage();
  updateHistoryBadges();
}

function saveCurrentSessionToArchive(showNotification = false) {
  if (state.currentMessages.length <= 1 && !showNotification) return;

  const sc = SCENARIOS[state.scenario];
  const sessionRecord = {
    id: state.currentSessionId,
    scenarioKey: state.scenario,
    scenarioTitle: sc.title,
    scenarioIcon: sc.icon,
    modelUsed: `${state.provider === "openai" ? "ChatGPT" : "Gemini"} (${getActiveModelString()})`,
    timestamp: formatNow(),
    turnCount: state.turnCount,
    cefrLevel: dom.cefrBadge.textContent.replace("CEFR: ", ""),
    messages: [...state.currentMessages],
    coaching: state.currentCoaching
  };

  const existingIndex = state.sessionHistory.findIndex((s) => s.id === state.currentSessionId);
  if (existingIndex >= 0) {
    state.sessionHistory[existingIndex] = sessionRecord;
  } else {
    state.sessionHistory.unshift(sessionRecord);
  }

  persistHistoryToStorage();
  updateHistoryBadges();

  if (showNotification) {
    showToast("💾 Full conversation saved! (Click to view)", () => openHistoryModal("sessions"));
  }
}

function renderHistoryModalContent() {
  updateHistoryBadges();
  const query = (dom.historySearchInput.value || "").trim().toLowerCase();
  const starredOnly = dom.filterStarredOnly.checked;

  dom.sentenceHistoryList.innerHTML = "";
  const filteredSentences = state.sentenceHistory.filter((item) => {
    if (starredOnly && !item.starred) return false;
    if (!query) return true;
    return (
      item.userSaid.toLowerCase().includes(query) ||
      item.corrected.toLowerCase().includes(query) ||
      item.explanation.toLowerCase().includes(query) ||
      item.scenario.toLowerCase().includes(query)
    );
  });

  if (filteredSentences.length === 0) {
    dom.sentenceHistoryList.innerHTML = `<div class="empty-history">No corrected sentences match your filter yet. Speak or type in the chat and your corrections will automatically appear here!</div>`;
  } else {
    filteredSentences.forEach((item) => {
      const card = document.createElement("div");
      card.className = "history-card minimal-sentence-card";
      const hasOriginalDiff = item.userSaid && item.userSaid !== item.corrected && item.userSaid !== "(Saved AI Expression)" && item.userSaid !== "(Practice Sentence)";
      
      card.innerHTML = `
        <div class="history-sentence-row">
          <div class="history-sentence-text">${escapeHtml(item.corrected)}</div>
          <div class="history-actions-inline">
            <button class="btn-bubble-action btn-mini" data-action="speak-sent" data-text="${encodeURIComponent(item.corrected)}" title="Listen to sentence">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              <span>Listen</span>
            </button>
            <button class="btn-bubble-action btn-mini" data-action="copy-sent" data-text="${encodeURIComponent(item.corrected)}" title="Copy sentence">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>Copy</span>
            </button>
            <button class="btn-bubble-action btn-mini btn-del" data-action="delete-sent" data-id="${item.id}" title="Remove from list">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
        ${hasOriginalDiff ? `<div class="history-orig-hint">Original: "${escapeHtml(item.userSaid)}"</div>` : ""}
      `;
      dom.sentenceHistoryList.appendChild(card);
    });
  }

  dom.vocabHistoryList.innerHTML = "";
  const filteredVocab = state.vocabHistory.filter((v) => {
    if (starredOnly && !v.starred) return false;
    if (!query) return true;
    return (
      v.word.toLowerCase().includes(query) ||
      v.meaning.toLowerCase().includes(query) ||
      v.scenario.toLowerCase().includes(query)
    );
  });

  if (filteredVocab.length === 0) {
    dom.vocabHistoryList.innerHTML = `<div class="empty-history">No vocabulary items found. Every conversation turn automatically adds key idioms and words here!</div>`;
  } else {
    filteredVocab.forEach((v) => {
      const card = document.createElement("div");
      card.className = "history-card";
      card.innerHTML = `
        <div class="history-card-top">
          <span class="meta-pill">${v.scenario}</span>
          <button class="btn-star ${v.starred ? "starred" : ""}" data-action="star-voc" data-id="${v.id}">
            ${v.starred ? "⭐" : "☆"}
          </button>
        </div>
        <div style="font-size:0.95rem;font-weight:700;color:#a5b4fc;">📌 ${v.word}</div>
        <div class="history-explanation">${v.meaning}</div>
        <div class="history-card-actions">
          <button class="btn-bubble-action" data-action="speak-voc" data-text="${encodeURIComponent(v.word)}">🔊 Pronounce</button>
          <button class="btn-bubble-action" data-action="use-voc" data-text="${encodeURIComponent(v.word)}">✍️ Use in Sentence</button>
          <button class="btn-bubble-action" data-action="delete-voc" data-id="${v.id}" style="margin-left:auto;color:#fda4af;">🗑️</button>
        </div>
      `;
      dom.vocabHistoryList.appendChild(card);
    });
  }

  dom.sessionHistoryList.innerHTML = "";
  const filteredSessions = state.sessionHistory.filter((s) => {
    if (!query) return true;
    return (
      s.scenarioTitle.toLowerCase().includes(query) ||
      s.modelUsed.toLowerCase().includes(query) ||
      s.messages.some((m) => m.text.toLowerCase().includes(query))
    );
  });

  if (filteredSessions.length === 0) {
    dom.sessionHistoryList.innerHTML = `<div class="empty-history">No saved chat sessions yet. Click <strong>💾 Save Chat</strong> in the top bar (or complete a speaking turn) to archive your conversation!</div>`;
  } else {
    filteredSessions.forEach((sess) => {
      const lastMsg = sess.messages[sess.messages.length - 1]?.text || "";
      const card = document.createElement("div");
      card.className = "history-card";
      card.innerHTML = `
        <div class="history-card-top">
          <div class="history-meta-badges">
            <span class="meta-pill">${sess.scenarioIcon} ${sess.scenarioTitle}</span>
            <span class="meta-pill">${sess.modelUsed}</span>
            <span class="meta-pill">CEFR: ${sess.cefrLevel}</span>
            <span>${sess.timestamp}</span>
          </div>
          <span>${sess.messages.length} messages</span>
        </div>
        <div class="history-explanation" style="color:#e2e8f0;">
          <strong>Last message:</strong> "${lastMsg.slice(0, 140)}${lastMsg.length > 140 ? "..." : ""}"
        </div>
        <div class="history-card-actions">
          <button class="btn-mini primary" data-action="load-session" data-id="${sess.id}">📂 Load & Resume Chat</button>
          <button class="btn-bubble-action" data-action="delete-session" data-id="${sess.id}" style="margin-left:auto;color:#fda4af;">🗑️ Delete Session</button>
        </div>
      `;
      dom.sessionHistoryList.appendChild(card);
    });
  }
}

function exportStudyGuideMarkdown() {
  const lines = [
    "# 🎙️ SpeakFlow AI — Personal English Speaking Study Guide",
    `Generated: ${formatNow()}`,
    "",
    "## 🔧 Corrected Sentences & Native Upgrades",
    ""
  ];

  state.sentenceHistory.forEach((item, idx) => {
    lines.push(`### ${idx + 1}. ${item.scenario} (${item.timestamp}) ${item.starred ? "⭐" : ""}`);
    lines.push(`- **What I said:** "${item.userSaid}"`);
    lines.push(`- **Corrected / Polished:** "${item.corrected}"`);
    lines.push(`- **Coach Note:** ${item.explanation}`);
    if (item.betterExpression) {
      lines.push(`- **Native Upgrade:** "${item.betterExpression}"`);
    }
    lines.push("");
  });

  lines.push("## 📚 Saved Vocabulary & Idioms", "");
  state.vocabHistory.forEach((v) => {
    lines.push(`- **${v.word}** (${v.scenario}): ${v.meaning} ${v.starred ? "⭐" : ""}`);
  });

  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SpeakFlow_Study_Guide_${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("📥 Downloaded Markdown Study Guide!");
}

// ==================== 1. GOOGLE GEMINI INTERACTIONS API ====================
async function callGeminiInteractionsAPI(userMessage) {
  const { voiceDisplayName } = getParsedVoicePersona();
  const levelKey = normalizeLearnerLevel(state.learnerLevel);
  const levelCfg = LEVEL_PROFILES_CLIENT[levelKey] || LEVEL_PROFILES_CLIENT.intermediate;
  const systemInstruction = [
    getDynamicRolePrompt(state.scenario),
    `Your name is ${voiceDisplayName}. When asked who you are or what your name is, always introduce yourself as ${voiceDisplayName}.`,
    levelCfg.promptRule,
    "You are both an engaging English conversation partner AND a supportive real-time speaking coach.",
    "Respond strictly in the requested JSON schema so the UI can display your spoken reply alongside grammar corrections, native expression upgrades, pronunciation tips, and speaking metrics."
  ].join(" ");

  const requestBody = {
    model: state.model,
    system_instruction: systemInstruction,
    input: userMessage,
    generation_config: {
      thinking_level: state.thinkingLevel,
      max_output_tokens: 32768
    },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: COACHING_JSON_SCHEMA
    }
  };

  if (state.previousInteractionId) {
    requestBody.previous_interaction_id = state.previousInteractionId;
  }

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Revision": "2026-05-20",
      "x-goog-api-key": state.apiKey.trim()
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const interaction = await response.json();
  if (interaction.id) {
    state.previousInteractionId = interaction.id;
  }

  let rawJsonText = interaction.output_text || "";
  if (!rawJsonText && Array.isArray(interaction.steps)) {
    for (let i = interaction.steps.length - 1; i >= 0; i--) {
      const step = interaction.steps[i];
      if (step.type === "model_output" && Array.isArray(step.content)) {
        const textBlocks = step.content
          .filter((c) => c.type === "text" && c.text)
          .map((c) => c.text);
        if (textBlocks.length > 0) {
          rawJsonText = textBlocks.join("");
          break;
        }
      }
    }
  }

  if (!rawJsonText) {
    throw new Error("Empty model_output received from Gemini Interactions API.");
  }

  return JSON.parse(rawJsonText);
}

// ==================== 2. OPENAI CHATGPT API ====================
async function callOpenAIChatGPTAPI(userMessage) {
  const { voiceDisplayName } = getParsedVoicePersona();
  const levelKey = normalizeLearnerLevel(state.learnerLevel);
  const levelCfg = LEVEL_PROFILES_CLIENT[levelKey] || LEVEL_PROFILES_CLIENT.intermediate;
  const systemPrompt = [
    getDynamicRolePrompt(state.scenario),
    `Your name is ${voiceDisplayName}. When asked who you are or what your name is, always introduce yourself as ${voiceDisplayName}.`,
    levelCfg.promptRule,
    "You are both an engaging English conversation partner AND a supportive real-time speaking coach.",
    "Always return a valid JSON object matching the exact schema with keys: reply, follow_up_hint, is_grammar_perfect, corrected_sentence, grammar_explanation, better_expressions (array of {tone, phrase}), pronunciation_tips (array of {word, tip}), key_vocabulary (array of {word, meaning}), and scores ({fluency, grammar, vocabulary, cefr_level})."
  ].join(" ");

  const messages = [
    { role: "system", content: systemPrompt },
    ...state.openaiChatHistory,
    { role: "user", content: userMessage }
  ];

  const requestBody = {
    model: state.openaiModel,
    messages,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "speaking_coach_response",
        strict: true,
        schema: COACHING_JSON_SCHEMA
      }
    }
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.openaiApiKey.trim()}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ChatGPT API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI ChatGPT API.");
  }

  const parsed = JSON.parse(content);
  state.openaiChatHistory.push({ role: "user", content: userMessage });
  state.openaiChatHistory.push({ role: "assistant", content: parsed.reply });
  return parsed;
}

// ==================== 3. CONTEXT-AWARE & MODEL-AWARE DEMO COACH ENGINE ====================
// ==================== 2A. CLIENT & STANDALONE GRAMMAR & CONVERSATION ENGINE ====================
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
        { regex: /\bi\s+m\b/gi, replacement: "I'm", word: `"i m" → "I'm"` },
    { regex: /\bim\b/gi, replacement: "I'm", word: `"im" → "I'm"` },
    { regex: /\brigting\b/gi, replacement: "writing", word: '"rigting" → "writing"' },
    { regex: /\bdyo\b/gi, replacement: "you", word: '"dyo" → "you"' },
    { regex: /\bu\b/gi, replacement: "you", word: '"u" → "you"' },
    { regex: /\br\b/gi, replacement: "are", word: '"r" → "are"' },
    { regex: /\bur\b/gi, replacement: "your", word: '"ur" → "your"' },
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
    { regex: /\bimportent\b/gi, replacement: "important", word: '"importent" → "important"' },
    { regex: /\bhving\b/gi, replacement: "having", word: '"hving" → "having"' },
    { regex: /\bnetural\b/gi, replacement: "natural", word: '"netural" → "natural"' },
    { regex: /\bconvarsation(s?)\b/gi, replacement: "conversation$1", word: '"convarsations" → "conversations"' },
    { regex: /\bconvesation(s?)\b/gi, replacement: "conversation$1", word: '"convesation" → "conversation"' },
    { regex: /\bconvensation(s?)\b/gi, replacement: "conversation$1", word: '"convensation" → "conversation"' },
    { regex: /\bdificult\b/gi, replacement: "difficult", word: '"dificult" → "difficult"' },
    { regex: /\brobitic\b/gi, replacement: "robotic", word: '"robitic" → "robotic"' },
    { regex: /\bunnatual\b/gi, replacement: "unnatural", word: '"unnatual" → "unnatural"' },
    { regex: /\benglsih\b/gi, replacement: "English", word: '"englsih" → "English"' },
    { regex: /\benglsh\b/gi, replacement: "English", word: '"englsh" → "English"' },
    { regex: /\bengilsh\b/gi, replacement: "English", word: '"engilsh" → "English"' },
    { regex: /\bcomunication\b/gi, replacement: "communication", word: '"comunication" → "communication"' },
    { regex: /\bfluncy\b/gi, replacement: "fluency", word: '"fluncy" → "fluency"' },
    { regex: /\buntill\b/gi, replacement: "until", word: '"untill" → "until"' },
    { regex: /\bbeleive\b/gi, replacement: "believe", word: '"beleive" → "believe"' },
    { regex: /\btomorow\b/gi, replacement: "tomorrow", word: '"tomorow" → "tomorrow"' },
    { regex: /\byesturday\b/gi, replacement: "yesterday", word: '"yesturday" → "yesterday"' },
    { regex: /\bvacaton\b/gi, replacement: "vacation", word: '"vacaton" → "vacation"' },
    { regex: /\bwondeful\b/gi, replacement: "wonderful", word: '"wondeful" → "wonderful"' },
    { regex: /\bfreind(s?)\b/gi, replacement: "friend$1", word: '"freind" → "friend"' },
    { regex: /\bweild\b/gi, replacement: "weird", word: '"weild" → "weird"' },
    { regex: /\bwerid\b/gi, replacement: "weird", word: '"werid" → "weird"' }
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

    // Flag isolated single consonants (e.g. "i m", "do n")
  if (/\b[b-hj-z]\b/i.test(corrected)) {
    isPerfect = false;
    notes.push('단독 자음 수정: 불완전하게 분리된 철자를 올바른 단어 형태로 수정했습니다.');
  }

  // Capitalize isolated lowercase 'i'
  if (/\bi\b/.test(corrected)) {
    corrected = corrected.replace(/\bi\b/g, "I");
    isPerfect = false;
    notes.push('대명사 대문자 표기: 1인칭 대명사 "I"는 항상 대문자로 씁니다.');
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
      { label: "추천 2 · Fluent & Expressive", sentence: "Could you rephrase that a bit more simply for me?" }
    ];
  }

  // 1B. Writing / "rigting" / "writing"
  if (/rigting|writing|draft|article|email|essay|blog/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "Hey, I'm just doing a bit of writing right now." },
      { label: "추천 2 · Fluent & Expressive", sentence: "Hello! I'm currently working on some writing." }
    ];
  }

  // 1C. What do you think / asking opinion
  if (/what\s+do\s+(you|dyo|u)\s+think|your\s+take|your\s+opinion/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "What's your take on this?" },
      { label: "추천 2 · Fluent & Expressive", sentence: "I'd love to hear your perspective on this." }
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

  // 6. Difficult AI conversations / chat
  if (/difficult|hard|tough|challenging/i.test(lower) && /conversation|talk|chat|ai|speaking/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "It's pretty tough having natural conversations with AI." },
      { label: "추천 2 · Fluent & Expressive", sentence: "Having seamless, natural conversations with AI presents quite a challenge." }
    ];
  }

  // General intelligent variants (No synthetic prefixes)
  const core = primaryCorrected.replace(/[.!?]+$/, "").trim();
  const isQuestion = /\?$/.test(primaryCorrected) || /^(can|could|would|do|does|did|is|are|what|why|how|where|when|who)\b/i.test(core);

  if (isQuestion) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: primaryCorrected },
      { label: "추천 2 · Fluent & Expressive", sentence: `I was wondering—${core.charAt(0).toLowerCase() + core.slice(1)}?` }
    ];
  }

  let casualVar = primaryCorrected;
  if (/^it'?s\s+difficult\s+to\b/i.test(primaryCorrected)) {
    casualVar = primaryCorrected.replace(/^it'?s\s+difficult\s+to\b/i, "It's really hard to");
  } else if (/^it'?s\s+difficult\b/i.test(primaryCorrected)) {
    casualVar = primaryCorrected.replace(/^it'?s\s+difficult\b/i, "It's pretty tough");
  } else if (!/^(well|honestly|actually|to be honest)/i.test(primaryCorrected)) {
    casualVar = `Honestly, ${primaryCorrected.charAt(0).toLowerCase() + primaryCorrected.slice(1)}`;
  }

  let fluentVar = primaryCorrected;
  if (!/^(in my experience|from my perspective|i've noticed that)/i.test(primaryCorrected)) {
    fluentVar = `In my experience, ${primaryCorrected.charAt(0).toLowerCase() + primaryCorrected.slice(1)}`;
  }

  return [
    { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
    { label: "추천 1 · Casual Native", sentence: casualVar },
    { label: "추천 2 · Fluent & Expressive", sentence: fluentVar }
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
    reply = `Oh, no worries at all! Let me slow down and put it more simply. What is one of your favorite things to do when you have free time?`;
    followUpHint = "I usually love watching movies and taking quiet walks.";
    pronunciationTips = [
      { word: "Understand (ˌʌn.dɚˈstænd)", tip: "Stress the third syllable clearly: 'un-der-STAND'." },
      { word: "Explain (ɪkˈspleɪn)", tip: "Link the 'k' and 'sp' smoothly without adding extra vowels." }
    ];
    keyVocabulary = [
      { word: "break down", meaning: "이해하기 쉽게 풀어서 설명하다" },
      { word: "catch that", meaning: "말한 내용을 알아듣다, 이해하다" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "I didn't quite catch that—could you say it again?" },
      { tone: "Fluent & Expressive", phrase: "Could you rephrase that a bit more simply for me?" }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 2. Writing / Drafting / Journaling ("Hi i m rigting")
  if (/rigting|writing|drafting|typing|journal|article|notes/i.test(lower)) {
    reply = `Hey there! What kind of writing are you working on today—an article, an email, or some English notes?`;
    followUpHint = "I'm just writing down a few thoughts to practice my English.";
    pronunciationTips = [
      { word: "Writing (ˈraɪ.t̬ɪŋ)", tip: "Notice the 'w' is silent; start directly with the 'r' sound: 'RYE-ting'." },
      { word: "Draft (dræft)", tip: "Keep the short 'a' crisp and pronounce the final 'ft' clearly." }
    ];
    keyVocabulary = [
      { word: "jot down", meaning: "간단히 적어두다, 메모하다" },
      { word: "draft", meaning: "초안을 작성하다" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "Hey, I'm just doing a bit of writing right now." },
      { tone: "Fluent & Expressive", phrase: "Hello! I'm currently working on some writing." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 3. User asks opinion ("what do dyo think ?", "what do you think ?")
  if (/what\s+do\s+(you|dyo|u)\s+think|your\s+thoughts|your\s+take/i.test(lower)) {
    const recentTopic = history.slice(-4).find(m => m.role === 'user' && !/think/i.test(m.text));
    if (recentTopic && /chung-?ju|trip|travel/i.test(recentTopic.text)) {
      reply = `I think a family trip to Chungju sounds wonderful! Taking time to relax together makes great memories. What are you most excited to do there?`;
    } else if (recentTopic && /cook|food|pasta/i.test(recentTopic.text)) {
      reply = `I think making delicious food at home is always satisfying! What's your secret ingredient for that?`;
    } else {
      reply = `I think open, spontaneous chats like this are the most rewarding way to build real speaking confidence! What's your own take on how practicing English feels for you today?`;
    }
    followUpHint = "I think it's definitely helping me feel more comfortable speaking.";
    pronunciationTips = [
      { word: "Think (θɪŋk)", tip: "Keep your tongue lightly between your teeth for the unvoiced 'th' sound." }
    ];
    keyVocabulary = [
      { word: "take on", meaning: "~에 대한 개인적인 의견이나 견해" },
      { word: "perspective", meaning: "관점, 시각" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "What's your take on this?" },
      { tone: "Fluent & Expressive", phrase: "I'd love to hear your perspective on this." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 4. Travel & Vacation (e.g. Chungju, trips, flights)
  if (/trip|travel|vacation|chung-?ju|flight|hotel|tour|sightseeing|beach|mountains/i.test(lower)) {
    reply = `That sounds like a wonderful family getaway! Chungju is so peaceful with its scenic lake and mountains. What are you most excited to do together there?`;
    followUpHint = "We're planning to take a scenic walk around the lake and relax.";
    pronunciationTips = [
      { word: "Scenic (ˈsiː.nɪk)", tip: "Start with a soft 's' and stress the first syllable: 'SEE-nik'." },
      { word: "Vacation (veɪˈkeɪ.ʃən)", tip: "Keep the middle syllable stressed: 'vay-KAY-shun'." }
    ];
    keyVocabulary = [
      { word: "getaway", meaning: "짧은 휴가, 여행" },
      { word: "sightseeing", meaning: "관광, 명소 둘러보기" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "I'm heading on a family trip down to Chungju." },
      { tone: "Fluent & Expressive", phrase: "My family and I are taking a weekend getaway to Chungju." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 5. Food, Cooking & Dining (e.g. pizza, pasta, dinner, supermarket, grocery)
  if (/food|cook|cooked|cooking|dinner|lunch|breakfast|eat|ate|pizza|pasta|supermarket|grocery|restaurant|delicious|meal/i.test(lower)) {
    reply = `That sounds delicious! Did you make it yourself with a special recipe, or did you try it at a favorite spot?`;
    followUpHint = "I made it at home with fresh ingredients, and it turned out really flavorful.";
    pronunciationTips = [
      { word: "Delicious (dɪˈlɪʃ.əs)", tip: "Soft 'sh' sound in the middle: 'dih-LISH-us'." },
      { word: "Recipe (ˈres.ə.pi)", tip: "Three syllables: 'REH-suh-pee'." }
    ];
    keyVocabulary = [
      { word: "from scratch", meaning: "직접 처음부터 손수 만든" },
      { word: "flavorful", meaning: "풍미가 넘치는, 맛있는" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "I made some really tasty pasta today." },
      { tone: "Fluent & Expressive", phrase: "I prepared a delicious homemade dish today." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 6. Work, Coding, Tech & AI
  if (/work|job|coding|code|developer|project|software|agent|tech|ai|study|studying|meeting/i.test(lower)) {
    reply = `Sounds like you've been working on something fascinating! What's the most exciting challenge you're tackling right now?`;
    followUpHint = "I've been building a project using AI tools, and it's making my workflow much faster.";
    pronunciationTips = [
      { word: "Develop (dɪˈvel.əp)", tip: "Stress the second syllable: 'dih-VEL-up'." },
      { word: "Challenge (ˈtʃæl.ɪndʒ)", tip: "Clear 'ch' sound at the beginning: 'CHAL-inj'." }
    ];
    keyVocabulary = [
      { word: "workflow", meaning: "업무 절차, 작업 흐름" },
      { word: "hands-on", meaning: "직접 해보는, 실무적인" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "I've been pretty wrapped up in this project lately." },
      { tone: "Fluent & Expressive", phrase: "I've been deeply focused on this technical project recently." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 7. Feelings, Boredom, Relaxation & Weekend
  if (/bored|boring|tired|exhausted|relax|relaxing|weekend|free time|rest|sleep/i.test(lower)) {
    reply = `I completely understand how you feel! When you have downtime like this, what's your favorite way to unwind and recharge?`;
    followUpHint = "I usually like listening to music, going for a walk, or catching up on sleep.";
    pronunciationTips = [
      { word: "Unwind (ʌnˈwaɪnd)", tip: "Long 'eye' sound: 'un-WYND'." },
      { word: "Recharge (riːˈtʃɑːrdʒ)", tip: "Stress the second syllable: 'ree-CHARJ'." }
    ];
    keyVocabulary = [
      { word: "unwind", meaning: "긴장을 풀고 쉬다" },
      { word: "downtime", meaning: "휴식 시간" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "I'm just taking it easy and unwinding today." },
      { tone: "Fluent & Expressive", phrase: "I'm taking some time out to recharge my batteries." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 8. Name / Self-Introduction / "What's your name?" / "My name is..."
  const nameMatch = clean.match(/(?:my name is|i'm|i am)\s+([a-zA-Z가-힣]+)/i);
  const userName = nameMatch ? nameMatch[1].replace(/[,.!?]/g, "") : "";
  const asksPartnerName = /what(?:'?s|\s+is)\s+your\s+name|who\s+are\s+you/i.test(lower);

  if (asksPartnerName || (nameMatch && /hi|hello|meet/i.test(lower))) {
    const pName = partnerName || (modelMeta && modelMeta.displayName) || "Alloy";
    if (userName) {
      reply = `Nice to meet you, ${userName}! My name is ${pName}. It's awesome to practice English with you—how is your day going so far?`;
      followUpHint = `It's great to meet you too, ${pName}! My day has been pretty good.`;
    } else {
      reply = `I'm ${pName}, your friendly English conversation partner! It's so nice to meet you. What's on your mind today?`;
      followUpHint = "Nice to meet you! I'm hoping to get some English speaking practice today.";
    }
    pronunciationTips = [
      { word: "Pleasure (ˈpleʒ.ɚ)", tip: "Soft 'zh' sound in the middle: 'PLEZH-er'." }
    ];
    keyVocabulary = [
      { word: "pleasure to meet you", meaning: "만나서 반갑습니다 (정중하고 따뜻한 인사)" }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 9. Reaction & Surprise ("Are you kidding me?", "Are you serious?", "No way!")
  if (/are\s+you\s+(kidding|serious|joking|for\s+real)|no\s+way|you\s+must\s+be\s+kidding/i.test(lower)) {
    reply = `Haha, not at all! I'm completely serious, but I love your reaction! Why did that catch you off guard?`;
    followUpHint = "I honestly didn't expect that answer, but it's really interesting!";
    pronunciationTips = [
      { word: "Kidding (ˈkɪd.ɪŋ)", tip: "Keep the short 'i' crisp: 'KID-ing'." }
    ];
    keyVocabulary = [
      { word: "catch off guard", meaning: "불시에 놀라게 하다, 예상치 못하게 하다" },
      { word: "no way", meaning: "설마, 말도 안 돼 (자연스러운 감탄사)" }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 10. General Questions (Why, How, What, Can you, Do you)
  if (/\?$/.test(clean) || /^(what|how|why|when|where|who|can you|could you|do you|are you) /i.test(clean)) {
    const questionReplies = [
      `That's a thoughtful question! To be honest, I really enjoy hearing how different people think about it. What led you to wonder about that?`,
      `That's such an interesting thing to ask! I'd love to explore that with you—what's your own first instinct on it?`,
      `Great question! I think looking at things from a fresh angle makes every conversation fun. What's your take on it?`,
      `I love that you're curious about that! Honestly, there are so many ways to see it. How do you personally feel about it?`
    ];
    const qHash = clean.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    reply = questionReplies[qHash % questionReplies.length];
    followUpHint = "I was just thinking about it earlier today, and I wanted to hear your perspective.";
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 11. General Dynamic Contextual Fallback (Natural, Empathetic, Non-Robotic)
  const dynamicReplies = [
    `That's really interesting! What's something coming up this week that you're looking forward to?`,
    `I appreciate you sharing that with me! How do you usually like spending your free hours?`,
    `That sounds like a great moment! What was the highlight of your day so far?`,
    `It's so fun chatting with you about this! What other topics do you enjoy talking about most in English?`
  ];
  const charHash = clean.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  reply = dynamicReplies[charHash % dynamicReplies.length];
  followUpHint = "It was a really nice experience, and I'm happy I got to try something new today.";

  return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
}


function generateLocalDemoCoaching(userText) {
  const cleanText = (userText || "").trim();
  const modelId = getActiveModelString();
  const scenario = SCENARIOS[state.scenario] || SCENARIOS.casual;
  const { voiceDisplayName } = getParsedVoicePersona();
  const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gpt-4o"] || MODEL_PERSONAS["gemini-4-argon"];

  const grammarResult = analyzeGrammarAndPhrasing(cleanText, modelMeta);
  const convResult = generateContextualReply(
    cleanText,
    modelId,
    scenario.title,
    voiceDisplayName,
    state.currentMessages || [],
    grammarResult
  );

  return {
    reply: convResult.reply,
    follow_up_hint: convResult.followUpHint,
    is_grammar_perfect: grammarResult.isPerfect,
    corrected_sentence: grammarResult.corrected,
    corrected_variants: grammarResult.correctedVariants,
    grammar_explanation: grammarResult.explanation,
    better_expressions: convResult.betterExpressions,
    pronunciation_tips: convResult.pronunciationTips,
    key_vocabulary: convResult.keyVocabulary,
    recommended_speech_rate: convResult.recommendedSpeechRate || null,
    scores: {
      fluency: grammarResult.isPerfect ? 92 : 68,
      grammar: grammarResult.isPerfect ? 98 : 60,
      vocabulary: 78,
      cefr_level: grammarResult.isPerfect ? "B2" : "B1"
    }
  };
}

// ==================== 2B. ZERO-API-KEY BUILT-IN LIVE AI BACKEND (/api/chat) ====================
async function callZeroKeyBackendChatAPI(userMessage, signal = null) {
  const scenario = SCENARIOS[state.scenario] || SCENARIOS.casual;
  const activeModel = getActiveModelString();
  const { voiceDisplayName } = getParsedVoicePersona();
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      userMessage,
      model: activeModel,
      provider: state.provider,
      voicePersona: state.voicePersona,
      voiceName: voiceDisplayName,
      scenarioTitle: scenario.title,
      rolePrompt: getDynamicRolePrompt(state.scenario),
      learnerLevel: normalizeLearnerLevel(state.learnerLevel),
      speechRate: state.speechRate,
      history: state.currentMessages.slice(-10)
    })
  });

  if (!response.ok) {
    throw new Error(`Backend AI proxy status ${response.status}`);
  }
  const data = await response.json();
  if (!data || !data.reply) {
    throw new Error("Invalid JSON from /api/chat");
  }
  return data;
}


// ==================== SAVED CONVERSATIONS STORE & VIEWER ====================
function getSavedConversations() {
  try {
    const raw = localStorage.getItem("fluency_saved_conversations");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function persistSavedConversations(list) {
  try {
    localStorage.setItem("fluency_saved_conversations", JSON.stringify(list));
  } catch (e) {}
}

let activeViewingConvId = null;

function saveCurrentConversation() {
  const msgs = state.currentMessages || [];
  const hasUserMsg = msgs.some((m) => m.role === "user");
  if (!hasUserMsg) {
    showToast("저장할 대화 내용이 아직 없습니다! AI와 대화를 나눈 후 눌러주세요.");
    return;
  }

  const list = getSavedConversations();
  const firstUser = msgs.find((m) => m.role === "user");
  const lastAi = [...msgs].reverse().find((m) => m.role === "ai");
  const title = firstUser ? `"${firstUser.text.slice(0, 36)}${firstUser.text.length > 36 ? "..." : ""}"` : "English Conversation";
  const preview = lastAi ? lastAi.text.slice(0, 90) : "";

  const existingIdx = list.findIndex((c) => c.id === state.currentSessionId);
  const record = {
    id: state.currentSessionId,
    title,
    timestamp: formatNow(),
    preview,
    messageCount: msgs.length,
    messages: JSON.parse(JSON.stringify(msgs)),
    scenario: SCENARIOS[state.scenario]?.title || "Daily Talk"
  };

  if (existingIdx >= 0) {
    list[existingIdx] = record;
  } else {
    list.unshift(record);
  }

  persistSavedConversations(list);
  showToast("💾 대화 내용이 저장되었습니다! (클릭하여 대화 목록 보기)", () => {
    openSavedConversationsModal();
  });
}

function openSavedConversationsModal() {
  if (!dom.savedConversationsModal) return;
  renderSavedConversationsList();
  showSavedListView();
  dom.savedConversationsModal.classList.remove("hidden");
}

function closeSavedConversationsModal() {
  if (!dom.savedConversationsModal) return;
  dom.savedConversationsModal.classList.add("hidden");
}

function showSavedListView() {
  activeViewingConvId = null;
  if (dom.savedConvListView) dom.savedConvListView.classList.remove("hidden");
  if (dom.savedConvDetailView) dom.savedConvDetailView.classList.add("hidden");
}

function renderSavedConversationsList() {
  if (!dom.savedConvList) return;
  const list = getSavedConversations();
  dom.savedConvList.innerHTML = "";

  if (list.length === 0) {
    dom.savedConvList.innerHTML = `
      <div class="saved-conv-empty">
        <div style="font-size:2rem;margin-bottom:8px;">💬</div>
        <strong>아직 저장된 대화가 없습니다.</strong><br/>
        대화창에서 대화를 나눈 뒤 상단 <strong>Save</strong> 버튼을 누르면 전체 대화가 이곳에 안전하게 보관됩니다.
      </div>
    `;
    return;
  }

  list.forEach((conv) => {
    const card = document.createElement("div");
    card.className = "saved-conv-card";
    card.innerHTML = `
      <div class="saved-conv-card-top">
        <div class="saved-conv-card-title">
          <span>💬</span>
          <span>${escapeHtml(conv.title)}</span>
        </div>
        <div class="saved-conv-card-meta">
          <span>${conv.timestamp}</span>
        </div>
      </div>
      <div class="saved-conv-card-preview">${escapeHtml(conv.preview || "(대화 내용)")}</div>
      <div class="saved-conv-card-bottom">
        <span>총 ${conv.messageCount}개의 대화 메시지</span>
        <span class="saved-conv-open-hint">
          <span>대화 내용 보기</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      </div>
    `;
    card.addEventListener("click", () => {
      viewSavedConversationDetail(conv.id);
    });
    dom.savedConvList.appendChild(card);
  });
}

function viewSavedConversationDetail(convId) {
  const list = getSavedConversations();
  const conv = list.find((c) => c.id === convId);
  if (!conv) return;

  activeViewingConvId = convId;
  if (dom.savedConvListView) dom.savedConvListView.classList.add("hidden");
  if (dom.savedConvDetailView) dom.savedConvDetailView.classList.remove("hidden");

  if (dom.savedDetailMeta) {
    dom.savedDetailMeta.textContent = `${conv.timestamp} · 총 ${conv.messages.length}개 메시지`;
  }

  if (dom.savedChatTranscript) {
    dom.savedChatTranscript.innerHTML = "";
    conv.messages.forEach((m) => {
      const row = document.createElement("div");
      row.className = `message-row ${m.role}`;
      if (m.role === "ai") {
        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`;
        row.appendChild(avatar);
      }
      const wrap = document.createElement("div");
      wrap.className = "bubble-wrap";
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = m.text;
      wrap.appendChild(bubble);
      row.appendChild(wrap);
      dom.savedChatTranscript.appendChild(row);
    });
  }
}

function resumeSavedConversation() {
  if (!activeViewingConvId) return;
  const list = getSavedConversations();
  const conv = list.find((c) => c.id === activeViewingConvId);
  if (!conv || !conv.messages || conv.messages.length === 0) return;

  state.currentSessionId = conv.id;
  state.currentMessages = JSON.parse(JSON.stringify(conv.messages));
  dom.chatStream.innerHTML = "";
  conv.messages.forEach((m) => {
    appendMessage(m.role, m.text, false);
  });

  closeSavedConversationsModal();
  showToast("📂 저장된 대화를 불러왔습니다! 이어서 말씀해 보세요.");
  if (dom.userInput) {
    dom.userInput.focus();
  }
}

function deleteCurrentSavedConversation() {
  if (!activeViewingConvId) return;
  if (!confirm("이 대화 기록을 정말 삭제하시겠습니까?")) return;

  let list = getSavedConversations();
  list = list.filter((c) => c.id !== activeViewingConvId);
  persistSavedConversations(list);

  showToast("대화가 삭제되었습니다.");
  showSavedListView();
  renderSavedConversationsList();
}

// ==================== SEND MESSAGE FLOW ====================
async function handleSendUserMessage(overrideText = null) {
    const text = (overrideText !== null ? overrideText : dom.userInput.value).trim();
  if (!text || state.isGenerating) return null;

  if (state.isRecording) {
    stopVoiceCapture();
  }

  dom.userInput.value = "";
  dom.userInput.style.height = "auto";
  appendMessage("user", text);

  state.isGenerating = true;
  dom.sendBtn.disabled = true;
  dom.sendBtn.innerHTML = "<span>Thinking...</span>";

  try {
    let result;
    if (hasActiveApiKey()) {
      if (state.provider === "openai") {
        result = await callOpenAIChatGPTAPI(text);
      } else {
        result = await callGeminiInteractionsAPI(text);
      }
    } else {
      const lowerText = text.trim().toLowerCase();
      const words = lowerText.split(/\s+/).filter(Boolean);
      const isFastPath =
        (words.length <= 4 && /^(hi|hello|hey|good morning|good afternoon|good evening|hi there|hello there)[.!?]*$/i.test(lowerText)) ||
        /^(who are you|what is your name|what's your name|introduce yourself)[.!?]*$/i.test(lowerText) ||
        /\b(slow down|speed up|speak slower|speak more slowly)\b/i.test(lowerText);

      if (isFastPath) {
        result = generateLocalDemoCoaching(text);
      } else {
        try {
          const controller = new AbortController();
          const tId = setTimeout(() => controller.abort(), 15000);
          result = await callZeroKeyBackendChatAPI(text, controller.signal);
          clearTimeout(tId);
        } catch (proxyErr) {
          console.warn("Backend chat API timeout or error, falling back to smart contextual engine:", proxyErr);
          result = generateLocalDemoCoaching(text);
        }
      }
    }

    // Automatically adjust voice playback speed if the user asked to slow down or speed up!
    if (result.recommended_speech_rate) {
      state.speechRate = Number(result.recommended_speech_rate);
      if (dom.speechRateSelect) {
        dom.speechRateSelect.value = String(state.speechRate);
      }
      localStorage.setItem("speakflow_speech_rate", String(state.speechRate));
      showToast(
        state.speechRate < 1.0
          ? `🐢 Voice speed automatically slowed down to ${state.speechRate}x!`
          : `⚡ Voice speed automatically adjusted to ${state.speechRate}x!`
      );
    }

    appendMessage("ai", result.reply);
    dom.hintText.textContent = `"${result.follow_up_hint}"`;

    const coachingData = {
      lastUtterance: text,
      correctedSentence: result.corrected_sentence,
      correctedVariants: result.corrected_variants,
      grammarExplanation: result.grammar_explanation,
      isPerfect: result.is_grammar_perfect,
      betterExpressions: result.better_expressions,
      pronunciationTips: result.pronunciation_tips,
      vocabulary: result.key_vocabulary
    };

    renderCoachingFeedback(coachingData);
    updateMetrics(result.scores, text);

    // If the server returned an early-streamed reply (~1.8s), fetch the completed deep LLM coaching in the background!
    if (result.pending_coach_id) {
      fetch(`/api/coach-result?id=${encodeURIComponent(result.pending_coach_id)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((bgData) => {
          if (bgData && bgData.ready && bgData.coaching) {
            const c = bgData.coaching;
            if (c.follow_up_hint && dom.hintText) {
              dom.hintText.textContent = `"${c.follow_up_hint}"`;
            }
            renderCoachingFeedback({
              lastUtterance: text,
              correctedSentence: c.corrected_sentence,
              correctedVariants: c.corrected_variants,
              grammarExplanation: c.grammar_explanation,
              isPerfect: c.is_grammar_perfect,
              betterExpressions: c.better_expressions,
              pronunciationTips: c.pronunciation_tips,
              vocabulary: c.key_vocabulary
            });
          }
        })
        .catch(() => {});
    }

    saveSentenceToHistory({
      userSaid: text,
      corrected: result.corrected_sentence,
      explanation: result.grammar_explanation,
      betterExpression: result.better_expressions?.[0]?.phrase || "",
      starred: !result.is_grammar_perfect
    });

    (result.key_vocabulary || []).forEach((v) => {
      saveVocabToHistory(v.word, v.meaning, false);
    });

    saveCurrentSessionToArchive(false);

    if (state.autoSpeak) {
      await speakText(result.reply, state.speechRate);
    }
    return result;
  } catch (err) {
    console.error("Error calling AI API, falling back to local coach:", err);
    const fallback = generateLocalDemoCoaching(text);
    appendMessage("ai", fallback.reply);
    renderCoachingFeedback({
      lastUtterance: text,
      correctedSentence: fallback.corrected_sentence,
      grammarExplanation: fallback.grammar_explanation,
      isPerfect: fallback.is_grammar_perfect,
      betterExpressions: fallback.better_expressions,
      pronunciationTips: fallback.pronunciation_tips,
      vocabulary: fallback.key_vocabulary
    });
    updateMetrics(fallback.scores, text);

    saveSentenceToHistory({
      userSaid: text,
      corrected: fallback.corrected_sentence,
      explanation: fallback.grammar_explanation,
      betterExpression: fallback.better_expressions?.[0]?.phrase || "",
      starred: !fallback.is_grammar_perfect
    });
    saveCurrentSessionToArchive(false);
    if (state.autoSpeak) {
      await speakText(fallback.reply);
    }
    return fallback;
  } finally {
    state.isGenerating = false;
    dom.sendBtn.disabled = false;
    dom.sendBtn.innerHTML = '<span>Send</span><span class="send-arrow">➤</span>';
  }
}

// ==================== REAL AI LIVE VOICES (BUILT-IN NEURAL TTS + GEMINI/OPENAI TTS + MULTI-VOICE FALLBACK) ====================
async function speakText(text, customRate = null) {
  if (!text || !text.trim()) return;

  const rate = customRate || state.speechRate || 1.0;
  const isMale = (state.voicePersona === "male");

  // Stop any currently playing audio or speechSynthesis so voices never overlap
  if (state.activeAudio) {
    try {
      state.activeAudio.pause();
      state.activeAudio.currentTime = 0;
    } catch (e) {}
    state.activeAudio = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  // 1. If user provided their own OpenAI API Key in Settings, use OpenAI Cloud TTS
  if (state.ttsEngine === "openai-tts" && hasOpenAIKey()) {
    try {
      const openAiVoice = isMale ? "ash" : "coral";
      const ttsResp = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.openaiApiKey.trim()}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-tts",
          voice: openAiVoice,
          input: text,
          instructions: "Speak naturally, warmly, and conversationally like a native English partner.",
          speed: rate
        })
      });

      if (ttsResp.ok) {
        const audioBlob = await ttsResp.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        state.activeAudio = audio;
        await audio.play();
        return;
      }
    } catch (e) {
      console.warn("OpenAI TTS notice, falling back to browser synthesis:", e);
    }
  }

  // 2. Guaranteed Gender-Separated Natural Web Speech Synthesis
  if ("speechSynthesis" in window) {
    loadSystemVoices();
    let voices = appVoicesCache.length > 0 ? appVoicesCache : window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      voices = window.speechSynthesis.getVoices() || [];
    }

    const enPool = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith("en"));
    const pool = enPool.length > 0 ? enPool : voices;
    let selectedVoice = null;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    if (isMale) {
      // 👨 Deep, resonant masculine baritone pitch (0.78)
      utterance.pitch = 0.78;
      utterance.rate = Math.min(1.3, Math.max(0.7, rate * 0.96));

      const malePreferred = [
        "guy (natural)", "guy", "christopher (natural)", "christopher",
        "eric (natural)", "eric", "andrew (natural)", "andrew",
        "brian (natural)", "brian", "ryan (natural)", "ryan",
        "google uk english male", "google us english male",
        "david", "alex", "daniel", "george", "male"
      ];
      // STRICT FILTER: Absolutely exclude any female voices
      const excludeFemale = /zira|jenny|ava|samantha|aria|sonia|libby|karen|victoria|michelle|female|woman|girl/i;

      for (const name of malePreferred) {
        selectedVoice = pool.find(v => v.name.toLowerCase().includes(name) && !excludeFemale.test(v.name));
        if (selectedVoice) break;
      }
      if (!selectedVoice) {
        selectedVoice = pool.find(v => !excludeFemale.test(v.name));
      }
    } else {
      // 👩 Bright, warm feminine tone (1.15)
      utterance.pitch = 1.15;
      utterance.rate = Math.min(1.3, Math.max(0.7, rate * 1.02));

      const femalePreferred = [
        "jenny (natural)", "jenny", "aria (natural)", "aria",
        "ava (natural)", "ava", "michelle (natural)", "michelle",
        "google us english", "samantha", "victoria", "karen", "zira", "female"
      ];
      // STRICT FILTER: Absolutely exclude any male voices
      const excludeMale = /david|guy|andrew|brian|christopher|eric|ryan|daniel|alex|george|mark|thomas|male|man/i;

      for (const name of femalePreferred) {
        selectedVoice = pool.find(v => v.name.toLowerCase().includes(name) && !excludeMale.test(v.name));
        if (selectedVoice) break;
      }
      if (!selectedVoice) {
        selectedVoice = pool.find(v => !excludeMale.test(v.name));
      }
    }

    if (!selectedVoice && pool.length > 0) {
      selectedVoice = pool[0];
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

// ==================== AI VOICE RECORDING TRANSCRIPTION (GEMINI 3.5 TRANSCRIBE & OPENAI WHISPER) ====================
async function transcribeAudioBlobWithAI(audioBlob) {
  if (state.sttEngine === "browser") return null;

  // 1. If OpenAI provider is active (or OpenAI key is set and Gemini isn't), use OpenAI Whisper / GPT-4o Transcribe
  if ((state.provider === "openai" && hasOpenAIKey()) || (!hasGeminiKey() && hasOpenAIKey())) {
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "speech.webm");
      formData.append("model", "whisper-1");
      formData.append("language", "en");

      const resp = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.openaiApiKey.trim()}`
        },
        body: formData
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.text && data.text.trim()) {
          return data.text.trim();
        }
      }
    } catch (err) {
      console.warn("OpenAI Whisper transcription notice:", err);
    }
  }

  // 2. If Gemini API Key is set, use gemini-3.5-transcribe via Interactions API
  if (hasGeminiKey()) {
    try {
      const base64Audio = await blobToBase64(audioBlob);
      const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Revision": "2026-05-20",
          "x-goog-api-key": state.apiKey.trim()
        },
        body: JSON.stringify({
          model: "gemini-3.5-transcribe",
          input: [
            {
              type: "audio",
              data: base64Audio,
              mime_type: audioBlob.type || "audio/webm"
            }
          ]
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        const transcript = data.output_text || "";
        if (transcript.trim()) {
          return transcript.trim();
        }
      }
    } catch (err) {
      console.warn("Gemini 3.5 Transcribe notice:", err);
    }
  }

  return null;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ==================== SPEECH RECOGNITION & VOICE RECORDER ====================
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.lang = state.voiceAccent;
  recognition.interimResults = true;
  recognition.continuous = true;

  let finalTranscript = "";

  recognition.onstart = () => {
    finalTranscript = dom.userInput.value ? dom.userInput.value + " " : "";
  };

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interim += transcript;
      }
    }
    dom.userInput.value = (finalTranscript + interim).trimStart();
    dom.listeningStatus.textContent = interim
      ? `Hearing: "${interim}"`
      : "Listening... Keep speaking or click Stop & Transcribe";
  };

  recognition.onerror = (event) => {
    console.warn("SpeechRecognition notice:", event.error);
  };

  recognition.onend = () => {
    if (state.isRecording) {
      stopVoiceCapture();
    }
  };

  state.recognition = recognition;
}

async function startVoiceCapture() {
  if (state.isRecording) {
    stopVoiceCapture();
    return;
  }

  state.isRecording = true;
  dom.micBtn.classList.add("recording");
  dom.micLabel.textContent = "Stop";
  dom.voiceVisualizer.classList.remove("hidden");
  dom.listeningStatus.textContent = "Listening... Speak naturally in English";

  if (state.recognition) {
    try {
      state.recognition.lang = state.voiceAccent;
      state.recognition.start();
    } catch (e) {
      console.warn("Recognition start warning:", e);
    }
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.audioChunks = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) state.audioChunks.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (state.audioChunks.length > 0) {
          const blob = new Blob(state.audioChunks, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          dom.userAudioPlayback.src = url;
          dom.selfAudioBar.classList.remove("hidden");

          // If AI STT (Gemini 3.5 Transcribe or OpenAI Whisper) is available, refine the transcript!
          if (hasGeminiKey() || hasOpenAIKey()) {
            const aiTranscript = await transcribeAudioBlobWithAI(blob);
            if (aiTranscript) {
              dom.userInput.value = aiTranscript;
              showToast("🎙️ Transcribed via AI Voice Engine!");
            }
          }
        }
      };
      recorder.start();
      state.mediaRecorder = recorder;
    } catch (err) {
      console.warn("Microphone stream unavailable:", err);
    }
  }
}

function stopVoiceCapture() {
  state.isRecording = false;
  dom.micBtn.classList.remove("recording");
  dom.micLabel.textContent = "Speak";
  dom.voiceVisualizer.classList.add("hidden");

  if (state.recognition) {
    try {
      state.recognition.stop();
    } catch (e) {}
  }
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    try {
      state.mediaRecorder.stop();
    } catch (e) {}
  }
}

// ==================== 🔴 REAL-TIME LIVE VOICE CALL MODE (GEMINI 3.8 LIVE WEBSOCKET + CHATGPT VOICE LOOP) ====================
function openLiveVoiceOverlay() {
  const { voiceProvider, voiceName } = getParsedVoicePersona();
  const activeModel = getActiveModelString();
  if (hasGeminiKey() && state.provider === "gemini") {
    dom.liveModeEngineBadge.textContent = `🔴 Gemini 3.8 Live WebSocket (Voice: ${voiceProvider === "gemini" ? voiceName : "Kore"})`;
  } else if (hasOpenAIKey() && state.provider === "openai") {
    dom.liveModeEngineBadge.textContent = `🔴 ChatGPT Live Voice Mode (Voice: ${voiceProvider === "openai" ? voiceName : "coral"})`;
  } else {
    dom.liveModeEngineBadge.textContent = `🔴 Built-in Live Neural Voice (${activeModel} · Voice: ${voiceName} — No API Key Needed)`;
  }

  dom.liveVoiceOverlay.classList.remove("hidden");
}

function closeLiveVoiceOverlay() {
  stopLiveVoiceSession();
  dom.liveVoiceOverlay.classList.add("hidden");
}

async function toggleLiveVoiceSession() {
  if (state.isLiveCallActive) {
    stopLiveVoiceSession();
  } else {
    await startLiveVoiceSession();
  }
}

async function startLiveVoiceSession() {
  state.isLiveCallActive = true;
  dom.toggleLiveStreamBtn.textContent = "⏸️ Pause Mic";
  dom.liveOrbVisual.className = "live-orb listening";
  dom.liveOrbEmoji.textContent = "🎙️";

  // 1. If Gemini Key is active & Gemini provider is selected, connect directly to Gemini 3.8 Live WebSocket!
  if (hasGeminiKey() && state.provider === "gemini") {
    try {
      await startGemini38LiveWebSocketSession();
      return;
    } catch (err) {
      console.warn("Gemini Live WebSocket fallback to Continuous Voice Loop:", err);
    }
  }

  // 2. Continuous Hands-Free Voice Loop (works for ChatGPT Voice Mode & Demo Mode)
  startHandsFreeContinuousVoiceLoop();
}

async function startGemini38LiveWebSocketSession() {
  const { voiceProvider, voiceName } = getParsedVoicePersona();
  const geminiVoice = voiceProvider === "gemini" ? voiceName : "Kore";
  const sc = SCENARIOS[state.scenario];

  dom.liveStateTitle.textContent = "Connecting to Gemini 3.8 Live...";
  dom.liveStateSubtitle.textContent = `Establishing bidirectional 24kHz audio WebSocket (${geminiVoice})...`;

  const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${encodeURIComponent(
    state.apiKey.trim()
  )}`;
  const ws = new WebSocket(wsUrl);
  state.liveWs = ws;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
  state.liveAudioCtx = audioCtx;
  state.liveNextPlayTime = audioCtx.currentTime;

  ws.onopen = async () => {
    const setupMessage = {
      setup: {
        model: "models/gemini-3.8-live",
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: geminiVoice
              }
            }
          }
        },
        systemInstruction: {
          parts: [
            {
              text: `${sc.rolePrompt} You are in a live real-time voice conversation with an English learner (${state.learnerLevel}). Speak naturally, warmly, and concisely (1-3 sentences per turn), and gently help them express themselves.`
            }
          ]
        },
        inputAudioTranscription: {},
        outputAudioTranscription: {}
      }
    };
    ws.send(JSON.stringify(setupMessage));

    dom.liveStateTitle.textContent = `Listening (${geminiVoice} Live)...`;
    dom.liveStateSubtitle.textContent = "Speak freely in English — Gemini 3.8 Live hears you in real time.";
    await startMicPcmStreamingToWebSocket(ws);
  };

  let currentInputText = "";
  let currentOutputText = "";

  ws.onmessage = async (event) => {
    let rawText = event.data;
    if (rawText instanceof Blob) {
      rawText = await rawText.text();
    }
    const response = JSON.parse(rawText);
    const serverContent = response.serverContent;
    if (!serverContent) return;

    // Play incoming 24kHz 16-bit PCM audio chunks immediately
    if (serverContent.modelTurn?.parts) {
      dom.liveOrbVisual.className = "live-orb speaking";
      dom.liveOrbEmoji.textContent = "🔊";
      dom.liveStateTitle.textContent = `${geminiVoice} is Speaking...`;
      for (const part of serverContent.modelTurn.parts) {
        if (part.inlineData?.data) {
          playPcm24kChunkBase64(part.inlineData.data);
        }
      }
    }

    if (serverContent.inputTranscription?.text) {
      currentInputText += serverContent.inputTranscription.text;
      dom.liveUserTranscript.textContent = currentInputText;
    }

    if (serverContent.outputTranscription?.text) {
      currentOutputText += serverContent.outputTranscription.text;
      dom.liveAiTranscript.textContent = currentOutputText;
    }

    if (serverContent.interrupted) {
      state.liveNextPlayTime = state.liveAudioCtx ? state.liveAudioCtx.currentTime : 0;
    }

    if (serverContent.turnComplete) {
      dom.liveOrbVisual.className = "live-orb listening";
      dom.liveOrbEmoji.textContent = "🎙️";
      dom.liveStateTitle.textContent = "Listening... Your Turn!";
      if (currentInputText.trim()) {
        appendMessage("user", currentInputText.trim());
        // Run background grammar coaching on what the user said in Live Mode!
        const spokenTurn = currentInputText.trim();
        currentInputText = "";
        const localCoach = generateLocalDemoCoaching(spokenTurn);
        renderCoachingFeedback({
          lastUtterance: spokenTurn,
          correctedSentence: localCoach.corrected_sentence,
          grammarExplanation: localCoach.grammar_explanation,
          isPerfect: localCoach.is_grammar_perfect,
          betterExpressions: localCoach.better_expressions,
          pronunciationTips: localCoach.pronunciation_tips,
          vocabulary: localCoach.key_vocabulary
        });
        saveSentenceToHistory({
          userSaid: spokenTurn,
          corrected: localCoach.corrected_sentence,
          explanation: localCoach.grammar_explanation,
          betterExpression: localCoach.better_expressions?.[0]?.phrase || "",
          starred: !localCoach.is_grammar_perfect
        });
      }
      if (currentOutputText.trim()) {
        appendMessage("ai", currentOutputText.trim());
        currentOutputText = "";
      }
      saveCurrentSessionToArchive(false);
    }
  };

  ws.onerror = (err) => {
    console.warn("Gemini Live WebSocket error:", err);
  };

  ws.onclose = () => {
    if (state.isLiveCallActive) {
      stopLiveVoiceSession();
    }
  };
}

async function startMicPcmStreamingToWebSocket(ws) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      sampleRate: 16000,
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true
    }
  });
  state.liveMicStream = stream;

  const micCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
  const source = micCtx.createMediaStreamSource(stream);
  const processor = micCtx.createScriptProcessor(4096, 1, 1);
  state.liveScriptProcessor = { micCtx, processor, source };

  processor.onaudioprocess = (e) => {
    if (!state.isLiveCallActive || ws.readyState !== WebSocket.OPEN) return;
    const float32Data = e.inputBuffer.getChannelData(0);
    const int16Data = new Int16Array(float32Data.length);
    for (let i = 0; i < float32Data.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Data[i]));
      int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const uint8 = new Uint8Array(int16Data.buffer);
    let binary = "";
    for (let i = 0; i < uint8.byteLength; i++) {
      binary += String.fromCharCode(uint8[i]);
    }
    const base64Pcm = btoa(binary);
    ws.send(
      JSON.stringify({
        realtimeInput: {
          audio: {
            data: base64Pcm,
            mimeType: "audio/pcm;rate=16000"
          }
        }
      })
    );
  };

  source.connect(processor);
  processor.connect(micCtx.destination);
}

function playPcm24kChunkBase64(base64Data) {
  if (!state.liveAudioCtx) return;
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }

  const audioBuffer = state.liveAudioCtx.createBuffer(1, float32.length, 24000);
  audioBuffer.getChannelData(0).set(float32);

  const source = state.liveAudioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(state.liveAudioCtx.destination);

  const now = state.liveAudioCtx.currentTime;
  const startTime = Math.max(now, state.liveNextPlayTime);
  source.start(startTime);
  state.liveNextPlayTime = startTime + audioBuffer.duration;
}

// Hands-free Continuous Voice Loop for ChatGPT Voice Mode & Demo Mode
function startHandsFreeContinuousVoiceLoop() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    dom.liveStateTitle.textContent = "Speech Recognition Unavailable";
    dom.liveStateSubtitle.textContent = "Please use Chrome or Edge for Live Voice Mode.";
    return;
  }

  const liveRec = new SpeechRecognition();
  liveRec.lang = state.voiceAccent;
  liveRec.interimResults = true;
  liveRec.continuous = false;
  state.liveLoopRecognition = liveRec;

  dom.liveOrbVisual.className = "live-orb listening";
  dom.liveOrbEmoji.textContent = "🎙️";
  dom.liveStateTitle.textContent = "Listening... Speak Naturally";
  dom.liveStateSubtitle.textContent =
    "When you pause at the end of a sentence, your AI partner will immediately reply in voice!";

  let turnTranscript = "";
  let finalPauseTimer = null;

  liveRec.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        turnTranscript += t + " ";
      } else {
        interim += t;
      }
    }
    dom.liveUserTranscript.textContent = (turnTranscript + interim).trim();

    // Fast end-of-turn detection: instead of waiting ~2.0s of browser silence after a final phrase,
    // trigger response after 750ms of silence once a final phrase is captured!
    clearTimeout(finalPauseTimer);
    if (turnTranscript.trim() && !interim.trim()) {
      finalPauseTimer = setTimeout(() => {
        try {
          liveRec.stop();
        } catch (e) {}
      }, 750);
    }
  };

  liveRec.onend = async () => {
    clearTimeout(finalPauseTimer);
    if (!state.isLiveCallActive) return;
    const finalSpoken = turnTranscript.trim();
    turnTranscript = "";

    if (finalSpoken) {
      dom.liveOrbVisual.className = "live-orb speaking";
      dom.liveOrbEmoji.textContent = "🔊";
      dom.liveStateTitle.textContent = "AI Partner is Replying...";
      const res = await handleSendUserMessage(finalSpoken);
      if (res && res.reply) {
        dom.liveAiTranscript.textContent = res.reply;
      }
    }

    if (state.isLiveCallActive) {
      dom.liveOrbVisual.className = "live-orb listening";
      dom.liveOrbEmoji.textContent = "🎙️";
      dom.liveStateTitle.textContent = "Listening... Your Turn!";
      try {
        liveRec.start();
      } catch (e) {}
    }
  };

  try {
    liveRec.start();
  } catch (e) {}
}

function stopLiveVoiceSession() {
  state.isLiveCallActive = false;
  dom.toggleLiveStreamBtn.textContent = "🎙️ Start Talking";
  dom.liveOrbVisual.className = "live-orb";
  dom.liveOrbEmoji.textContent = "🎙️";
  dom.liveStateTitle.textContent = "Live Session Paused";
  dom.liveStateSubtitle.textContent = "Click 'Start Talking' to resume real-time voice conversation.";

  if (state.liveWs) {
    try {
      state.liveWs.close();
    } catch (e) {}
    state.liveWs = null;
  }
  if (state.liveMicStream) {
    state.liveMicStream.getTracks().forEach((t) => t.stop());
    state.liveMicStream = null;
  }
  if (state.liveScriptProcessor) {
    try {
      state.liveScriptProcessor.processor.disconnect();
      state.liveScriptProcessor.source.disconnect();
      state.liveScriptProcessor.micCtx.close();
    } catch (e) {}
    state.liveScriptProcessor = null;
  }
  if (state.liveAudioCtx) {
    try {
      state.liveAudioCtx.close();
    } catch (e) {}
    state.liveAudioCtx = null;
  }
  if (state.liveLoopRecognition) {
    try {
      state.liveLoopRecognition.stop();
    } catch (e) {}
    state.liveLoopRecognition = null;
  }
}

// ==================== EVENT LISTENERS ====================
// ==================== PIPECAT AI REAL-TIME INTERRUPT & BARGE-IN ====================
function interruptPipecatPlayback() {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  if (state.activeAudioElement) {
    try {
      state.activeAudioElement.pause();
      state.activeAudioElement.currentTime = 0;
    } catch (_) {}
  }
  stopVoiceVisualizer();
}

function bindEvents() {
  // Mobile Drawer Navigation Events
  if (dom.mobileMenuBtn) dom.mobileMenuBtn.addEventListener("click", openMobileSidebar);
  if (dom.mobileSidebarCloseBtn) dom.mobileSidebarCloseBtn.addEventListener("click", closeMobileSidebar);
  if (dom.mobileDrawerBackdrop) dom.mobileDrawerBackdrop.addEventListener("click", closeMobileSidebar);

  // Mobile View Switcher (Chat vs AI Coach)
  if (dom.mobileTabChat) {
    dom.mobileTabChat.addEventListener("click", () => setMobileActiveView("chat"));
  }
  if (dom.mobileTabCoach) {
    dom.mobileTabCoach.addEventListener("click", () => setMobileActiveView("coach"));
  }
  if (dom.mobileBackToChatBtn) {
    dom.mobileBackToChatBtn.addEventListener("click", () => setMobileActiveView("chat"));
  }

  dom.scenarioList.addEventListener("click", (e) => {
    const btn = e.target.closest(".scenario-btn");
    if (!btn) return;
    loadScenario(btn.dataset.scenario);
    closeMobileSidebar();
  });

  // Header Quick Model Switcher — automatically switches both the AI model AND its signature neural voice!
  dom.quickModelSelect.addEventListener("change", () => {
    const val = dom.quickModelSelect.value;
    const [prov, mod] = val.split(":");
    state.provider = prov;
    if (prov === "openai") {
      state.openaiModel = "gpt-4o";
      localStorage.setItem("speakflow_openai_model", "gpt-4o");
    } else {
      state.model = "gemini-3.8-flash";
      localStorage.setItem("speakflow_gemini_model", "gemini-3.8-flash");
    }
    localStorage.setItem("speakflow_ai_provider", prov);
    syncSettingsUI();
    showToast(`Switched to ${prov === "openai" ? "ChatGPT (GPT-4o)" : "Gemini 3.8 Flash"}`);
  });

  // Header Quick Voice Persona Switcher (Female vs Male with instant voice preview)
  if (dom.quickVoicePersonaSelect) {
    dom.quickVoicePersonaSelect.value = state.voicePersona;
    dom.quickVoicePersonaSelect.addEventListener("change", () => {
      const selected = dom.quickVoicePersonaSelect.value;
      state.voicePersona = selected;
      localStorage.setItem("speakflow_voice_persona", selected);
      syncSettingsUI();
      const label = selected === "male" ? "👨 Male Voice" : "👩 Female Voice";
      showToast(`Switched to ${label}`);
      // Instant audible preview demonstrating distinct gender voice
      speakText(selected === "male" ? "Hello! I am your male conversation partner." : "Hello! I am your female conversation partner.");
    });
  }

  // Header Quick Audio Toggle (Voice On / Muted)
  const syncAudioToggleBtnUI = () => {
    if (!dom.audioToggleBtn) return;
    if (state.autoSpeak) {
      dom.audioToggleBtn.classList.add("active");
      if (dom.audioToggleLabel) dom.audioToggleLabel.textContent = "Voice On";
      if (dom.audioToggleIcon) {
        dom.audioToggleIcon.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
      }
    } else {
      dom.audioToggleBtn.classList.remove("active");
      if (dom.audioToggleLabel) dom.audioToggleLabel.textContent = "Muted";
      if (dom.audioToggleIcon) {
        dom.audioToggleIcon.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>`;
      }
    }
  };
  syncAudioToggleBtnUI();

  if (dom.audioToggleBtn) {
    dom.audioToggleBtn.addEventListener("click", () => {
      state.autoSpeak = !state.autoSpeak;
      localStorage.setItem("speakflow_auto_speak", String(state.autoSpeak));
      syncAudioToggleBtnUI();
      if (state.autoSpeak) {
        showToast("🔊 Voice enabled: AI will read replies aloud.");
        const isMale = (state.voicePersona === "male");
        speakText(isMale ? "Voice enabled." : "Voice enabled.");
      } else {
        if (state.activeAudio) {
          try { state.activeAudio.pause(); state.activeAudio.currentTime = 0; } catch (e) {}
          state.activeAudio = null;
        }
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        showToast("🔇 Voice muted: Silent text mode.");
      }
    });
  }

  // Header Saved Chats Button
  if (dom.openSavedChatsBtn) {
    dom.openSavedChatsBtn.addEventListener("click", () => {
      openSavedConversationsModal();
    });
  }
  if (dom.closeSavedConvBtn) {
    dom.closeSavedConvBtn.addEventListener("click", () => {
      closeSavedConversationsModal();
    });
  }
  if (dom.backToSavedListBtn) {
    dom.backToSavedListBtn.addEventListener("click", () => {
      showSavedListView();
    });
  }
  if (dom.resumeSavedChatBtn) {
    dom.resumeSavedChatBtn.addEventListener("click", () => {
      resumeSavedConversation();
    });
  }
  if (dom.deleteCurrentSavedChatBtn) {
    dom.deleteCurrentSavedChatBtn.addEventListener("click", () => {
      deleteCurrentSavedConversation();
    });
  }

  dom.saveSessionBtn.addEventListener("click", saveCurrentConversation);

  dom.bookmarkCurrentCorrectionBtn.addEventListener("click", () => {
    if (!state.currentCoaching) return;
    saveSentenceToHistory({
      userSaid: state.currentCoaching.lastUtterance,
      corrected: state.currentCoaching.correctedSentence,
      explanation: state.currentCoaching.grammarExplanation,
      betterExpression: state.currentCoaching.betterExpressions?.[0]?.phrase || "",
      starred: true
    });
    showToast("⭐ Bookmarked grammar note to Review Notebook!");
  });

  dom.listenHintBtn.addEventListener("click", () => {
    const raw = dom.hintText.textContent.replace(/^"|"$/g, "");
    speakText(raw);
  });

  dom.useHintBtn.addEventListener("click", () => {
    const raw = dom.hintText.textContent.replace(/^"|"$/g, "");
    dom.userInput.value = raw;
    dom.userInput.focus();
  });

  dom.micBtn.addEventListener("click", () => {
        startVoiceCapture();
  });
  dom.stopMicBtn.addEventListener("click", stopVoiceCapture);
  dom.sendBtn.addEventListener("click", () => {
        handleSendUserMessage();
  });

  dom.userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendUserMessage();
    }
  });

  dom.userInput.addEventListener("input", () => {
    dom.userInput.style.height = "auto";
    dom.userInput.style.height = Math.min(dom.userInput.scrollHeight, 120) + "px";
  });

  function handleStartNewConversation() {
    if (state.activeAudio) {
      try { state.activeAudio.pause(); } catch (e) {}
      state.activeAudio = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (state.isRecording) {
      stopVoiceCapture();
    }
    if (dom.userInput) {
      dom.userInput.value = "";
      dom.userInput.style.height = "auto";
    }

    state.currentSessionId = "session-" + Date.now();
    state.currentMessages = [];
    state.turnCount = 1;
    if (dom.turnCount) dom.turnCount.textContent = "1";

    const sc = SCENARIOS[state.scenario] || SCENARIOS.casual;
    dom.chatStream.innerHTML = "";
    appendMessage("ai", sc.openingMessage);
    dom.hintText.textContent = `"${sc.starterHint}"`;

    state.currentCoaching = sc.initialCoaching;
    renderCoachingFeedback(sc.initialCoaching);

    showToast("🌱 대화창이 초기화되었습니다. 새로운 대화를 시작하세요!");
    setTimeout(() => {
      if (dom.userInput) dom.userInput.focus();
    }, 80);
  }
  dom.resetChatBtn.addEventListener("click", handleStartNewConversation);

  // ==================== HISTORY & REVIEW NOTEBOOK EVENTS ====================
  dom.openHistoryBtn.addEventListener("click", () => {
    openHistoryModal("sentences");
  });

  const closeHistory = () => dom.historyModal.classList.add("hidden");
  dom.closeHistoryBtn.addEventListener("click", closeHistory);
  dom.doneHistoryBtn.addEventListener("click", closeHistory);
  dom.historyModal.addEventListener("click", (e) => {
    if (e.target === dom.historyModal) closeHistory();
  });

  document.querySelectorAll(".history-tab").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      document.querySelectorAll(".history-tab").forEach((b) => b.classList.remove("active"));
      tabBtn.classList.add("active");
      const tab = tabBtn.dataset.tab;
      state.activeHistoryTab = tab;
      dom.tabPanelSentences.classList.toggle("hidden", tab !== "sentences");
      dom.tabPanelVocabulary.classList.toggle("hidden", tab !== "vocabulary");
      dom.tabPanelSessions.classList.toggle("hidden", tab !== "sessions");
    });
  });

  dom.historySearchInput.addEventListener("input", renderHistoryModalContent);
  dom.filterStarredOnly.addEventListener("change", renderHistoryModalContent);
  dom.exportHistoryBtn.addEventListener("click", exportStudyGuideMarkdown);

  dom.clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all saved sentences, vocabulary, and chat sessions?")) {
      state.sentenceHistory = [];
      state.vocabHistory = [];
      state.sessionHistory = [];
      persistHistoryToStorage();
      renderHistoryModalContent();
      showToast("Cleared speaking history.");
    }
  });

  dom.historyModal.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    const text = btn.dataset.text ? decodeURIComponent(btn.dataset.text) : "";

    if (action === "speak-sent" || action === "speak-voc") {
      speakText(text);
    } else if (action === "practice-sent") {
      dom.userInput.value = text;
      closeHistory();
      dom.userInput.focus();
      speakText(text, 0.9);
    } else if (action === "use-voc") {
      dom.userInput.value = `I'd like to use "${text}" in a sentence: `;
      closeHistory();
      dom.userInput.focus();
    } else if (action === "star-sent") {
      const item = state.sentenceHistory.find((s) => s.id === id);
      if (item) {
        item.starred = !item.starred;
        persistHistoryToStorage();
        renderHistoryModalContent();
      }
    } else if (action === "delete-sent") {
      state.sentenceHistory = state.sentenceHistory.filter((s) => s.id !== id);
      persistHistoryToStorage();
      renderHistoryModalContent();
    } else if (action === "star-voc") {
      const item = state.vocabHistory.find((v) => v.id === id);
      if (item) {
        item.starred = !item.starred;
        persistHistoryToStorage();
        renderHistoryModalContent();
      }
    } else if (action === "delete-voc") {
      state.vocabHistory = state.vocabHistory.filter((v) => v.id !== id);
      persistHistoryToStorage();
      renderHistoryModalContent();
    } else if (action === "load-session") {
      const sess = state.sessionHistory.find((s) => s.id === id);
      if (sess) {
        loadScenario(sess.scenarioKey);
        state.currentSessionId = sess.id;
        state.currentMessages = [];
        dom.chatStream.innerHTML = "";
        sess.messages.forEach((m) => appendMessage(m.role, m.text, true));
        if (sess.coaching) renderCoachingFeedback(sess.coaching);
        closeHistory();
        showToast(`📂 Loaded session: ${sess.scenarioTitle}`);
      }
    } else if (action === "delete-session") {
      state.sessionHistory = state.sessionHistory.filter((s) => s.id !== id);
      persistHistoryToStorage();
      renderHistoryModalContent();
    }
  });

  // ==================== SETTINGS MODAL EVENTS ====================
  dom.openSettingsBtn.addEventListener("click", () => {
    syncSettingsUI();
    dom.settingsModal.classList.remove("hidden");
  });

  dom.closeSettingsBtn.addEventListener("click", () => {
    dom.settingsModal.classList.add("hidden");
  });

  dom.settingsModal.addEventListener("click", (e) => {
    if (e.target === dom.settingsModal) {
      dom.settingsModal.classList.add("hidden");
    }
  });

  dom.providerSelect.addEventListener("change", () => {
    const p = dom.providerSelect.value;
    dom.geminiModelGroup.classList.toggle("hidden", p !== "gemini");
    dom.openaiModelGroup.classList.toggle("hidden", p !== "openai");
  });

  dom.toggleKeyVisibility.addEventListener("click", () => {
    dom.apiKeyInput.type = dom.apiKeyInput.type === "password" ? "text" : "password";
  });

  dom.toggleOpenaiKeyVisibility.addEventListener("click", () => {
    dom.openaiApiKeyInput.type = dom.openaiApiKeyInput.type === "password" ? "text" : "password";
  });

  dom.saveSettingsBtn.addEventListener("click", () => {
    state.provider = dom.providerSelect.value;
    state.apiKey = dom.apiKeyInput.value.trim();
    state.openaiApiKey = dom.openaiApiKeyInput.value.trim();
    state.model = dom.modelSelect.value;
    state.openaiModel = dom.openaiModelSelect.value;
    state.learnerLevel = dom.learnerLevelSelect.value;
    state.ttsEngine = dom.ttsEngineSelect.value;
    if (dom.sttEngineSelect) state.sttEngine = dom.sttEngineSelect.value;
    state.voiceAccent = dom.voiceAccentSelect.value;
    state.speechRate = parseFloat(dom.speechRateSelect.value);
    state.autoSpeak = dom.autoSpeakToggle.checked;
    state.conversationMode = state.autoSpeak ? "voice" : "chat";

    localStorage.setItem("speakflow_ai_provider", state.provider);
    localStorage.setItem("speakflow_gemini_api_key", state.apiKey);
    localStorage.setItem("speakflow_openai_api_key", state.openaiApiKey);
    localStorage.setItem("speakflow_gemini_model", state.model);
    localStorage.setItem("speakflow_openai_model", state.openaiModel);
    localStorage.setItem("speakflow_learner_level", state.learnerLevel);
    localStorage.setItem("speakflow_tts_engine", state.ttsEngine);
    localStorage.setItem("speakflow_stt_engine", state.sttEngine);
    localStorage.setItem("speakflow_voice_accent", state.voiceAccent);
    localStorage.setItem("speakflow_speech_rate", String(state.speechRate));
    localStorage.setItem("speakflow_auto_speak", String(state.autoSpeak));
    localStorage.setItem("speakflow_conversation_mode", state.conversationMode);

    syncSettingsUI();
    dom.settingsModal.classList.add("hidden");
    showToast("⚙️ Saved AI Model & Live Voice settings!");
  });

  if (dom.testVoiceBtn) {
    dom.testVoiceBtn.addEventListener("click", async () => {
      state.apiKey = dom.apiKeyInput.value.trim();
      state.openaiApiKey = dom.openaiApiKeyInput.value.trim();
      state.ttsEngine = dom.ttsEngineSelect.value;
      const { voiceName } = getParsedVoicePersona();
      dom.testVoiceBtn.textContent = "🔊 Playing...";
      await speakText(
        `Hi there! This is ${voiceName}, your live English speaking partner. Let's practice together!`
      );
      dom.testVoiceBtn.textContent = "🔊 Test Selected AI Voice";
    });
  }

  dom.testConnectionBtn.addEventListener("click", async () => {
    const prov = dom.providerSelect.value;
    dom.testConnectionBtn.textContent = "⏳ Testing...";
    try {
      if (prov === "openai") {
        const key = dom.openaiApiKeyInput.value.trim();
        const mod = dom.openaiModelSelect.value;
        if (!key) {
          alert("No OpenAI API Key entered — SpeakFlow AI will run in Interactive Demo Mode.");
          return;
        }
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`
          },
          body: JSON.stringify({
            model: mod,
            messages: [{ role: "user", content: "Say 'Connected to ChatGPT!' in 5 words." }]
          })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        alert(`✅ Connected to OpenAI ChatGPT (${mod})!\nReply: ${data.choices?.[0]?.message?.content || "OK"}`);
      } else {
        const key = dom.apiKeyInput.value.trim();
        const mod = dom.modelSelect.value;
        if (!key) {
          alert("No Gemini API Key entered — SpeakFlow AI will run in Interactive Demo Mode.");
          return;
        }
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Revision": "2026-05-20",
            "x-goog-api-key": key
          },
          body: JSON.stringify({
            model: mod,
            input: "Say 'Connected to SpeakFlow AI!' in one short sentence.",
            generation_config: { thinking_level: "low" }
          })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        alert(`✅ Connected to Google Gemini (${mod})!\nInteraction ID: ${data.id || "OK"}`);
      }
    } catch (err) {
      alert(`❌ Connection test failed:\n${err.message}`);
    } finally {
      dom.testConnectionBtn.textContent = "🔌 Test AI Connection";
    }
  });
}

document.addEventListener("DOMContentLoaded", initApp);
