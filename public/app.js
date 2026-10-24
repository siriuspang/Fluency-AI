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

function normalizeVoicePersona(v) {
  if (!v) return "gemini:Kore";
  if (v.includes(":")) return v;
  const lower = v.toLowerCase();
  if (["coral", "ash", "sage", "nova", "alloy", "shimmer"].includes(lower)) {
    return `openai:${lower}`;
  }
  const cap = lower.charAt(0).toUpperCase() + lower.slice(1);
  return `gemini:${cap}`;
}

function getParsedVoicePersona() {
  const norm = normalizeVoicePersona(state.voicePersona);
  const parts = norm.split(":");
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
    const isMobile = window.innerWidth <= 768;
    dom.userInput.placeholder = isMobile
      ? "Type in English..."
      : (state.conversationMode === "voice" || state.autoSpeak)
      ? "Type in English (or press Speak to talk)..."
      : "Type in English (Chat Mode · Silent)...";
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
      dom.lastUserUtterance.textContent = `"Speak or type in English to see real-time grammar feedback and native upgrades."`;
    }
    if (dom.userSentenceStatus) {
      dom.userSentenceStatus.textContent = "Ready";
      dom.userSentenceStatus.className = "user-sentence-status";
    }
    if (dom.grammarExplanation) {
      dom.grammarExplanation.classList.add("hidden");
    }
  } else {
    const diff = computeWordDiff(rawUserUtterance, primarySentence);
    if (dom.lastUserUtterance) {
      dom.lastUserUtterance.innerHTML = `"${diff.origHtml}"`;
    }
    if (dom.userSentenceStatus) {
      const isTrulyPerfect = (coaching.isPerfect === true) && !diff.hasErrors;
      if (isTrulyPerfect) {
        dom.userSentenceStatus.textContent = "✅ Perfect Grammar";
        dom.userSentenceStatus.className = "user-sentence-status perfect";
      } else {
        dom.userSentenceStatus.textContent = "⚠️ Issues Highlighted";
        dom.userSentenceStatus.className = "user-sentence-status has-error";
      }
    }
    if (dom.grammarExplanation) {
      if (coaching.grammarExplanation) {
        dom.grammarExplanation.classList.remove("hidden");
        dom.grammarExplanation.textContent = coaching.grammarExplanation;
      } else {
        dom.grammarExplanation.classList.add("hidden");
      }
    }
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
function generateLocalDemoCoaching(userText) {
  const clean = userText.trim();
  const lower = clean.toLowerCase();
  const words = clean.split(/\s+/).filter(Boolean);
  const wordLen = words.length;
  const sc = state.scenario;
  const activeModel = getActiveModelString();
  const isOpenAI = state.provider === "openai";
  const { voiceDisplayName } = getParsedVoicePersona();

  // Persona definitions per scenario — name always matches the active voice persona (Kore, Coral, Puck, etc.)!
  const personas = {
    casual: {
      name: voiceDisplayName,
      role: "your friendly native English coffee-chat partner",
      intro: `I'm ${voiceDisplayName}, your English conversation partner here on SpeakFlow AI! We're just hanging out over a virtual cup of coffee so you can practice natural, everyday English.`
    },
    interview: {
      name: voiceDisplayName,
      role: "a Senior Hiring Manager & Interview Coach",
      intro: `I'm ${voiceDisplayName}, your mock interviewer and career coach today. My goal is to help you practice behavioral and situational interview questions using the STAR method.`
    },
    business: {
      name: voiceDisplayName,
      role: "VP of Product in our strategy meeting",
      intro: `I'm ${voiceDisplayName}, VP of Product. In this scenario, we're in an executive sync practicing project updates, stakeholder alignment, and negotiation in business English.`
    },
    travel: {
      name: voiceDisplayName,
      role: "Head Concierge at The Grand Horizon Hotel",
      intro: `I'm ${voiceDisplayName}, the head concierge at The Grand Horizon Hotel! I'm here to help you practice real-world travel English—from hotel check-ins to local dining recommendations.`
    },
    shadowing: {
      name: voiceDisplayName,
      role: "your English Phonetics, Rhythm & Intonation Coach",
      intro: `I'm ${voiceDisplayName}, your pronunciation and shadowing specialist! I help you master American and British connected speech, word stress, and natural intonation.`
    }
  };

  const persona = personas[sc] || personas.casual;

  // Model-specific style signature so each model responds distinctly
  const modelStyles = {
    "gemini-4-argon": {
      tag: "Gemini 4 Argon",
      greeting: "Hi there! Wonderful to meet you.",
      thoughtfulOpener: "That's an interesting point!",
      closerCasual: "What would you love to talk about today—your hobbies, work, or something fun you did recently?",
      closerAction: "How would you like to dive in?"
    },
    "gemini-3.8-flash": {
      tag: "Gemini 3.8 Flash",
      greeting: "Hey there! Great to connect with you.",
      thoughtfulOpener: "Good point!",
      closerCasual: "Tell me a bit about yourself—how is your day going so far?",
      closerAction: "What's on your mind right now?"
    },
    "gemini-3.5-flash-lite": {
      tag: "Gemini 3.5 Flash-Lite",
      greeting: "Hello! Lovely to meet you.",
      thoughtfulOpener: "That makes sense!",
      closerCasual: "What topic do you feel like practicing today?",
      closerAction: "Ready for our next question?"
    },
    "gpt-4o": {
      tag: "ChatGPT (GPT-4o)",
      greeting: "Hi there! It's so nice to meet you.",
      thoughtfulOpener: "That's a thoughtful question!",
      closerCasual: "I'd love to hear a little about you—what inspired you to practice English speaking today?",
      closerAction: "Shall we jump right into the scenario, or warm up with some small talk first?"
    },
    "gpt-4o-mini": {
      tag: "ChatGPT (GPT-4o Mini)",
      greeting: "Hey! Glad to chat with you today.",
      thoughtfulOpener: "Good question!",
      closerCasual: "How's everything going with you today?",
      closerAction: "What would you like to try first?"
    },
    "o3-mini": {
      tag: "ChatGPT (o3-mini)",
      greeting: "Hello! Welcome to our speaking session.",
      thoughtfulOpener: "Certainly, let's explore that.",
      closerCasual: "To tailor our conversation, what specific speaking skill—fluency, idioms, or grammar—are you focusing on today?",
      closerAction: "How would you like to structure our practice session?"
    }
  };

  const mStyle = modelStyles[activeModel] || modelStyles["gemini-4-argon"];

  // 1. Contextual Reply Generation based on what the user ACTUALLY said!
  let reply = "";
  let followUpHint = "";

  if (
    /who are you|what is your name|what's your name|introduce yourself|what are you/i.test(lower)
  ) {
    // User asked "Who are you?" / "What's your name?"
    reply = `Hi there! I'm ${persona.name}, ${persona.role}. ${persona.intro} ${mStyle.closerCasual}`;
    followUpHint = `Nice to meet you, ${persona.name}! I'm practicing English so I can speak more naturally in real conversations.`;
  } else if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)[.!?]*$/i.test(clean) || (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/i.test(lower) && wordLen <= 5)) {
    // Simple greeting
    reply = `${mStyle.greeting} I'm ${persona.name}, ${persona.role}. ${mStyle.closerCasual}`;
    followUpHint = "Hi! My day has been going pretty well so far. I'm excited to practice speaking English with you.";
  } else if (/how are you|how's it going|how are things|what's up/i.test(lower)) {
    // User asked how the AI is doing
    reply = `I'm doing great, thanks for asking! I'm always energized for a good conversation. How about you—how has your day been treating you?`;
    followUpHint = "My day has been pretty productive, and now I'm taking a break to practice my English.";
  } else if (/help|how do we|what should i say|don't know/i.test(lower)) {
    // User asked for help or guidance
    reply = `No worries at all—that's what I'm here for! Since I'm ${persona.name}, you can just talk to me naturally. Try telling me one thing you did today or one goal you have this month, and I'll coach your phrasing as we go!`;
    followUpHint = "One of my main goals this month is to feel more comfortable speaking English at work.";
  } else if (/\b(market|grocery|supermarket|store|shop)\b/i.test(lower) && /\b(apple|apples|fruit|vegetable|vegetables|food|buy|bought|buyed|milk|bread|groceries|fresh|cook)\b/i.test(lower)) {
    reply = `Fresh fruit from the market is the best! Did you pick up sweet red apples, or were you in the mood for something tart like green apples?`;
    followUpHint = "I picked up two sweet red apples because they looked really fresh.";
  } else if (/work|job|office|project|busy|meeting|company/i.test(lower)) {
    // User talked about work/projects
    if (isOpenAI) {
      reply = `Balancing work and language practice takes real dedication! What kind of projects are keeping you busiest at work lately?`;
    } else {
      reply = `Sounds like you've got quite a lot on your plate with work! What's the most interesting—or most demanding—part of what you're working on this week?`;
    }
    followUpHint = "Lately I've been collaborating with my team on a new project, which requires a lot of planning.";
  } else if (/travel|trip|flight|hotel|vacation|visit|country/i.test(lower)) {
    // User talked about travel
    reply = `Travel is one of the best reasons to practice English! Where is the next place on your bucket list, or what's your favorite trip you've ever taken?`;
    followUpHint = "I'd really love to visit London or New York next year and explore the local neighborhoods.";
  } else if (/hobby|weekend|movie|music|book|sport|coffee|food|cook/i.test(lower)) {
    // User talked about hobbies / lifestyle
    reply = `That sounds like a great way to unwind! When you have a free weekend with nothing on your schedule, how do you usually like to spend your time?`;
    followUpHint = "On weekends, I usually enjoy grabbing coffee with friends and catching up on my favorite shows.";
  } else if (clean.endsWith("?")) {
    // User asked another open question
    reply = `${mStyle.thoughtfulOpener} I'd say the best approach is to keep things practical and conversational. What made you curious about that, and how do you usually handle it yourself?`;
    followUpHint = "I asked because I often wonder how native speakers express that naturally.";
  } else {
    // General conversational response tailored by scenario AND model + turn number
    const turnVariant = (state.turnCount + activeModel.length) % 3;
    const dynamicScenarioReplies = {
      casual: [
        `I really like how you put that! When you practice English like this, what topics do you feel most comfortable talking about?`,
        `That makes a lot of sense! By the way, if you could spend this coming weekend doing anything at all, what would your ideal plan look like?`,
        `Totally with you on that! What's something new you've learned or tried recently that you really enjoyed?`
      ],
      interview: [
        `Thank you for sharing that context. How did you measure the success of that effort, and what was the biggest takeaway for you?`,
        `That's a strong example! When you have to collaborate with teammates who have different priorities, how do you usually build alignment?`,
        `I appreciate that clear breakdown. Looking ahead to the next step in your career, what kind of impact do you hope to make in your first 90 days?`
      ],
      business: [
        `Got it—that gives me a clear picture of where things stand. What's the single biggest risk to our timeline right now?`,
        `Thanks for the update. If we need to prioritize just two deliverables for Friday's stakeholder review, which ones should we lock in first?`,
        `Makes sense. Let's make sure the cross-functional team is aligned—what support do you need from leadership this week?`
      ],
      travel: [
        `Wonderful! Here at The Grand Horizon, we can certainly arrange that for you right away. Will you be dining with us this evening, or would you like a local restaurant recommendation?`,
        `Everything is set for you! While you're in town, are you more interested in historic sights, local cafes, or shopping districts?`,
        `It's our pleasure to help! Please let me know if you need transportation arranged or extra amenities sent up to your room.`
      ],
      shadowing: [
        `Nice rhythm on "${clean.slice(0, 45)}"! Notice how linking the consonants into the following vowels makes your speech flow smoothly. Want to try another phrase at 1.0x speed?`,
        `Great articulation! Try putting slightly stronger pitch emphasis on the main action verb. Try saying: "I'd love to get together sometime next week."`,
        `You're getting the hang of English stress-timing! Let's try one more natural expression: "Could you let me know as soon as you find out?"`
      ]
    };
    const pool = dynamicScenarioReplies[sc] || dynamicScenarioReplies.casual;
    reply = pool[turnVariant];
    followUpHint =
      sc === "interview"
        ? "We measured success by tracking user engagement, which increased by 25% over two months."
        : sc === "business"
        ? "Our top priority is finalizing the core user flow before Friday's demo."
        : "I enjoy talking about technology, travel, and everyday life experiences.";
  }

  // 2. Real Grammar & Naturalness Analysis of the user's actual sentence (Sequential Multi-Error Correction)
  let corrected = clean;
  let isPerfect = true;
  const notes = [];

  const clientGrammarRules = [
    // Preposition & Idiomatic Collocations
    { regex: /\bby\s+walk\b/gi, replace: "on foot", note: "Use 'on foot' or 'walk' instead of 'by walk'." },
    { regex: /\bevery\s+days\b/gi, replace: "every day", note: "'Every day' takes the singular form 'day'." },
    { regex: /\blook\s+forward\s+to\s+(see|meet|hear|talk)\b/gi, replace: (_, v) => `look forward to ${v}ing`, note: "'Look forward to' is followed by a gerund (-ing)." },
    { regex: /\bmarry\s+with\b/gi, replace: "marry", note: "'Marry' takes a direct object without 'with'." },
    { regex: /\bgraduate\s+(high school|college|university)\b/gi, replace: "graduate from $1", note: "Use 'graduate from' when naming an institution." },
    { regex: /\barrive\s+to\b/gi, replace: "arrive at", note: "Use 'arrive at' instead of 'arrive to'." },
    { regex: /\binterested\s+(?:for|about)\b/gi, replace: "interested in", note: "Use 'interested in'." },
    { regex: /\bin\s+the\s+weekend\b/gi, replace: "on the weekend", note: "Use 'on the weekend'." },
    { regex: /\b(on|in)\s+yesterday\b/gi, replace: "yesterday", note: "Drop 'on/in' before 'yesterday'." },
    { regex: /\b(on|in)\s+tomorrow\b/gi, replace: "tomorrow", note: "Drop 'on/in' before 'tomorrow'." },
    { regex: /\bdiscuss\s+about\b/gi, replace: "discuss", note: "'Discuss' already means 'talk about' (drop 'about')." },
    { regex: /\blisten\s+music\b/gi, replace: "listen to music", note: "Always say 'listen to music'." },
    { regex: /\bexplain\s+me\b/gi, replace: "explain to me", note: "Say 'explain to me'." },
    { regex: /\brecommend\s+me\b/gi, replace: "recommend to me", note: "Say 'recommend to me'." },
    { regex: /\bgo\s+to\s+(home|downtown|abroad)\b/gi, replace: "go $1", note: "Drop 'to' before 'home/downtown/abroad'." },

    // Subject-Verb Agreement
    { regex: /\bi\s+am\s+agree\b/gi, replace: "I completely agree", note: "'Agree' is an action verb: say 'I agree' rather than 'I am agree'." },
    { regex: /\b(he|she|it|this|that|someone|everyone|everybody|nobody)\s+don'?t\b/gi, replace: "$1 doesn't", note: "Third-person singular takes 'doesn't'." },
    { regex: /\b(he|she|it|this|that|someone|everyone|everybody|nobody)\s+have\b/gi, replace: "$1 has", note: "Third-person singular takes 'has'." },
    { regex: /\b(he|she|it|this|that)\s+go\b/gi, replace: "$1 goes", note: "Third-person singular takes 'goes'." },
    { regex: /\b(he|she|it|this|that)\s+like\b/gi, replace: "$1 likes", note: "Third-person singular takes 'likes'." },
    { regex: /\b(he|she|it|this|that)\s+want\b/gi, replace: "$1 wants", note: "Third-person singular takes 'wants'." },
    { regex: /\b(he|she|it|this|that)\s+need\b/gi, replace: "$1 needs", note: "Third-person singular takes 'needs'." },
    { regex: /\b(they|we|you)\s+was\b/gi, replace: "$1 were", note: "Plural subjects take 'were'." },
    { regex: /\bpeople\s+(?:is|was)\b/gi, replace: (m) => (m.toLowerCase().includes("was") ? "people were" : "people are"), note: "'People' takes 'are' or 'were'." },

    // Plurals & Quantifiers
    { regex: /\b(two|three|four|five|several|many|a couple of|\d+)\s+apple\b/gi, replace: "$1 apples", note: "Plural quantifier requires 'apples'." },
    { regex: /\b(two|three|four|five|several|many|a couple of|\d+)\s+shoe\b/gi, replace: "$1 shoes", note: "Plural count requires 'shoes'." },
    { regex: /\b(two|three|four|five|several|many|a couple of|\d+)\s+(car|book|dog|cat|friend|year|day|month)\b/gi, replace: "$1 $2s", note: "Plural count requires a plural noun." },
    { regex: /\b(two|three|four|five|several|many|a couple of|\d+)\s+person\b/gi, replace: "$1 people", note: "Use 'people' for plural of 'person'." },
    { regex: /\bone\s+of\s+my\s+(friend|colleague|coworker|student|teacher|family)\b/gi, replace: "one of my $1s", note: "'One of my...' requires a plural noun (e.g. 'one of my friends')." },
    { regex: /\b(informations|an\s+information)\b/gi, replace: "information", note: "'Information' is uncountable." },
    { regex: /\b(advices|an\s+advice)\b/gi, replace: "advice", note: "'Advice' is uncountable." },

    // Irregular Past Tense
    { regex: /\bbuyed\b/gi, replace: "bought", note: "'Buy' past tense is 'bought'." },
    { regex: /\beated\b/gi, replace: "ate", note: "'Eat' past tense is 'ate'." },
    { regex: /\bgoed\b/gi, replace: "went", note: "'Go' past tense is 'went'." },
    { regex: /\bsleeped\b/gi, replace: "slept", note: "'Sleep' past tense is 'slept'." },
    { regex: /\bdrinked\b/gi, replace: "drank", note: "'Drink' past tense is 'drank'." },
    { regex: /\bfeeled\b/gi, replace: "felt", note: "'Feel' past tense is 'felt'." },
    { regex: /\bteached\b/gi, replace: "taught", note: "'Teach' past tense is 'taught'." },
    { regex: /\bcatched\b/gi, replace: "caught", note: "'Catch' past tense is 'caught'." },
    { regex: /\btaked\b/gi, replace: "took", note: "'Take' past tense is 'took'." },
    { regex: /\bmaked\b/gi, replace: "made", note: "'Make' past tense is 'made'." },
    { regex: /\b(yesterday|last\s+(?:night|week|month|year))\s+(?:i\s+)?go\b/gi, replace: "$1 I went", note: "In past context, use 'went'." },
    { regex: /\b(yesterday|last\s+(?:night|week|month|year))\s+(?:i\s+)?meet\b/gi, replace: "$1 I met", note: "In past context, use 'met'." },

    // Missing Be-verbs & Linking verbs
    { regex: /\bit\s+very\s+(important|good|bad|nice|cold|hot|hard|difficult|easy|secret|cheap|expensive)\b/gi, replace: "it is very $1", note: "Add the linking verb 'is' before adjectives." },
    { regex: /\b(he|she)\s+very\s+(kind|nice|smart|pretty|busy|tired)\b/gi, replace: "$1 is very $2", note: "Add the linking verb 'is' before adjectives." },
    { regex: /\bi\s+very\s+(happy|sad|tired|busy|excited|glad)\b/gi, replace: "I am very $1", note: "Say 'I am very...'." },

    // Comparisons & Question Forms
    { regex: /\bmore\s+(better|easier|faster|cheaper|bigger|slower)\b/gi, replace: "much $1", note: "Double comparatives are incorrect: use 'much $1'." },
    { regex: /\bwho\s+you\s+are\b/gi, replace: "who are you", note: "In direct questions, invert subject and verb: 'Who are you?'." },
    { regex: /\bwhat\s+you\s+mean\b/gi, replace: "what do you mean", note: "In questions, use auxiliary 'do': 'What do you mean?'." }
  ];

  for (const rule of clientGrammarRules) {
    if (rule.regex.test(corrected)) {
      corrected = corrected.replace(rule.regex, rule.replace);
      isPerfect = false;
      notes.push(rule.note);
    }
  }

  // Capitalize first letter & ensure terminal punctuation
  if (corrected.length > 0 && /^[a-z]/.test(corrected)) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  }
  if (corrected.length > 0 && !/[.!?]$/.test(corrected)) {
    const isQ = /^(can|could|would|should|will|do|does|did|is|are|was|were|what|why|how|where|when|who)\b/i.test(corrected);
    corrected += isQ ? "?" : ".";
  }

  // Double check if text changed
  if (corrected.toLowerCase().replace(/[^\w\s]/g, "") !== clean.toLowerCase().replace(/[^\w\s]/g, "")) {
    isPerfect = false;
  }

  let explanation = isPerfect
    ? `Your sentence "${clean}" is grammatically accurate and natural!`
    : notes.join(" ");

  // 3. Contextual Better Expressions based on what the user actually said
  let expressions = [];
  if (/who are you|what is your name|introduce/i.test(lower)) {
    expressions = [
      { tone: "Warm & Polite", phrase: "Hi there! It's great to meet you—could you tell me a little about yourself?" },
      { tone: "Casual Native", phrase: "Hey! Before we dive in, who am I chatting with today?" },
      { tone: "Professional", phrase: "Hello! I'd love to hear a quick introduction about your role." }
    ];
  } else if (/^(hi|hello|hey)\b/i.test(lower)) {
    expressions = [
      { tone: "Casual Native", phrase: "Hey there! How's your day going so far?" },
      { tone: "Friendly & Upbeat", phrase: "Hi! Great to catch up with you today." },
      { tone: "Professional", phrase: "Hello! Thanks for taking the time to chat with me today." }
    ];
  } else {
    expressions = [
      {
        tone: isOpenAI ? "ChatGPT Natural" : "Gemini Natural",
        phrase: corrected.endsWith("?") ? corrected : `${corrected.replace(/\.$/, "")}, which has been a great experience so far.`
      },
      {
        tone: "Conversational Native",
        phrase: `To be honest, ${clean.charAt(0).toLowerCase() + clean.slice(1).replace(/\.$/, "")}—what do you think?`
      },
      {
        tone: "Polished & Fluent",
        phrase: `From my perspective, ${clean.charAt(0).toLowerCase() + clean.slice(1)}`
      }
    ];
  }

  // 4. Contextual Pronunciation Tips based on user's words
  const pronTips = [];
  if (/who are you/i.test(lower)) {
    pronTips.push(
      { word: "Who are you (huː-ər-juː)", tip: "Link 'Who' and 'are' with a subtle /w/ glide ('hu-war-yoo'), placing the main pitch peak on 'WHO' or 'YOU'." },
      { word: "Hi there (haɪ ðer)", tip: "Make sure the 'th' in 'there' is voiced (/ð/) by vibrating your vocal cords lightly." }
    );
  } else {
    const longestWord = [...words].sort((a, b) => b.length - a.length)[0]?.replace(/[^a-zA-Z]/g, "") || "conversation";
    pronTips.push(
      { word: `"${longestWord}" — Primary Stress`, tip: `Give clear length and higher pitch to the stressed syllable in "${longestWord}", while keeping unstressed vowels relaxed (/ə/).` },
      { word: "Sentence Intonation", tip: clean.endsWith("?") ? "For Wh-questions (Who/What/Where/Why), let your pitch fall slightly at the end; for Yes/No questions, let it rise." : "Link the final consonant of each word smoothly into the next word's vowel." }
    );
  }

  const vocabItems = [
    { word: "break the ice", meaning: "To start a conversation in a friendly way that relaxes everyone." },
    { word: "get the hang of", meaning: "To learn how to do something naturally through practice." }
  ];

  // Realistic scoring reflecting user request: 35~98 scale based on actual grammar errors
  let grammar = 94;
  let fluency = Math.min(96, Math.max(45, 55 + Math.min(wordLen * 4, 38)));
  let vocabulary = Math.min(95, Math.max(40, 50 + Math.min(wordLen * 3, 40)));
  const cefr = isPerfect ? (wordLen > 14 ? "C1" : wordLen > 6 ? "B2" : "B1") : (wordLen > 8 ? "B1" : "A2");

  if (!isPerfect) {
    const origWords = clean.split(/\s+/).filter(Boolean);
    const fixedWords = corrected.split(/\s+/).filter(Boolean);
    let diffs = 0;
    origWords.forEach((w, i) => {
      if (!fixedWords[i] || w.toLowerCase() !== fixedWords[i].toLowerCase()) diffs++;
    });
    diffs += Math.abs(fixedWords.length - origWords.length);

    if (diffs <= 1) {
      grammar = 74;
      fluency = Math.max(58, fluency - 10);
    } else if (diffs === 2) {
      grammar = 60;
      fluency = Math.max(48, fluency - 18);
      vocabulary = Math.max(45, vocabulary - 12);
    } else {
      grammar = Math.max(35, 50 - (diffs - 3) * 6);
      fluency = Math.max(40, fluency - 25);
      vocabulary = Math.max(35, vocabulary - 20);
    }
  } else if (wordLen < 3) {
    grammar = 72;
    fluency = 50;
    vocabulary = 45;
  }

  return {
    reply,
    follow_up_hint: followUpHint,
    is_grammar_perfect: isPerfect,
    corrected_sentence: corrected,
    grammar_explanation: explanation,
    better_expressions: expressions,
    pronunciation_tips: pronTips,
    key_vocabulary: vocabItems,
    scores: {
      fluency,
      grammar,
      vocabulary,
      cefr_level: cefr
    }
  };
}

