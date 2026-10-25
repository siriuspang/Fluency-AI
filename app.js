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
  model: localStorage.getItem("speakflow_gemini_model") || "gemini-4-argon",
  openaiModel: localStorage.getItem("speakflow_openai_model") || "gpt-4o",
  thinkingLevel: localStorage.getItem("speakflow_thinking_level") || "low",
  learnerLevel: normalizeLearnerLevel(localStorage.getItem("speakflow_learner_level") || "intermediate"),
  // Default to "auto-ai" so as soon as a Gemini/OpenAI key is present, it uses the real AI Live Voice!
  ttsEngine: localStorage.getItem("speakflow_tts_engine") || "auto-ai",
  sttEngine: localStorage.getItem("speakflow_stt_engine") || "hybrid",
  voicePersona: localStorage.getItem("speakflow_voice_persona") || "gemini:Kore", // e.g., "gemini:Puck", "openai:coral"
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
const dom = {
  scenarioList: document.getElementById("scenarioList"),
  activeScenarioIcon: document.getElementById("activeScenarioIcon"),
  activeScenarioTitle: document.getElementById("activeScenarioTitle"),
  activeScenarioSubtitle: document.getElementById("activeScenarioSubtitle"),
  headerProviderIcon: document.getElementById("headerProviderIcon"),
  quickModelSelect: document.getElementById("quickModelSelect"),
  quickVoicePersonaSelect: document.getElementById("quickVoicePersonaSelect"),
  quickModeIcon: document.getElementById("quickModeIcon"),
  quickModeSelect: document.getElementById("quickModeSelect"),
  quickLevelSelect: document.getElementById("quickLevelSelect"),
  startLiveOrbBtn: document.getElementById("startLiveOrbBtn"),
  saveSessionBtn: document.getElementById("saveSessionBtn"),
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
  const parts = (state.voicePersona || "gemini:Kore").split(":");
  const rawName = parts[1] || "Kore";
  const voiceDisplayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  return {
    voiceProvider: parts[0] || "gemini",
    voiceName: rawName,
    voiceDisplayName
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

function showToast(message) {
  dom.toastNotification.textContent = message;
  dom.toastNotification.classList.remove("hidden");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    dom.toastNotification.classList.add("hidden");
  }, 2600);
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

  if (role === "ai") {
    const slowBtn = document.createElement("button");
    slowBtn.className = "btn-bubble-action";
    slowBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Slow</span>`;
    slowBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      speakText(text, 0.8);
    });
    actions.appendChild(slowBtn);

    const shadowBtn = document.createElement("button");
    shadowBtn.className = "btn-bubble-action";
    shadowBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg><span>Shadow</span>`;
    shadowBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dom.userInput.value = text;
      speakText(text, 0.9);
      dom.userInput.focus();
    });
    actions.appendChild(shadowBtn);
  }

  const saveSentenceBtn = document.createElement("button");
  saveSentenceBtn.className = "btn-bubble-action";
  saveSentenceBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
  saveSentenceBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    saveSentenceToHistory({
      userSaid: role === "user" ? text : "(Saved AI Expression)",
      corrected: text,
      explanation:
        role === "user"
          ? "Bookmarked speaking turn."
          : "Bookmarked native response.",
      betterExpression: text,
      starred: true
    });
    showToast("Saved to Review Notebook!");
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
      dom.userSentenceStatus.textContent = "오류 분석 대기";
      dom.userSentenceStatus.className = "user-sentence-status";
    }
  } else {
    const diff = computeWordDiff(rawUserUtterance, primarySentence);
    if (dom.lastUserUtterance) {
      dom.lastUserUtterance.innerHTML = `"${diff.origHtml}"`;
    }
    if (dom.userSentenceStatus) {
      if (coaching.isPerfect || !diff.hasErrors) {
        dom.userSentenceStatus.textContent = "✅ 어법 완벽 (오류 없음)";
        dom.userSentenceStatus.className = "user-sentence-status perfect";
      } else {
        dom.userSentenceStatus.textContent = "⚠️ 틀린 부분 표시됨 (빨간색)";
        dom.userSentenceStatus.className = "user-sentence-status has-error";
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

  const btnSavePrimary = document.createElement("button");
  btnSavePrimary.className = "btn-bubble-action";
  btnSavePrimary.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
  btnSavePrimary.addEventListener("click", (e) => {
    e.stopPropagation();
    saveSentenceToHistory({
      userSaid: rawUserUtterance || "(Practice Sentence)",
      corrected: primarySentence,
      explanation: `Grammar Fix`,
      betterExpression: primarySentence,
      starred: true
    });
    showToast(`Saved "Grammar Fix" to Review Notebook!`);
  });

  primaryBtnGroup.appendChild(btnListenPrimary);
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
  const exprs = Array.isArray(coaching.betterExpressions) ? coaching.betterExpressions : [];
  const altPhrases = exprs.filter((ex) => ex?.phrase && ex.phrase !== primarySentence);

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

      const btnSaveAlt = document.createElement("button");
      btnSaveAlt.className = "btn-bubble-action";
      btnSaveAlt.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>Save</span>`;
      btnSaveAlt.addEventListener("click", (e) => {
        e.stopPropagation();
        saveSentenceToHistory({
          userSaid: rawUserUtterance || "(Practice Sentence)",
          corrected: ex.phrase,
          explanation: `Alternative ${idx + 1} — ${coaching.grammarExplanation || ""}`,
          betterExpression: ex.phrase,
          starred: true
        });
        showToast(`Saved "Alternative ${idx + 1}" to Review Notebook!`);
      });

      altBtns.appendChild(btnListenAlt);
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

  dom.betterExpressionsList.innerHTML = "";
  (coaching.betterExpressions || []).forEach((item) => {
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
    saveWordBtn.className = "btn-bubble-action";
    saveWordBtn.textContent = "＋ Save";
    saveWordBtn.title = "Save to Vocabulary Bank";
    saveWordBtn.addEventListener("click", () => {
      saveVocabToHistory(v.word, v.meaning, true);
      showToast(`📚 Saved "${v.word}" to Vocabulary Bank!`);
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
    showToast("💾 Chat session saved to Speaking History!");
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
      card.className = "history-card";
      card.innerHTML = `
        <div class="history-card-top">
          <div class="history-meta-badges">
            <span class="meta-pill">${item.scenario}</span>
            <span class="meta-pill">${item.provider}</span>
            <span>${item.timestamp}</span>
          </div>
          <button class="btn-star ${item.starred ? "starred" : ""}" data-action="star-sent" data-id="${item.id}">
            ${item.starred ? "⭐ Starred" : "☆ Star"}
          </button>
        </div>
        <div class="history-said"><span>You said:</span> "${item.userSaid}"</div>
        <div class="history-corrected">✅ ${item.corrected}</div>
        <div class="history-explanation">💡 ${item.explanation}</div>
        ${
          item.betterExpression
            ? `<div class="history-explanation" style="color:#a5b4fc;">✨ <strong>Native Upgrade:</strong> "${item.betterExpression}"</div>`
            : ""
        }
        <div class="history-card-actions">
          <button class="btn-bubble-action" data-action="speak-sent" data-text="${encodeURIComponent(item.corrected)}">🔊 Listen Corrected</button>
          <button class="btn-bubble-action" data-action="practice-sent" data-text="${encodeURIComponent(item.corrected)}">🎯 Practice in Chat</button>
          <button class="btn-bubble-action" data-action="delete-sent" data-id="${item.id}" style="margin-left:auto;color:#fda4af;">🗑️ Remove</button>
        </div>
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

function analyzeGrammarAndPhrasing(userMessage, modelMeta) {
  const rawOriginal = userMessage.trim();
  let corrected = rawOriginal;
  const notes = [];
  let isPerfect = true;

  // 1. Common spelling fixes (applied first so downstream rules see clean spelling)
  const spellingMap = [
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
    { regex: /\bshoudn'?t\b/gi, replacement: "shouldn't", word: '"shoudn\'t" → "shouldn\'t" (spelled s-h-o-u-l-d-n\'-t with an "l")' },
    { regex: /\bdidnt\b/gi, replacement: "didn't", word: '"didnt" → "didn\'t" (needs an apostrophe)' },
    { regex: /\bcouldnt\b/gi, replacement: "couldn't", word: '"couldnt" → "couldn\'t" (needs an apostrophe)' }
  ];

  for (const sp of spellingMap) {
    if (sp.regex.test(corrected)) {
      corrected = corrected.replace(sp.regex, sp.replacement);
      isPerfect = false;
      notes.push(`Spelling fix: ${sp.word}.`);
    }
  }


  // 1c. "hows going" / "how is going" -> "how's it going?"
  if (/\bhow'?s\s+going\b/i.test(corrected) || /\bhow\s+is\s+going\b/i.test(corrected)) {
    corrected = corrected.replace(/\bhow'?s\s+going\b/gi, "how's it going").replace(/\bhow\s+is\s+going\b/gi, "how's it going");
    isPerfect = false;
    notes.push(`Grammar fix: The standard conversational phrase requires the pronoun "it": use "how's it going?" instead of "hows going".`);
  }

  // 1d. "by walk" -> "on foot"
  if (/\bby\s+walk\b/i.test(corrected)) {
    corrected = corrected.replace(/\bby\s+walk\b/gi, "on foot");
    isPerfect = false;
    notes.push(`Collocation fix: In English, walking to a place is expressed as "on foot" or using the verb "walk" ("I walked to work").`);
  }

  // 1e. "every days" -> "every day"
  if (/\bevery\s+days\b/i.test(corrected)) {
    corrected = corrected.replace(/\bevery\s+days\b/gi, "every day");
    isPerfect = false;
    notes.push(`Determiner fix: "Every" is followed by a singular countable noun ("every day", not "every days").`);
  }

  // 1f. "she don't" / "he don't" -> doesn't
  if (/\b(she|he|it)\s+don'?t\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(she|he|it)\s+don'?t\b/gi, "$1 doesn't");
    isPerfect = false;
    notes.push(`Subject-verb agreement: Third-person singular subjects (he/she/it) require "doesn't", not "don't".`);
  }

  // 1g. Past tense marker with base verb ("yesterday I go" -> "yesterday I went")
  if (/\b(yesterday|last\s+(?:night|week|month|year))\b/i.test(corrected)) {
    const pastMap = { go: "went", see: "saw", buy: "bought", eat: "ate", make: "made", come: "came", take: "took", write: "wrote" };
    for (const [base, past] of Object.entries(pastMap)) {
      const pReg = new RegExp(`(\b(?:yesterday|last\s+(?:night|week|month|year))\b[\s\w]*?\b)(${base})\b`, "gi");
      if (pReg.test(corrected)) {
        corrected = corrected.replace(pReg, `$1${past}`);
        isPerfect = false;
        notes.push(`Tense fix: Use the past tense "${past}" when referring to a past time marker like "yesterday".`);
      }
    }
  }

  // 1h. Number + singular noun ("two apple" -> "two apples")
  if (/\b(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(apple|car|book|friend|day|hour|dollar|problem|student)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\b(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(apple|car|book|friend|day|hour|dollar|problem|student)\b/gi,
      "$1 $2s"
    );
    isPerfect = false;
    notes.push(`Plural noun fix: Numbers greater than one require a plural noun ending in "-s".`);
  }

    // 1b. "I depressed by the time when I couldn't speak English well in my friend's wedding." & emotional/event grammar fixes
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
    notes.push(`Preposition fix: use "at" (e.g., "at my friend's wedding") instead of "in" when referring to events or ceremonies.`);
  } else if (/\bat\s+(my\s+)?friend\s+(wedding|party)\b/i.test(corrected)) {
    corrected = corrected.replace(/\bat\s+(my\s+)?friend\s+(wedding|party)\b/gi, "at $1friend's $2");
    isPerfect = false;
    notes.push(`Possessive fix: add "'s" ("my friend's wedding") to show possession.`);
  }

  // 2. "This tool is impressive for me. Because I made it with agy." & related patterns
  // Strictly preserve the user's words while fixing the grammar (for me -> to me, . Because -> because, agy -> AGY)
  if (/\bimpressive\s+for\s+me\b/i.test(corrected)) {
    corrected = corrected.replace(/\bimpressive\s+for\s+me\b/gi, "impressive to me");
    isPerfect = false;
    notes.push(`Preposition fix: use "impressive to me" instead of "impressive for me".`);
  }
  if (/([a-z0-9])\s*\.\s+Because\s+/i.test(corrected)) {
    corrected = corrected.replace(/([a-z0-9])\s*\.\s+Because\s+/gi, "$1 because ");
    isPerfect = false;
    notes.push(`Sentence structure fix: "because..." is a dependent clause—connect it directly to the main sentence without a period before "because".`);
  }
  if (/\bagy\b/.test(corrected)) {
    corrected = corrected.replace(/\bagy\b/g, "AGY");
  }

  // 3. "I'm spending time for this around 3 hours." / Duration & "spend time on" fixes
  // Preserve the user's structure while fixing word order ("spending around 3 hours on this") and preposition ("on")
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

  // 4. "Your speed is a little fast to me. Please slow down and speak more simple sentences."
  // Keep "Your speed is a little fast..." and fix "to me" -> "for me"
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

  // "speak simpler sentences" -> "speak in simpler sentences" (preserving the user's verb "speak"!)
  if (/\bspeak\s+(simpler|simple|shorter|short|easier|easy)\s+sentences\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bspeak\s+(simpler|simple|shorter|short|easier|easy)\s+sentences\b/gi,
      "speak in $1 sentences"
    );
    isPerfect = false;
    notes.push(`Grammar fix: add "in" after "speak" ("speak in simpler sentences") or use the verb "use" ("use simpler sentences").`);
  }

  // 5. "I'm on vibe coding" -> "I'm vibe coding"
  if (/\bi'm\s+on\s+vibe\s+coding\b/i.test(corrected)) {
    corrected = corrected.replace(/\bi'm\s+on\s+vibe\s+coding\b/gi, "I'm vibe coding");
    isPerfect = false;
    notes.push(`Drop "on" before "vibe coding"—use "I'm vibe coding" or "I'm doing some vibe coding".`);
  }

  // 6. "to make useful English speaking, writing tool" -> "to build a useful English speaking and writing tool"
  if (/\bto\s+make\s+useful\s+english\s+speaking,\s*writing\s+tool\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bto\s+make\s+useful\s+english\s+speaking,\s*writing\s+tool\b/gi,
      "to build a useful English speaking and writing tool"
    );
    isPerfect = false;
    notes.push(
      `Add the article "a" before the singular countable noun "tool" ("a useful ... tool") and connect the two modifiers with "and" ("speaking and writing tool").`
    );
  } else if (/\bto\s+make\s+(useful|good|great|new)\s+([^,.!?]+?)\s+tool\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bto\s+make\s+(useful|good|great|new)\s+([^,.!?]+?)\s+tool\b/gi,
      "to build a $1 $2 tool"
    );
    isPerfect = false;
    notes.push(`Countable singular nouns like "tool" require an article ("a useful ... tool").`);
  }

  // 7. "The biggest challenge is make [adj] [noun]" -> "The biggest challenge is making a(n) [adj] [noun]"
  if (/\bthe\s+biggest\s+challenge\s+is\s+make\s+(correct|good|useful|natural|accurate)\s+tool\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bthe\s+biggest\s+challenge\s+is\s+make\s+(correct|good|useful|natural|accurate)\s+tool\b/gi,
      "The biggest challenge is building an accurate, natural-sounding tool"
    );
    isPerfect = false;
    notes.push(
      `After "The biggest challenge is...", use an "-ing" gerund ("making" / "building") or "to make", and include an article ("an accurate tool").`
    );
  } else if (/\b(challenge|problem|goal|part)\s+is\s+(make|build|create|find|learn|speak|write)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\b(challenge|problem|goal|part)\s+is\s+(make|build|create|find|learn|speak|write)\b/gi,
      (m, noun, verb) => `${noun} is ${verb.replace(/e$/, "")}ing`
    );
    isPerfect = false;
    notes.push(`After "The biggest challenge/goal is...", use the gerund "-ing" form or "to + verb".`);
  }

  // 8. "your answer is very awkward to me" -> "your answers sound a bit awkward to me"
  if (/\byour\s+answer\s+is\s+very\s+awkward\s+to\s+me\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\byour\s+answer\s+is\s+very\s+awkward\s+to\s+me\b/gi,
      "your answers sound a bit awkward to me"
    );
    isPerfect = false;
    notes.push(`In natural English, native speakers say "your answers sound awkward to me" rather than "is awkward to me".`);
  }

  // 9. "is distance from my house" -> "is the distance from my house"
  if (/\bis\s+distance\s+from\s+my\s+(house|home|apartment|place)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\bis\s+distance\s+from\s+my\s+(house|home|apartment|place)\b/gi,
      "is the distance from my $1"
    );
    isPerfect = false;
    notes.push(`Add the definite article "the" before "distance" when referring to a specific distance ("the distance from my house").`);
  }

  // 10. Repeated 'about' ("talk about the project about X")
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

  // 11. Missing 'the' before 'stablecoin market'
  if (/\b(on|about|in)\s+stablecoin\s+market\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(on|about|in)\s+stablecoin\s+market\b/gi, "$1 the stablecoin market");
    isPerfect = false;
    notes.push(`Add "the" before specific market sectors like "the stablecoin market".`);
  }

  // 12. Unnecessary 'the' before general uncountable nouns ("talk about the finance")
  if (/\b(talk|chat|speak|learn|think)\s+about\s+the\s+(finance|economics|crypto|technology|business|life|love|english|grammar)\b/i.test(corrected)) {
    corrected = corrected.replace(
      /\b(talk|chat|speak|learn|think)\s+about\s+the\s+(finance|economics|crypto|technology|business|life|love|english|grammar)\b/gi,
      "$1 about $2"
    );
    isPerfect = false;
    notes.push(`When talking about a general field like "finance" in broad terms, drop "the" ("Can we talk about finance?").`);
  }

  // 13. "in grammar" -> "grammatically"
  if (/\bunnatural\s+in\s+grammar\b/i.test(corrected)) {
    corrected = corrected.replace(/\bunnatural\s+in\s+grammar\b/gi, "grammatically unnatural");
    isPerfect = false;
    notes.push(`Instead of "unnatural in grammar", say "grammatically unnatural" or "unnatural in English".`);
  }

  // 14. "you told me like that" -> "you already said that"
  if (/\btold\s+me\s+like\s+that\b/i.test(corrected)) {
    corrected = corrected.replace(/\btold\s+me\s+like\s+that\b/gi, "said that to me");
    isPerfect = false;
    notes.push(`Use "You already said that before" instead of "told me like that".`);
  }

  // 15. "I wonder how exchange rate won/dollar..."
  if (/i\s+wonder\s+how\s+(the\s+)?exchange\s+rate\s+won\s*\/\s*dollar/i.test(corrected)) {
    corrected = "I'm wondering how the won-to-dollar (USD/KRW) exchange rate is moving this month.";
    isPerfect = false;
    notes.push(
      `An embedded question starting with "I wonder how..." needs an article ("the exchange rate") and a verb ("is moving").`
    );
  }

  // 16. Broad ESL Grammar & Collocation Rules
  const eslPatterns = [
    {
      regex: /\bi am agree\b/gi,
      replace: "I completely agree",
      note: `"Agree" is an action verb, not an adjective—say "I agree" rather than "I am agree".`
    },
    {
      regex: /\bdiscuss about\b/gi,
      replace: "discuss",
      note: `"Discuss" already means "talk about", so it takes a direct object without "about".`
    },
    {
      regex: /\bexplain me\b/gi,
      replace: "explain to me",
      note: `Always use "to" before the person with "explain" ("explain it to me").`
    },
    {
      regex: /\brecommend me\b/gi,
      replace: "recommend to me",
      note: `Use "recommend [something] to me" rather than "recommend me".`
    },
    {
      regex: /\blisten music\b/gi,
      replace: "listen to music",
      note: `Always include "to" after "listen" ("listen to music").`
    },
    {
      regex: /\bgo to (home|downtown|abroad)\b/gi,
      replace: "go $1",
      note: `Adverbs of place like "home", "downtown", and "abroad" don't use "to" after "go" ("go home").`
    },
    {
      regex: /\bhow do you think about\b/gi,
      replace: "what do you think about",
      note: `When asking for someone's opinion in English, say "What do you think about...?" instead of "How do you think about...?".`
    },
    {
      regex: /\bvery (like|love|enjoy|appreciate)\b/gi,
      replace: "really $1",
      note: `"Very" cannot modify verbs directly in English—use "really" before verbs ("really like", "really enjoy").`
    },
    {
      regex: /\balmost (people|students|everyone|users|companies|friends)\b/gi,
      replace: (_, noun) => (noun.toLowerCase() === "everyone" ? "almost everyone" : `most ${noun}`),
      note: `Before a plural noun like "people", use the determiner "most" ("most people") rather than the adverb "almost".`
    },
    {
      regex: /\bmore better\b/gi,
      replace: "much better",
      note: `"Better" is already comparative; strengthen it with "much better" or "way better".`
    },
    {
      regex: /\bsince (\d+|one|two|three|four|five|six|a few|several) (hours?|days?|weeks?|months?|years?)\b/gi,
      replace: "for $1 $2",
      note: `Use "for" with a length of time ("for 3 hours") and "since" only with a specific starting point ("since 2 PM").`
    },
    {
      regex: /\bcan you speak slowly\b/gi,
      replace: "Could you speak a little more slowly, please",
      note: `When asking someone to slow down from their current pace, use the comparative adverb "more slowly" ("Could you speak a little more slowly?").`
    }
  ];

  for (const rule of eslPatterns) {
    if (rule.regex.test(corrected)) {
      corrected = corrected.replace(rule.regex, rule.replace);
      isPerfect = false;
      notes.push(rule.note);
    }
  }

  // Clean up spacing before punctuation (e.g. "slowly ?" -> "slowly?")
  corrected = corrected.replace(/\s+([.!?])/g, "$1");

  // Capitalize first letter
  if (corrected.length > 0 && /^[a-z]/.test(corrected)) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  }
  // Ensure ending punctuation
  if (corrected.length > 0 && !/[.!?]$/.test(corrected)) {
    const isQ = /^(can|could|would|should|will|do|does|did|is|are|was|were|what|why|how|where|when|who)\b/i.test(
      corrected
    );
    corrected += isQ ? "?" : ".";
  }

  // 17. Coaching Tip When User's Original Sentence Has No Hard Grammar Errors
  // Keep `corrected` as the user's exact grammatically-valid sentence (1st item), and explain the nuance of the recommended alternatives below!
  const stripPunct = (s) => s.replace(/[.!?]+$/g, "").trim().toLowerCase();
  if (notes.length === 0) {
    const lowerClean = stripPunct(corrected);

    if (/^i want to talk about (.+)$/i.test(lowerClean)) {
      notes.push(
        `Your sentence "${corrected}" is grammatically correct! In everyday conversation, native speakers also often soften "I want to..." into "I'd like to..." or "Let's chat about..." (see the recommended sentences above).`
      );
    } else if (/^can you speak more slowly$/i.test(lowerClean) || /^could you speak more slowly$/i.test(lowerClean)) {
      notes.push(
        `Your sentence "${corrected}" is grammatically accurate! You can also add "a little" or "Could you..." to make the request sound even softer (see the recommended sentences above).`
      );
    } else if (/^i'm in the library$/i.test(lowerClean) || /^i am in the library$/i.test(lowerClean)) {
      notes.push(
        `"${corrected}" is grammatically correct (it emphasizes being inside the building). Native speakers also frequently say "I'm at the library" when referring to the library as their current activity spot.`
      );
    } else if (/^(hi|hello|hey)( there)?[,.\s]*who are you$/i.test(lowerClean)) {
      notes.push(
        `"${corrected}" is grammatically correct! In social conversation, you can also soften "Who are you?" to "Who am I chatting with today?" or "What's your name?".`
      );
    } else {
      notes.push(
        `Your sentence "${corrected}" is grammatically accurate! Check the recommended expressions above for additional natural ways native speakers express the same idea.`
      );
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

  // 1. Building tool with AGY / impressive
  if (/impressive.*agy|made it with agy|built it with agy/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm really impressed with this tool because I built it myself with AGY." },
      { label: "추천 2 · Fluent & Expressive", sentence: "What makes this tool so impressive to me is that I created it using AGY." }
    ];
  }

  // 2. Spending time / duration ("I'm spending time for this around 3 hours.")
  if (/\b(spend|spending|spent)\s+time\b/i.test(lower) || /\b(\d+|one|two|three|four|five)\s*(hour|hours|minute|minutes)\b/i.test(lower)) {
    const durMatch = lower.match(/\b(\d+|one|two|three|four|five|six|a few)\s*(hour|hours|minute|minutes|day|days)\b/i);
    const dur = durMatch ? `${durMatch[1]} ${durMatch[2]}` : "about 3 hours";
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: `I've spent around ${dur} on this so far.` },
      { label: "추천 2 · Fluent & Expressive", sentence: `I've been working on this for about ${dur} now.` }
    ];
  }

  // 3. Speed / slow down / simpler sentences
  if (/speed.*fast|fast\s+(to|for)\s+me|slow\s+down|more\s+simple\s+sentences|simpler\s+sentences|speak\s+(more\s+)?slow(ly|er)?/i.test(lower)) {
    if (/simple|sentences/i.test(lower)) {
      return [
        { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
        { label: "추천 1 · Casual Native", sentence: "You're speaking a little too fast for me. Could you slow down and use simpler sentences?" },
        { label: "추천 2 · Polite & Natural", sentence: "Would you mind speaking a little more slowly and using shorter, simpler sentences?" }
      ];
    }
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "Could you speak a little more slowly, please?" },
      { label: "추천 2 · Polite & Natural", sentence: "Would you mind slowing down just a bit so I can catch every word?" }
    ];
  }

  // 4. Weather topic ("I want to talk about the weather")
  if (/talk about.*weather|chat about.*weather/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'd like to talk about the weather today." },
      { label: "추천 2 · Fluent & Expressive", sentence: "Let's chat about the weather—how is it outside today?" }
    ];
  }

  // 5. General "I want to talk about [X]" / "Can we talk about [X]"
  const topicMatch = rawOriginal.match(/(?:can we|could we|let's|i want to|i'd like to)\s+(?:talk|chat|speak|discuss)\s+(?:about\s+)?(.+?)[.!?]*$/i);
  if (topicMatch) {
    const topic = topicMatch[1].replace(/^the\s+(finance|economics|crypto|weather)/i, "$1").trim();
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: `I'd like to talk about ${topic} today.` },
      { label: "추천 2 · Fluent & Polite", sentence: `Let's switch gears and chat about ${topic} for a bit.` }
    ];
  }

  // 6. Vibe coding / building an English tool
  if (/vibe coding|make.*tool|build.*tool/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm doing some vibe coding to put together a handy English speaking and writing app." },
      { label: "추천 2 · Fluent & Professional", sentence: "I'm currently building an AI-powered tool designed to improve English speaking and writing." }
    ];
  }

  // 7. Library / location
  if (/\blibrary\b|\blibary\b/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I'm at the library right now getting some reading done." },
      { label: "추천 2 · Fluent & Descriptive", sentence: "I came to the library today so I could read and focus in a quiet space." }
    ];
  }

  // 8. Distance from house / biggest challenge
  if (/distance.*house|biggest\s+chan?llenge/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "Honestly, the hardest part is how far it is from my place." },
      { label: "추천 2 · Fluent & Idiomatic", sentence: "The main drawback is that it's quite a long commute from my house." }
    ];
  }

  // 9. Wedding / emotional struggle / motivation for studying English
  if (/\b(wedding|depressed|embarrassed|frustrated|nervous|couldn't speak|coudn't speak)\b/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "I got really bummed out when I couldn't speak English well at my friend's wedding." },
      { label: "추천 2 · Fluent & Expressive", sentence: "I felt quite discouraged when I struggled to express myself in English at my friend's wedding." }
    ];
  }

  // 10. Who are you / greeting
  if (/who are you|what is your name|what's your name/i.test(lower)) {
    return [
      { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: primaryCorrected },
      { label: "추천 1 · Casual Native", sentence: "Hey there! Who am I chatting with today?" },
      { label: "추천 2 · Polite & Warm", sentence: "Hi! It's great to meet you—could you tell me your name?" }
    ];
  }

  // 11. General fallback for any sentence:
  // Item 1 is strictly `primaryCorrected`, followed by 2 recommended natural alternatives
  const core = primaryCorrected.replace(/[.!?]+$/, "").trim();
  const coreLowerFirst = core.length > 1 ? core.charAt(0).toLowerCase() + core.slice(1) : core.toLowerCase();
  const isQuestion = /\?$/.test(primaryCorrected) || /^(can|could|would|do|does|did|is|are|what|why|how|where|when|who)\b/i.test(core);

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

  const previousAiReplies = (history || [])
    .filter((m) => m.role === "ai" || m.role === "assistant")
    .map((m) => m.text.trim());
  const previousUserMessages = (history || [])
    .filter((m) => m.role === "user")
    .map((m) => m.text.trim());
  const prevUserText = previousUserMessages[previousUserMessages.length - 1] || "";
  const allRecentUserText = previousUserMessages.slice(-4).join(" ").toLowerCase();

  // Helper to pick a response from an array that hasn't been used yet in this session
  const pickFreshReply = (options) => {
    for (const opt of options) {
      if (!previousAiReplies.includes(opt.trim())) {
        return opt;
      }
    }
    return options[previousAiReplies.length % options.length];
  };

  let reply = "";
  let followUpHint = "That makes sense! Let me share a bit more about what I'm doing today.";
  let betterExpressions = [];
  let pronunciationTips = [];
  let keyVocabulary = [];
  let recommendedSpeechRate = null;

  // 0. VOICE SPEED, PACE & SIMPLICITY CONTROL ("Your speed is a little fast to me. Please slow down...", "Can you speak more slowly?")
  if (
    /\b(speak\s+(more\s+)?slow(ly|er)?|slow\s+down|too\s+fast|speed\s+is\s+.*fast|fast\s+(to|for)\s+me|simpler\s+sentences|more\s+simple\s+sentences|short(er)?\s+sentences|easier\s+sentences|speak\s+(more\s+)?fast(er)?|too\s+slow|speed\s+up)\b/i.test(
      lower
    )
  ) {
    const wantsFaster = /\b(speak\s+(more\s+)?fast(er)?|too\s+slow|speed\s+up)\b/i.test(lower);
    if (wantsFaster) {
      recommendedSpeechRate = 1.15;
      reply = pickFreshReply([
        `Got it! I just sped my voice up to 1.15x so we can practice at a brisk native tempo. How does this faster pace feel to you?`,
        `Sure thing! I've switched to a faster 1.15x speaking speed for you. Let's keep the conversation rolling—what should we talk about next?`
      ]);
      followUpHint = "This faster speed sounds great! Let's keep practicing at this pace.";
    } else {
      const askedSlowBefore = /slow|fast/i.test(prevUserText);
      recommendedSpeechRate = askedSlowBefore ? 0.8 : 0.8;
      // Check if we were just talking about a topic like weather or building the tool so we stay on topic gently!
      const wasTalkingAboutWeather = /weather|sunny|rain|cold|warm|hot/i.test(allRecentUserText);
      const topicBridge = wasTalkingAboutWeather
        ? "Earlier you wanted to talk about the weather. How is the weather outside today?"
        : "Is this slower speed comfortable for you now?";

      reply = pickFreshReply([
        `Of course! I just slowed my voice down to 0.8x speed for you. From now on, I will use short, simple sentences. ${topicBridge}`,
        `I am sorry for speaking too fast earlier! I slowed my voice down right now. I will keep my sentences short and easy to follow. ${topicBridge}`,
        `Sure! I am speaking much more slowly for you now. Take your time, and tell me how this speed feels.`
      ]);
      followUpHint = wasTalkingAboutWeather
        ? "Thanks, this speed is much better! Today the weather is really nice and clear."
        : "Thank you, this slower speed and simple phrasing are much easier for me to follow!";
    }

    betterExpressions = [
      { tone: "Polite & Natural", phrase: "Could you speak a little more slowly and use simpler sentences, please?" },
      { tone: "Natural Feedback", phrase: "You're speaking a little too fast for me—could you slow down a bit?" },
      { tone: "Casual Native", phrase: "Mind slowing down just a little so I can catch every word?" }
    ];
    pronunciationTips = [
      { word: "Slowly (ˈsloʊ-li)", tip: "Hold the long 'oh' diphthong (/oʊ/) in 'slow' so the word itself sounds calm and unhurried." },
      { word: "Simpler (ˈsɪm-plər)", tip: "Use the two-syllable comparative 'SIM-pler' instead of saying 'more simple'." }
    ];
    keyVocabulary = [
      { word: "slow down a bit", meaning: "To reduce your speaking or moving speed slightly." },
      { word: "keep it simple", meaning: "To use clear, straightforward words without complicated grammar." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary, recommendedSpeechRate };
  }

  // 1. SELF-INTRODUCTION ("Who are you?", "What's your name?")
  if (/who are you|what is your name|what's your name|introduce yourself|what model|which model/i.test(lower)) {
    reply = modelMeta.selfIntro(partnerName, scenarioTitle);
    followUpHint = `Nice to meet you, ${partnerName}! Right now I'm practicing English so I can speak more naturally.`;
    betterExpressions = [
      { tone: "Warm & Friendly", phrase: `Hi ${partnerName}! It's great to meet you—what will we practice today?` },
      { tone: "Casual Native", phrase: "Hey there! Who am I chatting with today?" },
      { tone: "Professional", phrase: "Hello! Would you mind introducing yourself before we begin?" }
    ];
    pronunciationTips = [
      { word: "Who are you (huː-ər-juː)", tip: "Link 'Who' and 'are' smoothly with a gentle /w/ glide ('hu-war-yoo') and let your pitch fall at the end." },
      { word: "Hi there (haɪ ðer)", tip: "Vibrate your vocal cords lightly on the voiced 'th' (/ð/) in 'there'." }
    ];
    keyVocabulary = [
      { word: "get acquainted", meaning: "To get to know someone or become familiar with them." },
      { word: "dive right in", meaning: "To start doing something enthusiastically without hesitation." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 2. SIMPLE GREETING ("Hi", "Hello")
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|hi there|hello there)[.!?]*$/i.test(lower)) {
    reply = modelMeta.greetingReply(partnerName);
    followUpHint = "My day has been going well! I'm taking some time to practice my English conversation skills.";
    betterExpressions = [
      { tone: "Casual Native", phrase: `Hey ${partnerName}! How's your day going so far?` },
      { tone: "Upbeat", phrase: "Hi there! Great to catch up with you today." },
      { tone: "Professional", phrase: "Good afternoon! Thanks for joining me for today's session." }
    ];
    pronunciationTips = [
      { word: "How's it going (haʊz-ɪt-ˈɡoʊ-ɪŋ)", tip: "Blend 'How is it' into two quick syllables: 'How-zit'." },
      { word: "So far (soʊ fɑːr)", tip: "Put a slight rising-falling emphasis on 'FAR' at the end of the greeting." }
    ];
    keyVocabulary = [
      { word: "catch up", meaning: "To talk with someone about recent news or events." },
      { word: "touch base", meaning: "To briefly make contact or reconnect with someone." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 3. HOW ARE YOU ("How are you?", "How's it going?")
  if (/^(how are you|how's it going|how are things|what's up|how do you do)[.!?]*$/i.test(lower)) {
    reply = modelMeta.howAreYouReply(partnerName);
    followUpHint = "I've been keeping busy with my projects and trying to practice English every day.";
    betterExpressions = [
      { tone: "Natural Reply", phrase: "I'm doing pretty well, thanks! Just staying busy." },
      { tone: "Idiomatic", phrase: "Can't complain! Everything has been going smoothly this week." },
      { tone: "Engaging", phrase: "Doing great! How have things been on your end?" }
    ];
    pronunciationTips = [
      { word: "Pretty well (ˈprɪ-ɾi wel)", tip: "In American English, the 'tt' in 'pretty' becomes a fast flap sound [ɾ], sounding like 'priddy'." },
      { word: "Can't complain (kænt kəm-ˈpleɪn)", tip: "Drop the final 't' in 'can't' to a quick glottal stop before 'complain'." }
    ];
    keyVocabulary = [
      { word: "can't complain", meaning: "Things are going well; there is nothing major to be unhappy about." },
      { word: "keep busy", meaning: "To stay occupied with useful tasks or activities." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 4. USER GIVES FEEDBACK THAT AI SOUNDED AWKWARD OR REPETITIVE
  if (
    /told me (like )?that before|said that before|repeat|same (answer|sentence|thing)|awkward|weird|why do you say the same|not natural/i.test(
      lower
    )
  ) {
    if (/make.*tool|build.*tool|vibe coding|app|agy/i.test(lower) || /vibe coding|tool|agy/i.test(prevUserText)) {
      reply = `Touché—and thank you for calling that out honestly! When you're building an AI English tool, avoiding robotic, repetitive responses is genuinely the hardest engineering challenge. As the creator of this tool, what kind of personality or response style do you want your AI partner to have most?`;
      followUpHint = "I want the AI partner to respond naturally to the exact context, just like a real human tutor.";
    } else {
      reply = `You're completely right—my apologies for sounding repetitive or awkward earlier! Let's drop the stiff templates and talk naturally. Tell me more about what you were just doing or thinking about!`;
      followUpHint = "Thanks! Let's continue talking naturally about my day.";
    }
    betterExpressions = [
      { tone: "Polished Version of Your Sentence", phrase: grammarResult.corrected },
      { tone: "Natural Feedback", phrase: "Your last response sounded a little robotic—let's keep the conversation natural." },
      { tone: "Builder Perspective", phrase: "The hardest part of building an AI tutor is making the dialogue flow naturally." }
    ];
    pronunciationTips = [
      { word: "Awkward (ˈɔːk-wərd)", tip: "Spelled 'a-w-k-w-a-r-d': the first 'w' blends into the 'aw' vowel (/ɔː/), while the second 'w' is clearly pronounced." },
      { word: "Natural (ˈnætʃ-rəl)", tip: "Compress it into two brisk syllables ('NATCH-rul') rather than three." }
    ];
    keyVocabulary = [
      { word: "flow naturally", meaning: "To progress smoothly and effortlessly like a real human conversation." },
      { word: "sound robotic", meaning: "To sound mechanical, repetitive, or unnatural." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 5. BUILDING THIS TOOL WITH AGY / VIBE CODING / IMPRESSIVE TOOL
  if (
    /\b(agy|antigravity|vibe coding|coding|programming|this tool|this app|made it with|built it with|make.*tool|build.*tool|english.*tool|speaking.*tool|writing.*tool|impressive)\b/i.test(
      lower
    )
  ) {
    if (/\b(agy|antigravity|impressive|made it|built it|this tool)\b/i.test(lower)) {
      reply = pickFreshReply([
        `You should be really proud—building your own live English speaking coach with AGY is seriously impressive! What part of building this tool with AGY have you enjoyed the most so far?`,
        `It always feels amazing when a tool you built yourself comes to life, especially with AGY! How long have you been working on this project today?`
      ]);
      followUpHint = "I've spent about three hours on this project today, and seeing the voice and grammar features come together feels great.";
    } else {
      reply = pickFreshReply([
        `Wait, that's awesome—vibe coding your own English speaking and writing tool is such a creative way to build and learn at the same time! What feature are you working on right now—the voice conversation flow, grammar correction, or saving study notes?`,
        `I love that you're building an English learning app yourself! When you're vibe coding a project like this, do you find it more fun to design the UI or tune how the AI coach responds?`
      ]);
      followUpHint = "Right now I'm focusing on making the live voice conversation and grammar feedback feel much more natural.";
    }

    betterExpressions = [
      { tone: "Polished Native Rewrite", phrase: grammarResult.corrected },
      { tone: "Natural Builder Pride", phrase: "I'm really impressed with how this tool turned out because I built it myself with AGY." },
      { tone: "Startup Pitch", phrase: "I've been vibe coding an AI-powered English coach using AGY." }
    ];
    pronunciationTips = [
      { word: "Impressive (ɪm-ˈpres-ɪv)", tip: "Put strong primary stress on the middle syllable 'PRESS' and finish with a voiced /v/." },
      { word: "Built it (bɪlt ɪt)", tip: "Link the final /t/ of 'built' smoothly into 'it' ('bil-tit')." }
    ];
    keyVocabulary = [
      { word: "come to life", meaning: "To start working and feeling real and exciting after you build or design it." },
      { word: "turn out well", meaning: "To produce a good or successful result in the end." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 6. TIME SPENT / DURATION ("I'm spending time for this around 3 hours.", "I worked on it for 2 hours")
  if (
    /\b(spend|spending|spent|took|takes|working on)\b.*\b(\d+|one|two|three|four|five|six|a few|several|couple of)\s*(hour|hours|hr|hrs|minute|minutes|min|day|days|week|weeks)\b/i.test(
      lower
    ) ||
    /\b(around|about|for)\s*(\d+|one|two|three|four|five|six)\s*(hour|hours|minute|minutes)\b/i.test(lower)
  ) {
    const durMatch = lower.match(
      /\b(\d+|one|two|three|four|five|six|a few|several|couple of)\s*(hour|hours|hr|hrs|minute|minutes|day|days|week|weeks)\b/i
    );
    const durationStr = durMatch ? `${durMatch[1]} ${durMatch[2]}` : "a few hours";
    const isAboutTool = /tool|agy|vibe|app|project|code|coding/i.test(allRecentUserText);

    if (isAboutTool) {
      reply = pickFreshReply([
        `Putting together a full interactive AI speaking app in just about ${durationStr} is super fast progress! After focusing on this for ${durationStr}, are you planning to test a few more conversations or take a break soon?`,
        `Spending ${durationStr} building and refining your tool really shows—it's coming together nicely! What's the last feature you want to polish before wrapping up today?`
      ]);
      followUpHint = "I want to make sure the conversation flow and the grammar feedback panel work smoothly before I take a break.";
    } else {
      reply = pickFreshReply([
        `Focusing on something for ${durationStr} straight takes real dedication! Do you feel like time flew by while you were doing it, or are you feeling a bit tired now?`,
        `Wow, ${durationStr} is a solid block of focused time! What are you planning to do next to recharge?`
      ]);
      followUpHint = "Time really flew by while I was focusing, so I'm going to grab some coffee and relax soon.";
    }

    betterExpressions = [
      { tone: "Grammatically Polished", phrase: grammarResult.corrected },
      { tone: "Natural Present Perfect", phrase: `I've been working on this for about ${durationStr} so far.` },
      { tone: "Idiomatic", phrase: `I've put about ${durationStr} into this project today, and time really flew by.` }
    ];
    pronunciationTips = [
      { word: "Hours (ˈaʊ-ərz)", tip: "Remember the 'h' in 'hours' is completely silent—pronounce it just like 'ours' (/ˈaʊərz/)." },
      { word: "I've spent (aɪv spent)", tip: "Blend 'I have' into 'I've' (/aɪv/) to signal the present perfect tense naturally." }
    ];
    keyVocabulary = [
      { word: "spend time on (something)", meaning: "To use time doing or working on a specific activity (always use 'on', not 'for')." },
      { word: "time flies", meaning: "Time passes very quickly when you are absorbed in an activity." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 7. WEATHER & SEASONS ("I want to talk about the weather", "It's sunny/rainy/cold/warm today")
  if (/\b(weather|sunny|rainy|raining|cloudy|windy|snow|snowing|cold|chilly|freezing|hot|warm|humid|breeze|forecast|temperature|season|spring|summer|autumn|fall|winter)\b/i.test(lower)) {
    if (/talk about.*weather|chat about.*weather/i.test(lower)) {
      reply = pickFreshReply([
        `I'd love to talk about the weather! It's such a natural everyday topic. What is the weather like outside where you are today—is it sunny and mild, or a bit chilly?`,
        `Sure, let's chat about the weather! How does it feel outside right now in your neighborhood, and what kind of weather do you personally enjoy the most?`
      ]);
      followUpHint = "Today the weather is pretty clear and comfortable, which makes it great for going for a walk.";
    } else {
      reply = pickFreshReply([
        `The weather really sets the mood for the whole day! On a day with weather like that, do you prefer going outside for some fresh air or staying cozy indoors?`,
        `I totally agree—weather like that makes a big difference in how energizing the day feels! Does the forecast look nice for the rest of this week too?`
      ]);
      followUpHint = "When the weather is nice like this, I love grabbing an iced coffee and taking a walk outside.";
    }

    betterExpressions = [
      { tone: "Polished Native", phrase: grammarResult.corrected },
      { tone: "Casual Weather Opener", phrase: "I'd love to chat about the weather—it's actually really nice out today!" },
      { tone: "Idiomatic", phrase: "The weather is gorgeous today—it's the perfect day to get some fresh air." }
    ];
    pronunciationTips = [
      { word: "Weather (ˈwe-ðər)", tip: "Start with rounded lips for /w/, and use a soft voiced 'th' (/ð/) in the middle." },
      { word: "Temperature (ˈtem-prə-tʃər)", tip: "Native speakers compress 'temperature' into 3 syllables ('TEM-pruh-chur') instead of 4." }
    ];
    keyVocabulary = [
      { word: "mild weather", meaning: "Pleasant weather that is neither too hot nor too cold." },
      { word: "under the weather", meaning: "Feeling slightly sick, tired, or unwell (a classic weather idiom!)." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 8. LOCATION / WHERE THE USER IS ("I'm in the library.", "I'm at a cafe", "I'm at home", "I'm at the office")
  if (/\b(i'm|i am|we're|sitting|studying|working)\s+(in|at)\s+(the|a|my)?\s*(library|cafe|coffee shop|home|office|school|university|gym|park|subway|train|bus)\b/i.test(lower)) {
    const locMatch = lower.match(/\b(library|cafe|coffee shop|home|office|school|university|gym|park|subway|train|bus)\b/i);
    const place = locMatch ? locMatch[1].toLowerCase() : "library";

    if (place === "library") {
      reply = pickFreshReply([
        `Oh nice, a library is such a peaceful place to focus and get things done! Are you there to read something for fun today, or are you working on a specific project or study goal?`,
        `I love the quiet atmosphere of a good library! Do you have a favorite section or corner you always sit in when you go there?`
      ]);
      followUpHint = "I came to the library today because I can read so many great books and focus quietly here.";
    } else if (place === "cafe" || place === "coffee shop") {
      reply = `A coffee shop is the classic spot for getting into a good flow! What are you drinking today, and what are you working on while you're there?`;
      followUpHint = "I ordered an iced Americano and I'm spending an hour practicing my English.";
    } else {
      reply = `Nice! Being at ${place === "home" ? "home" : `the ${place}`} is a great time to squeeze in some English practice. How is your day going there so far, and what are you up to next?`;
      followUpHint = `I'm having a productive day at ${place === "home" ? "home" : `the ${place}`} and practicing English during my break.`;
    }

    betterExpressions = [
      { tone: "Natural Location Phrase", phrase: place === "library" ? "I'm at the library right now getting some reading done." : grammarResult.corrected },
      { tone: "Casual Native", phrase: `I'm hanging out at the ${place} for a couple of hours today.` },
      { tone: "Descriptive", phrase: `I came to the ${place} because it's much easier to concentrate here.` }
    ];
    pronunciationTips = [
      { word: "Library (ˈlaɪ-ˌbrer-i)", tip: "Make sure to pronounce both 'r' sounds clearly: 'LAI-brer-ee' (avoid dropping the first 'r' into 'lai-berry')." },
      { word: "At the (æt ðə)", tip: "Hold the /t/ of 'at' unreleased against your teeth and release directly into 'the'." }
    ];
    keyVocabulary = [
      { word: "peaceful atmosphere", meaning: "A calm, quiet environment that makes it easy to relax or focus." },
      { word: "get some reading done", meaning: "To spend dedicated time reading." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 9. BOOKS / READING / STUDYING ("I can read so many books here.")
  if (/\b(book|books|read|reading|novel|non-fiction|author|library|study|studying)\b/i.test(lower)) {
    reply = pickFreshReply([
      `There's nothing quite like being surrounded by shelves of books you can browse for free! What kind of books do you enjoy reading the most—business and tech, self-improvement, or fiction?`,
      `Being able to pick up any book that catches your eye is the best part of a library! Have you read any book recently that really left an impression on you?`
    ]);
    followUpHint = "I usually enjoy reading books about technology, finance, and self-improvement.";
    betterExpressions = [
      { tone: "Enthusiastic Native", phrase: "The best part is that I can browse and read so many great books here." },
      { tone: "Conversational", phrase: "There's such a huge selection of books to read here." },
      { tone: "Idiomatic", phrase: "I love getting lost in a good book whenever I come here." }
    ];
    pronunciationTips = [
      { word: "Books (bʊks)", tip: "Use the relaxed short /ʊ/ vowel (like in 'good' and 'put'), not the long /uː/ sound of 'food'." },
      { word: "Read (riːd / red)", tip: "Present tense 'read' has a long 'ee' vowel (/riːd/); past tense 'read' sounds just like the color 'red' (/red/)." }
    ];
    keyVocabulary = [
      { word: "gravitate toward", meaning: "To naturally be drawn to or prefer a certain type of thing (e.g., 'I gravitate toward nonfiction books')." },
      { word: "get lost in a book", meaning: "To become so absorbed in reading that you forget about time." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 10. DISTANCE / COMMUTE / ANSWERING "THE BIGGEST CHALLENGE IS..."
  if (/\b(distance|far from|commute|my house|my home|takes .* minutes|takes .* hour|traffic|biggest challenge|hardest part)\b/i.test(lower)) {
    if (/\b(distance|far|house|home|commute|bus|subway|walk|drive)\b/i.test(lower)) {
      reply = pickFreshReply([
        `Ah, that makes total sense—when a place is far from your house, just getting out the door takes extra willpower! How long does it usually take you to get there from home, and do you walk or take transit?`,
        `A long trip from home is definitely a real hurdle! Once you make the trip all the way there, do you usually stay for a few hours to make it worth the commute?`
      ]);
      followUpHint = "It takes about 30 minutes by bus from my house, so I usually stay for at least two hours.";
      betterExpressions = [
        { tone: "Grammatically Polished", phrase: "The biggest challenge is the distance from my house." },
        { tone: "Casual Native", phrase: "Honestly, the only downside is that it's pretty far from my place." },
        { tone: "Idiomatic", phrase: "It's a bit of a trek from my house, so I can't go every day." }
      ];
      pronunciationTips = [
        { word: "Challenge (ˈtʃæl-ɪndʒ)", tip: "Stress the first syllable 'CHAL', and end with a clear /ndʒ/ sound (like in 'orange')." },
        { word: "Distance (ˈdɪs-təns)", tip: "Keep the second syllable unstressed with a quick schwa: 'DIS-tuns'." }
      ];
      keyVocabulary = [
        { word: "a bit of a trek", meaning: "A somewhat long or tiring journey to get somewhere." },
        { word: "worth the commute", meaning: "Good or valuable enough to justify the travel time required to get there." }
      ];
      return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
    }
  }

  // 11. META-GRAMMAR QUESTION ("I used the word 'about' twice. Is it unnatural in grammer?")
  if (
    /used the word .* twice|is it unnatural|is this (natural|correct|right|good)|in gramm?ar|grammatically unnatural|how do i say|is my sentence/i.test(
      lower
    )
  ) {
    if (/about.*twice|twice.*about/i.test(lower) || /\babout\b.*\babout\b/i.test(prevUserText)) {
      reply = `Great ear for English! Yes, using "about" twice in a row—like in "talk about the project about the stablecoin market"—does sound a little clunky to native speakers. A much smoother way to phrase it is "talk about our project on the stablecoin market" or simply "discuss the stablecoin market project." Want to try saying one of those versions out loud?`;
      followUpHint = "Can we talk about our new project on the stablecoin market?";
    } else {
      reply = `That's a great grammar question! ${grammarResult.notes.length > 0 ? grammarResult.notes.join(" ") : `Your sentence is clear, and you can check the multiple native versions in the Grammar & Accuracy panel on the right.`} Would you like to try another sentence with that pattern?`;
      followUpHint = "Thanks for explaining that! Let me try using that grammar rule in another sentence.";
    }
    betterExpressions = [
      { tone: "Natural Rephrase", phrase: "Can we talk about our project on the stablecoin market?" },
      { tone: "Concise Executive", phrase: "Could we discuss the stablecoin market project?" },
      { tone: "Asking About Grammar", phrase: "I noticed I used 'about' twice—does that sound unnatural to a native speaker?" }
    ];
    pronunciationTips = [
      { word: "Grammar (ˈɡræm-ər)", tip: "Spelled with '-ar' at the end, but pronounced with a relaxed schwa /ər/ ('GRAM-er')." },
      { word: "Unnatural (ʌn-ˈnætʃ-rəl)", tip: "Hold the double 'n' slightly between 'un-' and 'natural', and stress 'NAT'." }
    ];
    keyVocabulary = [
      { word: "clunky", meaning: "Awkward, heavy, or not flowing smoothly (often used for phrasing or sentences)." },
      { word: "roll off the tongue", meaning: "To be easy and smooth to say aloud." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 12. EXCHANGE RATES / WON-DOLLAR / CURRENCY ("I wonder how exchange rate won/dollor this month.")
  if (/exchange rate|won\s*\/\s*doll|krw|usd|currency|interest rate|inflation|won.*dollar|dollar.*won/i.test(lower)) {
    reply = `The USD/KRW (won-to-dollar) exchange rate has been a major focus in the markets lately, driven by US Federal Reserve interest rate expectations and global trade flows! Do you think the Korean won will strengthen or weaken against the dollar over the next few weeks?`;
    followUpHint = "I think the won-to-dollar exchange rate might stay volatile until the next central bank interest rate decision.";
    betterExpressions = [
      { tone: "Natural Conversational", phrase: "I'm wondering how the won-to-dollar exchange rate is going to move this month." },
      { tone: "Financial Professional", phrase: "I've been keeping a close eye on USD/KRW exchange rate volatility this month." },
      { tone: "Analytical", phrase: "Where do you see the Korean won heading against the US dollar in the near term?" }
    ];
    pronunciationTips = [
      { word: "Exchange rate (ɪks-ˈtʃeɪndʒ reɪt)", tip: "Stress 'CHANGE' in 'exchange', and clearly pronounce the /dʒ/ sound before 'rate'." },
      { word: "Dollar (ˈdɑː-lər)", tip: "Spelled 'd-o-l-l-a-r', but the second syllable uses a relaxed schwa /ər/ ('DAH-ler'), not 'or'." }
    ];
    keyVocabulary = [
      { word: "exchange rate volatility", meaning: "How rapidly and unpredictably one currency's value fluctuates against another." },
      { word: "strengthen / weaken against", meaning: "When a currency gains or loses value relative to another currency." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 13. STABLECOIN / CRYPTO / DIGITAL ASSETS ("Can we talk about the project about stablecoin market?")
  if (/stablecoin|crypto|blockchain|token|defi|usdt|usdc|digital asset|peg/i.test(lower)) {
    reply = `I'd love to talk about the stablecoin market with you! Stablecoins are transforming cross-border payments and treasury management right now. In your project, are you looking more at global volume trends like USDT and USDC, regulatory frameworks, or local KRW stablecoin adoption?`;
    followUpHint = "In my project, I'm analyzing how regulatory clarity and yield-bearing assets affect the global stablecoin market.";
    betterExpressions = [
      { tone: "Polished & Natural", phrase: "Can we talk about our project on the stablecoin market?" },
      { tone: "Executive Pitch", phrase: "I'd like to discuss our latest research into the global stablecoin market." },
      { tone: "Industry Native", phrase: "Let's dive into how stablecoin adoption is reshaping cross-border payments." }
    ];
    pronunciationTips = [
      { word: "Stablecoin (ˈsteɪ-bəl-kɔɪn)", tip: "Primary stress is on the first syllable 'STAY', with a secondary dip on 'coin' (/kɔɪn/)." },
      { word: "Project (ˈprɑː-dʒekt)", tip: "As a noun, stress the first syllable 'PRAH-jekt' (as a verb, it shifts to 'pruh-JEKT')." }
    ];
    keyVocabulary = [
      { word: "cross-border payments", meaning: "Financial transactions where the payer and recipient are in different countries." },
      { word: "regulatory framework", meaning: "The system of laws and guidelines governing an industry like digital assets." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 14. FINANCE / MARKETS / ECONOMY ("can we talk about the finance?")
  if (/\b(finance|financial|economy|economic|market|stock|invest|investing|banking|asset|portfolio)\b/i.test(lower)) {
    reply = `Finance is a fantastic topic for building advanced English vocabulary! Whether we're talking about FX markets, fintech innovation, or global macro trends, there's plenty to explore. Which part of finance do you follow most closely in your daily life or work?`;
    followUpHint = "I follow foreign exchange rates and fintech trends closely because they impact global business.";
    betterExpressions = [
      { tone: "Natural & Accurate", phrase: "Can we talk about finance and recent market trends?" },
      { tone: "Professional", phrase: "I'd love to discuss what's happening in the financial markets lately." },
      { tone: "Conversational", phrase: "Let's switch topics and chat about personal finance and investing." }
    ];
    pronunciationTips = [
      { word: "Finance (ˈfaɪ-næns / fə-ˈnæns)", tip: "Both 'FAI-nance' (stress on 1st syllable) and 'fuh-NANCE' (stress on 2nd) are natural in American English!" },
      { word: "Financial (fə-ˈnæn-ʃəl)", tip: "In the adjective 'financial', primary stress always falls on the middle syllable 'NAN'." }
    ];
    keyVocabulary = [
      { word: "macroeconomic trends", meaning: "Large-scale economic factors such as inflation, interest rates, and GDP growth." },
      { word: "keep a close eye on", meaning: "To monitor or watch something very carefully." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 15. FOOD, COFFEE, MEALS & RESTAURANTS
  if (/\b(coffee|tea|latte|americano|lunch|dinner|breakfast|meal|eat|eating|ate|hungry|food|restaurant|cook|cooking|delicious)\b/i.test(lower)) {
    reply = pickFreshReply([
      `Talking about food or coffee always puts me in a good mood! What's your go-to meal or coffee order when you want a quick energy boost during the day?`,
      `Ooh, nice! Do you usually prefer cooking at home or trying out good spots around your neighborhood?`
    ]);
    followUpHint = "My go-to order is an iced Americano, and I love trying out cozy local restaurants.";
    betterExpressions = [
      { tone: "Polished Native", phrase: grammarResult.corrected },
      { tone: "Casual Native", phrase: "I'm about to grab a quick bite to eat and a cup of coffee." },
      { tone: "Idiomatic", phrase: "That place is my go-to spot whenever I'm craving something good." }
    ];
    pronunciationTips = [
      { word: "Coffee (ˈkɔː-fi / ˈkɑː-fi)", tip: "Stress the first syllable 'KAW-fee' and keep the final 'ee' crisp." },
      { word: "Restaurant (ˈres-trɑːnt)", tip: "Native speakers compress 'restaurant' into two or three quick syllables: 'RES-tront'." }
    ];
    keyVocabulary = [
      { word: "grab a bite", meaning: "To get something quick and casual to eat." },
      { word: "go-to (spot / order)", meaning: "Your favorite, most reliable choice that you always return to." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 16. TOPIC PROPOSAL ("Can we talk about X?", "Let's talk about X", "I want to talk about X")
  const topicMatch = rawClean.match(
    /(?:can we|could we|let's|i want to|i'd like to|shall we)\s+(?:talk|chat|speak|discuss)\s+(?:about\s+)?(.+?)[.!?]*$/i
  );
  if (topicMatch) {
    const rawTopic = topicMatch[1].replace(/^the\s+/i, "").trim();
    reply = pickFreshReply([
      `Sure, I'd love to talk about ${rawTopic} with you! What's on your mind about ${rawTopic} today?`,
      `Let's do it—${rawTopic} is a great topic to chat about! How has ${rawTopic} been part of your day or week lately?`
    ]);
    followUpHint = `I've been thinking about ${rawTopic} today and wanted to practice talking about it in English.`;
    betterExpressions = [
      { tone: "Polite & Natural", phrase: grammarResult.corrected },
      { tone: "Conversational", phrase: `Could we shift gears and chat about ${rawTopic} for a bit?` },
      { tone: "Friendly", phrase: `I'd love to talk about ${rawTopic} today!` }
    ];
    pronunciationTips = [
      { word: "Talk about (ˈtɔː-kə-baʊt)", tip: "Link the final /k/ of 'talk' directly into the unstressed 'a-' of 'about' ('taw-kuh-bout')." },
      { word: "Shift gears (ʃɪft ɡɪrz)", tip: "Pronounce the 'sh' in 'shift' softly, and emphasize 'GEARS' to signal a topic change." }
    ];
    keyVocabulary = [
      { word: "shift gears", meaning: "To change the topic, approach, or focus of a conversation or activity." },
      { word: "on your mind", meaning: "What you are currently thinking about or interested in." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 17. DIRECT QUESTION FROM USER ("Can you...", "Do you...", "What...", "How...", "Why...")
  if (/\?$/.test(rawClean.trim()) || /^(can|could|would|do|does|did|are|is|what|why|how|where|when)\b/i.test(lower)) {
    reply = pickFreshReply([
      `That's a great question! As ${partnerName}, I'm always happy to adapt our conversation to whatever helps you most. What would make our practice session feel most helpful for you right now?`,
      `Absolutely—I'm right here with you! Tell me how you'd like to take the next step, and we'll do it together.`
    ]);
    followUpHint = "Let's keep practicing with short, natural everyday sentences.";
    betterExpressions = [
      { tone: "Polished Question", phrase: grammarResult.corrected },
      { tone: "Polite Native", phrase: `Quick question—${rawClean.charAt(0).toLowerCase() + rawClean.slice(1).replace(/\?*$/, "?")}` },
      { tone: "Conversational", phrase: `I was wondering if we could try that together.` }
    ];
    pronunciationTips = [
      { word: "Question Intonation", tip: "For Yes/No questions ('Can you...', 'Do you...'), let your voice pitch rise gently on the last stressed word." },
      { word: "Could you (ˈkʊd-ʒuː)", tip: "In natural speech, 'Could you' blends smoothly into 'KUD-joo'." }
    ];
    keyVocabulary = [
      { word: "adapt to", meaning: "To adjust smoothly to someone's needs or preferences." },
      { word: "on the same page", meaning: "Understanding and agreeing on how to proceed together." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 18. EMOTIONAL / PERSONAL STORY ("I depressed by the time when I coudn't speak English well in my friend's wedding.")
  if (
    /\b(wedding|depressed|sad|upset|embarrassed|ashamed|frustrated|nervous|anxious|froze|freeze|couldn't speak|coudn't speak|could not speak|foreigner|foreign guests|party)\b/i.test(
      lower
    )
  ) {
    if (/\bwedding\b/i.test(lower)) {
      reply = pickFreshReply([
        `I can completely understand why that felt discouraging—social gatherings like weddings can be intimidating for anyone speaking a second language! Please don't be too hard on yourself, because turning that moment into motivation to practice takes real courage. Were you trying to make small talk with foreign guests at your table, or did someone ask you a question on the spot?`,
        `Oh, I really feel for you—freezing up in English at a friend's wedding is such a frustrating feeling, and so many language learners have been through that exact moment! The great news is that you're here practicing now so next time will feel completely different. What part of chatting at the wedding felt the hardest for you?`
      ]);
      followUpHint = "Some foreign guests at my table tried to make small talk with me, and my mind just went blank.";
    } else {
      reply = pickFreshReply([
        `I completely understand how frustrating and overwhelming that moment must have felt—please don't beat yourself up over it! Every fluent speaker has had moments where the words just wouldn't come out under pressure. Would you like to practice a few natural icebreakers together so you feel totally ready next time?`,
        `That kind of situation can catch anyone off guard, especially when people are speaking quickly around you! What kind of situation do you most want to feel confident handling in English next time?`
      ]);
      followUpHint = "Yes, I'd love to practice some casual small talk phrases for social events.";
    }

    betterExpressions = [
      { tone: "Casual Native", phrase: "I got really bummed out when I couldn't speak English well at my friend's wedding." },
      { tone: "Natural Everyday", phrase: "I felt so frustrated because I couldn't express myself in English at my friend's wedding." },
      { tone: "Fluent & Expressive", phrase: "Struggling to speak English at my friend's wedding really got me down, which inspired me to start practicing." }
    ];
    pronunciationTips = [
      { word: "Couldn't (/ˈkʊd.ənt/)", tip: "Keep the 'l' completely silent and link the /d/ directly into the nasal /nt/." },
      { word: "Depressed (/dɪ-ˈprest/)", tip: "Put primary stress on the second syllable 'PREST' and finish with a crisp /st/ sound." }
    ];
    keyVocabulary = [
      { word: "bummed out", meaning: "Feeling disappointed, discouraged, or down about an experience." },
      { word: "freeze up", meaning: "To suddenly become unable to speak or act because of nervousness." }
    ];
    return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
  }

  // 19. CLEAN CONVERSATIONAL FALLBACK (When offline)
  const fallbackReplies = [
    `That really makes sense—thank you for sharing that with me! Could you tell me a little more about how that unfolded?`,
    `I can definitely relate to what you're saying! What are your thoughts on what you'd like to do next with that?`,
    `That's a really relatable experience. How did you feel in that moment, and what made the biggest impression on you?`
  ];

  reply = pickFreshReply(fallbackReplies);

  betterExpressions = [
    { tone: "Direct Fix", phrase: grammarResult.corrected },
    { tone: "Casual Native", phrase: grammarResult.correctedVariants?.[1]?.sentence || grammarResult.corrected },
    { tone: "Fluent & Expressive", phrase: grammarResult.correctedVariants?.[2]?.sentence || grammarResult.corrected }
  ];

  pronunciationTips = [
    { word: "Thought Groups & Pausing", tip: "Pause briefly at commas and conjunctions ('when', 'because', 'and') to give your listener time to follow your key point." },
    { word: "Connected Speech Rhythm", tip: "Keep function words (to, at, for, from, the) light and relaxed (/ə/) while stressing main nouns and verbs." }
  ];

  keyVocabulary = [
    { word: "express yourself", meaning: "To communicate your thoughts and feelings clearly in words." },
    { word: "build confidence", meaning: "To gradually feel more sure and comfortable in your abilities." }
  ];

  return { reply, followUpHint, betterExpressions, pronunciationTips, keyVocabulary };
}


function generateLocalDemoCoaching(userText) {
  const cleanText = (userText || "").trim();
  const modelId = getActiveModelString();
  const scenario = SCENARIOS[state.scenario] || SCENARIOS.casual;
  const { voiceDisplayName } = getParsedVoicePersona();
  const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gemini-4-argon"];

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
      fluency: grammarResult.isPerfect ? 92 : 72,
      grammar: grammarResult.isPerfect ? 98 : 65,
      vocabulary: 80,
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
          const tId = setTimeout(() => controller.abort(), 3000);
          result = await callZeroKeyBackendChatAPI(text, controller.signal);
          clearTimeout(tId);
        } catch (proxyErr) {
          try {
            console.info("Directly connecting to Zero-Key Real LLM conversation engine...");
            result = await callZeroKeyClientLLM(text);
          } catch (clientLlmErr) {
            console.warn("Zero-key LLM failover notice, using contextual local engine:", clientLlmErr);
            result = generateLocalDemoCoaching(text);
          }
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
  const rate = customRate || state.speechRate;
  const { voiceProvider, voiceName } = getParsedVoicePersona();

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

  let targetEngine = state.ttsEngine;
  if (targetEngine === "auto-ai") {
    if (voiceProvider === "openai" && hasOpenAIKey()) {
      targetEngine = "openai-tts";
    } else if (voiceProvider === "gemini" && hasGeminiKey()) {
      targetEngine = "gemini-3.8-flash-tts";
    } else {
      targetEngine = "builtin-neural";
    }
  }

  // 1. OpenAI ChatGPT Voice Mode TTS (when user explicitly added an OpenAI API key)
  if (targetEngine === "openai-tts" && hasOpenAIKey()) {
    try {
      const openAiVoice = voiceProvider === "openai" ? voiceName : "coral";
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
          instructions: "Speak naturally, warmly, and conversationally like an engaging native English partner in Live Voice Mode.",
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
      console.warn("OpenAI TTS error, falling back to Built-in Neural TTS:", e);
    }
  }

  // 2. Google Gemini 3.8 Live / Flash TTS (when user explicitly added a Gemini API key)
  if (targetEngine.startsWith("gemini-3.8-") && hasGeminiKey()) {
    try {
      const geminiVoice = voiceProvider === "gemini" ? voiceName : "Kore";
      const ttsResp = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Revision": "2026-05-20",
          "x-goog-api-key": state.apiKey.trim()
        },
        body: JSON.stringify({
          model: targetEngine,
          input: [
            {
              type: "user_input",
              content: [
                {
                  type: "text",
                  text: text,
                  annotations: [
                    {
                      type: "speech_metadata",
                      style: "casual, friendly"
                    }
                  ]
                }
              ]
            }
          ],
          response_format: { type: "audio" },
          generation_config: {
            speech_config: [{ voice: geminiVoice }]
          }
        })
      });

      if (ttsResp.ok) {
        const ttsData = await ttsResp.json();
        let base64Audio = ttsData.output_audio?.data;
        if (!base64Audio && Array.isArray(ttsData.steps)) {
          for (const step of ttsData.steps) {
            if (step.type === "model_output" && Array.isArray(step.content)) {
              const audioPart = step.content.find((c) => c.type === "audio" && c.data);
              if (audioPart) {
                base64Audio = audioPart.data;
                break;
              }
            }
          }
        }
        if (base64Audio) {
          const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
          audio.playbackRate = rate;
          state.activeAudio = audio;
          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.warn("Gemini TTS error, falling back to Built-in Neural TTS:", e);
    }
  }

  // 3. ZERO-API-KEY BUILT-IN NEURAL VOICE SERVER (/api/tts — Pristine Natural Microsoft Neural Voice)
  if (targetEngine !== "browser") {
    try {
      const speakToken = (state.speakToken = (state.speakToken || 0) + 1);
      const cleanText = text.trim();
      const resp = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          voice: state.voicePersona,
          rate
        })
      });
      if (!resp.ok) throw new Error(`TTS HTTP ${resp.status}`);
      if (state.speakToken !== speakToken) return;

      const blob = await resp.blob();
      if (state.speakToken !== speakToken) return;

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = audioUrl;
      state.activeAudio = audio;

      // Ensure the audio frames are pre-buffered so playback starts 100% smoothly without any initial stutter
      await new Promise((resolve) => {
        if (audio.readyState >= 3) {
          resolve();
          return;
        }
        audio.oncanplay = () => resolve();
        audio.onerror = () => resolve();
        setTimeout(resolve, 80);
      });

      if (state.speakToken !== speakToken) return;
      await audio.play();
      return;
    } catch (e) {
      console.warn("Built-in Neural TTS server notice, falling back to multi-voice browser speech:", e);
    }
  }

  // 4. Multi-Persona Browser SpeechSynthesis Fallback (distinct voice/pitch/accent per persona)
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    const personaFallbackProfiles = {
      "gemini:Kore": { lang: "en-US", pitch: 1.08, rateMult: 1.0, genderHint: /zira|aria|jenny|samantha|google us/i },
      "gemini:Puck": { lang: "en-US", pitch: 0.92, rateMult: 1.06, genderHint: /david|mark|guy|andrew|alex/i },
      "gemini:Aoede": { lang: "en-GB", pitch: 1.12, rateMult: 0.98, genderHint: /hazel|sonia|libby|uk english female|serena/i },
      "gemini:Charon": { lang: "en-GB", pitch: 0.82, rateMult: 0.95, genderHint: /george|ryan|uk english male|daniel/i },
      "gemini:Fenrir": { lang: "en-US", pitch: 0.78, rateMult: 1.04, genderHint: /david|guy|mark|james/i },
      "openai:coral": { lang: "en-US", pitch: 1.15, rateMult: 1.03, genderHint: /jenny|aria|zira|samantha/i },
      "openai:nova": { lang: "en-AU", pitch: 1.1, rateMult: 1.04, genderHint: /natasha|catherine|karen|zira/i },
      "openai:alloy": { lang: "en-US", pitch: 1.0, rateMult: 1.0, genderHint: /aria|google us|zira/i },
      "openai:sage": { lang: "en-GB", pitch: 0.86, rateMult: 0.96, genderHint: /george|thomas|ryan|uk english male/i },
      "openai:ash": { lang: "en-US", pitch: 0.9, rateMult: 1.02, genderHint: /mark|david|brian|guy/i },
      "openai:shimmer": { lang: "en-US", pitch: 1.2, rateMult: 0.97, genderHint: /emma|zira|samantha/i }
    };
    const profile = personaFallbackProfiles[state.voicePersona] || personaFallbackProfiles["gemini:Kore"];
    utterance.lang = profile.lang;
    utterance.pitch = profile.pitch;
    utterance.rate = Math.min(1.5, Math.max(0.7, rate * profile.rateMult));

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice =
      voices.find((v) => v.lang === profile.lang && profile.genderHint.test(v.name)) ||
      voices.find((v) => profile.genderHint.test(v.name)) ||
      voices.find((v) => v.lang === profile.lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
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
    const [prov, mod] = dom.quickModelSelect.value.split(":");
    state.provider = prov;
    if (prov === "openai") {
      state.openaiModel = mod;
      localStorage.setItem("speakflow_openai_model", mod);
    } else {
      state.model = mod;
      localStorage.setItem("speakflow_gemini_model", mod);
    }
    if (MODEL_DEFAULT_VOICE_MAP[mod]) {
      state.voicePersona = MODEL_DEFAULT_VOICE_MAP[mod];
      localStorage.setItem("speakflow_voice_persona", state.voicePersona);
    }
    localStorage.setItem("speakflow_ai_provider", prov);
    syncSettingsUI();
    const { voiceDisplayName } = getParsedVoicePersona();
    showToast(`Switched to ${prov === "openai" ? "ChatGPT" : "Gemini"} (${mod}) · Partner: ${voiceDisplayName}`);
    if (state.autoSpeak) {
      speakText(`Hi! I'm ${voiceDisplayName}, your English speaking partner.`);
    }
  });

  // Header Quick Voice Persona Switcher (목소리 직접 선택)
  if (dom.quickVoicePersonaSelect) {
    dom.quickVoicePersonaSelect.addEventListener("change", () => {
      const selectedVoice = dom.quickVoicePersonaSelect.value;
      state.voicePersona = selectedVoice;
      localStorage.setItem("speakflow_voice_persona", selectedVoice);
      if (dom.voicePersonaSelect) {
        dom.voicePersonaSelect.value = selectedVoice;
      }
      syncSettingsUI();
      const { voiceDisplayName } = getParsedVoicePersona();
      showToast(`AI Voice: ${voiceDisplayName}`);
      if (state.autoSpeak) {
        speakText(`Hello! I'm ${voiceDisplayName}. Great to speak with you.`);
      }
    });
  }

  // Header Quick Conversation Mode Switcher (Voice 모드 / Chat 모드)
  if (dom.quickModeSelect) {
    dom.quickModeSelect.addEventListener("change", () => {
      const mode = dom.quickModeSelect.value;
      state.conversationMode = mode;
      state.autoSpeak = (mode === "voice");
      localStorage.setItem("speakflow_conversation_mode", mode);
      localStorage.setItem("speakflow_auto_speak", String(state.autoSpeak));
      syncSettingsUI();
      if (mode === "voice") {
        showToast("Voice Mode: AI answers with native audio.");
        const { voiceDisplayName } = getParsedVoicePersona();
        speakText(`Voice mode on. I'm ready to speak with you!`);
      } else {
        // Stop any currently playing audio so it turns completely silent immediately
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
        showToast("Chat Mode: Silent text messenger mode.");
      }
    });
  }

  // Header Quick Conversation Level Switcher (Basic / Intermediate / Advanced)
  if (dom.quickLevelSelect) {
    dom.quickLevelSelect.addEventListener("change", () => {
      state.learnerLevel = normalizeLearnerLevel(dom.quickLevelSelect.value);
      localStorage.setItem("speakflow_learner_level", state.learnerLevel);
      syncSettingsUI();
      const levelCfg = LEVEL_PROFILES_CLIENT[state.learnerLevel] || LEVEL_PROFILES_CLIENT.intermediate;
      showToast(`Level set: ${levelCfg.label}`);
      if (state.currentMessages.length <= 1) {
        loadScenario(state.scenario);
      }
    });
  }

  // 🔴 Live Voice Mode Overlay Events
  if (dom.startLiveOrbBtn) {
    dom.startLiveOrbBtn.addEventListener("click", openLiveVoiceOverlay);
  }
  if (dom.closeLiveOrbBtn) {
    dom.closeLiveOrbBtn.addEventListener("click", closeLiveVoiceOverlay);
  }
  if (dom.endLiveCallBtn) {
    dom.endLiveCallBtn.addEventListener("click", closeLiveVoiceOverlay);
  }
  if (dom.toggleLiveStreamBtn) {
    dom.toggleLiveStreamBtn.addEventListener("click", toggleLiveVoiceSession);
  }

  dom.saveSessionBtn.addEventListener("click", () => {
    saveCurrentSessionToArchive(true);
  });

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

  dom.resetChatBtn.addEventListener("click", () => {
    loadScenario(state.scenario);
  });

  // ==================== HISTORY & REVIEW NOTEBOOK EVENTS ====================
  dom.openHistoryBtn.addEventListener("click", () => {
    renderHistoryModalContent();
    dom.historyModal.classList.remove("hidden");
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