// ==================== 2B. ZERO-API-KEY BUILT-IN LIVE AI BACKEND (/api/chat) ====================
async function callZeroKeyBackendChatAPI(userMessage) {
  const scenario = SCENARIOS[state.scenario] || SCENARIOS.casual;
  const activeModel = getActiveModelString();
  const { voiceDisplayName } = getParsedVoicePersona();
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

function calculateRealisticScores(userMessage, isPerfect, correctedSentence, levelKey) {
  const origWords = (userMessage || "").trim().split(/\s+/).filter(Boolean);
  const fixedWords = (correctedSentence || userMessage || "").trim().split(/\s+/).filter(Boolean);
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

  // 1. Grammar Score (35 ~ 98) - Realistic evaluation matching errors
  let grammar = 95;
  if (!isPerfect) {
    if (diffCount === 1) {
      grammar = 74; // Minor typo or article mistake
    } else if (diffCount === 2) {
      grammar = 62; // 2 grammatical errors
    } else if (diffCount >= 3) {
      grammar = Math.max(35, 52 - (diffCount - 3) * 6); // Severe grammar break
    } else {
      grammar = 68;
    }
  } else {
    grammar = Math.min(98, 92 + Math.min(wordLen, 5));
  }

  // 2. Fluency Score (40 ~ 98)
  let fluency = 70;
  if (wordLen <= 2) {
    fluency = 48;
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

/**
 * Direct client-side Zero-Key LLM fallback (runs on Cloudflare Pages / mobile where /api/chat is not hosted)
 * Powers full conversational AI responses without any backend Node server or API key!
 */
async function callZeroKeyClientLLM(userMessage) {
  const scenario = SCENARIOS[state.scenario] || SCENARIOS.casual;
  const { voiceDisplayName } = getParsedVoicePersona();
  const activeModel = getActiveModelString();
  const clientModelStyles = {
    "gemini-4-argon": "MODEL IDENTITY: Google Gemini 4 Argon. Your conversational style is thoughtful, warm, intellectually curious, and expressive. You share relatable thoughts, use vivid natural metaphors, and ask insightful questions that encourage the speaker to elaborate.",
    "gemini-3.8-flash": "MODEL IDENTITY: Google Gemini 3.8 Flash. Your conversational style is energetic, lively, quick, and snappy. You use modern conversational spoken idioms and keep your responses upbeat, fast-paced, and punchy.",
    "gemini-3.5-flash-lite": "MODEL IDENTITY: Google Gemini 3.5 Flash-Lite. Your style is concise, crisp, clear, and direct. You keep your responses short (1-2 sentences), structured, and easy to follow.",
    "gpt-4o": "MODEL IDENTITY: OpenAI ChatGPT (GPT-4o). Your conversational style is polished, empathetic, engaging, and articulate. You validate the speaker's ideas with genuine curiosity, weave subtle nuance, and keep the interaction smoothly flowing.",
    "gpt-4o-mini": "MODEL IDENTITY: OpenAI ChatGPT (GPT-4o Mini). Your style is friendly, practical, approachable, and encouraging. You give clear, actionable observations and prompt the speaker with accessible conversational topics.",
    "o3-mini": "MODEL IDENTITY: OpenAI o3-mini. Your conversational style is precise, analytical, structured, and insightful. You focus on nuanced topic depth, vocabulary precision, and logical exploration."
  };
  const mStyle = clientModelStyles[activeModel] || clientModelStyles["gemini-4-argon"];

  const histText = (state.currentMessages || [])
    .slice(-8)
    .map((m) => `${m.role === "user" ? "User" : voiceDisplayName}: ${m.text}`)
    .join("\n");

  const prompt = `DO NOT call any tools or read any files. Respond ONLY with a single raw JSON object (no markdown fences).
You are ${voiceDisplayName}, a warm, empathetic, intelligent live English conversation partner in the "${scenario.title}" scenario (${getDynamicRolePrompt(state.scenario)}).
${mStyle}

Recent conversation history:
${histText || "(Start of conversation)"}

User's new message:
"${userMessage}"

Instructions:
1. "reply" (MUST BE THE FIRST KEY): Respond naturally and empathetically directly addressing the exact meaning, story, and emotion of the user's message in 2-3 natural sentences. End with 1 specific, natural follow-up question that continues the story. NEVER ask generic template questions. NEVER repeat questions. NEVER mention AI model names.
2. "follow_up_hint": 1 natural first-person English sentence that the user could say next to answer your question.
3. "is_grammar_perfect": true only if the user's sentence has zero grammar, spelling, preposition, or word-choice issues; otherwise false.
4. "direct_fix": Fix ONLY the grammar, spelling, verb form, or preposition errors in the user's exact sentence while preserving their original words and structure as closely as possible. If already grammatically valid, keep the user's exact sentence.
5. "casual_native": A casual, natural native speaker way to express the user's exact thought.
6. "fluent_polite": A fluent, expressive native way to express the user's exact thought.
7. "grammar_explanation": Concise 1-2 sentence explanation of the grammar fixes made in "direct_fix" (or why it is already grammatically accurate).
8. "pronunciation_tips": Array of 2 concise objects [{"word":"word (phonetic)","tip":"..."}].
9. "key_vocabulary": Array of 2 concise objects [{"word":"phrase","meaning":"..."}].`;

  const resp = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai-fast",
      temperature: 0.65,
      messages: [{ role: "user", content: prompt }]
    })
  });
  if (!resp.ok) throw new Error("Zero-key LLM status " + resp.status);
  const data = await resp.json();
  const rawStr = data.choices?.[0]?.message?.content || "";
  const cleaned = rawStr.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("Invalid JSON from zero-key LLM");
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  if (!parsed || !parsed.reply) throw new Error("Missing reply from zero-key LLM");

  const directFix = (parsed.direct_fix || userMessage).trim();
  const casualNative = (parsed.casual_native || directFix).trim();
  const fluentPolite = (parsed.fluent_polite || directFix).trim();
  const hasDiff = directFix.toLowerCase().replace(/[^\w\s]/g, "") !== userMessage.toLowerCase().replace(/[^\w\s]/g, "");

  return {
    reply: (parsed.reply || "").trim(),
    follow_up_hint: parsed.follow_up_hint || "That makes sense! Let me tell you a little more.",
    is_grammar_perfect: hasDiff ? false : (typeof parsed.is_grammar_perfect === "boolean" ? parsed.is_grammar_perfect : true),
    corrected_sentence: directFix,
    corrected_variants: [
      { label: "Grammar Fix", sentence: directFix },
      { label: "Alternative 1 · Casual Native", sentence: casualNative },
      { label: "Alternative 2 · Fluent & Expressive", sentence: fluentPolite }
    ],
    grammar_explanation: parsed.grammar_explanation || "Grammar and phrasing look good!",
    better_expressions:
      Array.isArray(parsed.better_expressions) && parsed.better_expressions.length > 0
        ? parsed.better_expressions
        : [
            { tone: "Casual Native", phrase: casualNative },
            { tone: "Fluent & Expressive", phrase: fluentPolite }
          ],
    pronunciation_tips:
      Array.isArray(parsed.pronunciation_tips) && parsed.pronunciation_tips.length > 0
        ? parsed.pronunciation_tips
        : [
            { word: "Connected Speech", tip: "Link consonant endings smoothly into the next vowel sound." },
            { word: "Sentence Stress", tip: "Emphasize key nouns and action verbs." }
          ],
    key_vocabulary:
      Array.isArray(parsed.key_vocabulary) && parsed.key_vocabulary.length > 0
        ? parsed.key_vocabulary
        : [
            { word: "express yourself", meaning: "To communicate your thoughts clearly." }
          ],
    scores: calculateRealisticScores(userMessage, !hasDiff && parsed.is_grammar_perfect, directFix, state.learnerLevel)
  };
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

  // Immediate visual feedback in Grammar panel so user knows their new sentence is actively being evaluated
  if (dom.lastUserUtterance) {
    dom.lastUserUtterance.innerHTML = `<span style="opacity:0.8;">"${escapeHtml(text)}"</span>`;
  }
  if (dom.correctedSentence) {
    dom.correctedSentence.innerHTML = `<div class="primary-fix-card" style="opacity:0.85;"><div class="primary-fix-top"><span class="primary-fix-badge">Analyzing...</span></div><div class="primary-fix-text"><em>AI coach is evaluating grammar and natural phrasing...</em></div></div>`;
  }

  try {
    let result;
    if (hasActiveApiKey()) {
      if (state.provider === "openai") {
        result = await callOpenAIChatGPTAPI(text);
      } else {
        result = await callGeminiInteractionsAPI(text);
      }
    } else {
      try {
        result = await callZeroKeyBackendChatAPI(text);
      } catch (proxyErr) {
        // Instant client-side response (< 5ms) on Cloudflare Pages / mobile
        result = generateLocalDemoCoaching(text);
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

    // If the server ever returns an async pending coach ID, poll until ready
    if (result.pending_coach_id) {
      let pollCount = 0;
      const pollCoach = () => {
        pollCount++;
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
              saveSentenceToHistory({
                userSaid: text,
                corrected: c.corrected_sentence,
                explanation: c.grammar_explanation,
                betterExpression: c.better_expressions?.[0]?.phrase || "",
                starred: !c.is_grammar_perfect
              });
            } else if (pollCount < 6) {
              setTimeout(pollCoach, 1000);
            }
          })
          .catch(() => {
            if (pollCount < 6) setTimeout(pollCoach, 1000);
          });
      };
      setTimeout(pollCoach, 800);
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
      speakText(result.reply, state.speechRate);
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
      speakText(fallback.reply);
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

  // 3. ULTRA-FAST INSTANT LIVE VOICE SPEECH (Starts in < 25ms with Browser Natural Neural Voices)
  // Ensures conversational live speaking with 0ms buffering or network latency
  if (targetEngine === "auto-ai" || targetEngine === "browser" || targetEngine === "builtin-neural") {
    if ("speechSynthesis" in window) {
      const normVoice = normalizeVoicePersona(state.voicePersona);
      const utterance = new SpeechSynthesisUtterance(text);
      const personaFallbackProfiles = {
        "gemini:Kore": { lang: "en-US", pitch: 1.08, rateMult: 1.0, genderHint: /ava|jenny|zira|aria|samantha|google us/i },
        "gemini:Puck": { lang: "en-US", pitch: 0.92, rateMult: 1.06, genderHint: /andrew|guy|david|mark|alex/i },
        "gemini:Aoede": { lang: "en-GB", pitch: 1.12, rateMult: 0.98, genderHint: /sonia|libby|hazel|uk english female|serena/i },
        "gemini:Charon": { lang: "en-GB", pitch: 0.82, rateMult: 0.95, genderHint: /ryan|george|uk english male|daniel/i },
        "gemini:Fenrir": { lang: "en-US", pitch: 0.78, rateMult: 1.04, genderHint: /guy|david|mark|james/i },
        "openai:coral": { lang: "en-US", pitch: 1.15, rateMult: 1.03, genderHint: /jenny|aria|zira|samantha/i },
        "openai:nova": { lang: "en-AU", pitch: 1.1, rateMult: 1.04, genderHint: /natasha|catherine|karen|australian/i },
        "openai:alloy": { lang: "en-US", pitch: 1.0, rateMult: 1.0, genderHint: /aria|google us|zira/i },
        "openai:sage": { lang: "en-GB", pitch: 0.86, rateMult: 0.96, genderHint: /thomas|george|ryan|uk english male/i },
        "openai:ash": { lang: "en-US", pitch: 0.9, rateMult: 1.02, genderHint: /brian|mark|david|guy/i },
        "openai:shimmer": { lang: "en-US", pitch: 1.2, rateMult: 0.97, genderHint: /emma|zira|samantha/i }
      };
      const profile = personaFallbackProfiles[normVoice] || personaFallbackProfiles["gemini:Kore"];
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
      return;
    }
  }

  // 4. Studio Neural Voice Server (/api/tts — Python edge-tts fallback)
  try {
    const speakToken = (state.speakToken = (state.speakToken || 0) + 1);
    const cleanText = text.trim();
    const normVoice = normalizeVoicePersona(state.voicePersona);
    const resp = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: cleanText,
        voice: normVoice,
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
    await audio.play();
    return;
  } catch (e) {
    console.warn("Studio Neural Voice fallback notice:", e);
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

  // Dynamic responsive placeholder update on resize
  window.addEventListener("resize", () => {
    if (dom.userInput && !dom.userInput.value) {
      const isMobile = window.innerWidth <= 768;
      dom.userInput.placeholder = isMobile
        ? "Type in English..."
        : (state.conversationMode === "voice" || state.autoSpeak)
        ? "Type in English (or press Speak to talk)..."
        : "Type in English (Chat Mode · Silent)...";
    }
  });

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
      if (dom.quickVoicePersonaSelect) {
        dom.quickVoicePersonaSelect.value = state.voicePersona;
      }
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
      speakText(`Hello! I'm ${voiceDisplayName}. Great to speak with you.`);
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
