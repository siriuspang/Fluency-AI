// Cloudflare Worker for Fluency AI
// Handles /api/chat with Workers AI (Llama 3.1 8b) + Instant Grammar Engine

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

  // 5B. AI & Conversational practice (e.g. "difficult having natural conversations with AI")
  if (/ai|bot|robot/i.test(lower) && /conversation|conversations|talk|talking|chat|chatting|natural|difficult|hard|awkward/i.test(lower)) {
    reply = `I completely understand where you're coming from! Having a truly natural back-and-forth conversation with AI can definitely feel challenging at times. What feels the most unnatural or awkward when you chat?`;
    followUpHint = "Sometimes the responses feel a little too formal or repetitive.";
    pronunciationTips = [
      { word: "Natural (ˈnætʃ.ɚ.əl)", tip: "Short 'a' in the first syllable: 'NA-chur-ul'." },
      { word: "Conversation (ˌkɑːn.vɚˈseɪ.ʃən)", tip: "Stress the third syllable: 'con-ver-SAY-shun'." }
    ];
    keyVocabulary = [
      { word: "back-and-forth", meaning: "주고받는 대화" },
      { word: "stiff", meaning: "어색하고 딱딱한" }
    ];
    betterExpressions = [
      { tone: "Casual Native", phrase: "It's pretty tough having natural conversations with AI." },
      { tone: "Fluent & Expressive", phrase: "Having seamless, natural conversations with AI presents quite a challenge." }
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


export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();
        const userMessage = (body.userMessage || "").trim();
        const modelId = body.model || "gpt-4o";
        const scenarioTitle = body.scenarioTitle || "Casual Daily Talk";
        const partnerName = body.voiceName || "Alloy";
        const history = Array.isArray(body.history) ? body.history : [];
        const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gpt-4o"] || MODEL_PERSONAS["gemini-4-argon"];
        const learnerLevel = body.learnerLevel || "intermediate";

        const grammarResult = analyzeGrammarAndPhrasing(userMessage, modelMeta);
        const convResult = generateContextualReply(userMessage, modelId, scenarioTitle, partnerName, history, grammarResult);

        let finalReply = convResult.reply;
        let finalHint = convResult.followUpHint;
        let finalDirectFix = grammarResult.corrected;
        let finalExplanation = grammarResult.explanation;
        let finalIsPerfect = grammarResult.isPerfect;
        let finalVariants = grammarResult.correctedVariants;

        let aiDebugInfo = { hasEnvAI: Boolean(env && env.AI), called: false, usedVoiceModel: null, usedCoachModel: null, error: null };
        if (env && env.AI) {
          aiDebugInfo.called = true;
          try {
            // ==================== PIPECAT & LIVEKIT CONVERSATIONAL VOICE PIPELINE ====================
            // Track 1: Dedicated Voice Dialogue Agent (Pure spoken human conversation without grammar pollution)
            const voiceSystemPrompt = `You are ${partnerName}, an authentic, warm native English speaker having a casual 1-on-1 voice conversation with a friend. Scenario: "${scenarioTitle}".

VOICE CONVERSATION RULES:
1. Speak naturally like a real human friend over coffee (use casual, natural everyday spoken English).
2. React genuinely to what the user said with emotional warmth (e.g. "Oh, I know what you mean!", "That sounds amazing!", "I totally get that!").
3. NEVER repeat the user's words back to them, and NEVER say things like "I think you mean..." or "I mean writing".
4. NEVER mention grammar, typos, spelling mistakes, English practice, lessons, or tests. You are NOT an AI assistant or teacher; you are a friend.
5. Even if the user made typos or small slips of the tongue, effortlessly understand their intended meaning without ever mentioning the typo.
6. Keep your response to 1-2 spoken sentences, followed by ONE natural, open-ended question to keep the chat going.
7. Output ONLY your spoken words directly. No quotes, no markdown, no JSON.`;

            const voiceMessages = [
              { role: "system", content: voiceSystemPrompt },
              ...history.slice(-6).map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.text
              })),
              { role: "user", content: userMessage }
            ];

            // Track 2: Dedicated Bilingual Shadow Coach Agent (Spelling, Grammar, CEFR, Native Variations)
            const coachSystemPrompt = `You are an expert bilingual English speaking & grammar coach.
Analyze the user's English utterance: "${userMessage}".
Check for ANY spelling typos, missing letters, grammatical errors, subject-verb disagreement, prepositions, or unnatural phrasing.
Correct all mistakes into clean, natural standard English while preserving the user's intended meaning.

Respond ONLY with a valid JSON object matching this schema (no markdown fences, no text before or after):
{
  "is_grammar_perfect": boolean,
  "direct_fix": "User's sentence with ALL spelling typos, missing letters, and grammatical errors corrected into clean standard English",
  "casual_native": "How a native speaker would say this exact thought casually in everyday speech",
  "fluent_polite": "How a native speaker would say this in polished, expressive English",
  "explanation": "Friendly 1-2 sentence explanation in Korean specifically describing the typos and grammar corrections made (e.g. '철자 교정: hving -> having, netural -> natural...')"
}`;

            const coachMessages = [
              { role: "system", content: coachSystemPrompt },
              { role: "user", content: `Analyze and correct: "${userMessage}"` }
            ];

            const candidateModels = [
              "@cf/meta/llama-3.2-3b-instruct",
              "@cf/meta/llama-3.2-1b-instruct",
              "@cf/meta/llama-3-8b-instruct",
              "@cf/mistral/mistral-7b-instruct-v0.2"
            ];

            async function runAIWithCandidates(messages, maxTokens, temperature) {
              for (const m of candidateModels) {
                try {
                  const res = await env.AI.run(m, {
                    messages,
                    max_tokens: maxTokens,
                    temperature
                  });
                  if (res && (res.response || res.choices || typeof res === "string")) {
                    return { res, model: m };
                  }
                } catch (e) {
                  // try next candidate
                }
              }
              return null;
            }

            // Execute Track 1 (Voice Dialogue) and Track 2 (Shadow Coach) concurrently!
            const [voiceRun, coachRun] = await Promise.allSettled([
              runAIWithCandidates(voiceMessages, 120, 0.6),
              runAIWithCandidates(coachMessages, 250, 0.2)
            ]);

            // Process Track 1 (Spoken Voice Reply)
            if (voiceRun.status === "fulfilled" && voiceRun.value) {
              aiDebugInfo.usedVoiceModel = voiceRun.value.model;
              const aiVoiceRes = voiceRun.value.res;
              let rawVoiceText = (aiVoiceRes.choices && aiVoiceRes.choices[0] && aiVoiceRes.choices[0].message && aiVoiceRes.choices[0].message.content) ||
                                (typeof aiVoiceRes.response === "string" ? aiVoiceRes.response : "") ||
                                (typeof aiVoiceRes === "string" ? aiVoiceRes : "");
              if (rawVoiceText) {
                rawVoiceText = rawVoiceText.replace(/^["'`\s]+|["'`\s]+$/g, "").trim();
                if (!/^(as an ai|i am an ai|i cannot|i think you mean)\b/i.test(rawVoiceText) && rawVoiceText.length > 5) {
                  finalReply = rawVoiceText;
                }
              }
            }

            // Process Track 2 (Shadow Coach Grammar Analysis)
            if (coachRun.status === "fulfilled" && coachRun.value) {
              aiDebugInfo.usedCoachModel = coachRun.value.model;
              const aiCoachRes = coachRun.value.res;
              let rawCoachText = (aiCoachRes.choices && aiCoachRes.choices[0] && aiCoachRes.choices[0].message && aiCoachRes.choices[0].message.content) ||
                                (typeof aiCoachRes.response === "string" ? aiCoachRes.response : "") ||
                                (typeof aiCoachRes === "string" ? aiCoachRes : "");
              if (rawCoachText) {
                rawCoachText = rawCoachText.replace(/```(?:json)?/gi, "").replace(/```/gi, "").trim();
                const jsonMatch = rawCoachText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  try {
                    const parsedCoach = JSON.parse(jsonMatch[0]);
                    if (parsedCoach.direct_fix && typeof parsedCoach.direct_fix === "string") {
                      let cleanFix = parsedCoach.direct_fix.replace(/^["'`\s]+|["'`\s]+$/g, "").trim();
                      // Post-fix common phonetic ambiguity in AI conversations (neutral conversations -> natural conversations)
                      cleanFix = cleanFix.replace(/\bneutral\s+conversations?\b/gi, "natural conversations");
                      if (cleanFix.length > 0) {
                        finalDirectFix = cleanFix;

                        const normOrig = userMessage.toLowerCase().replace(/[^a-z0-9]/g, "");
                        const normFix = cleanFix.toLowerCase().replace(/[^a-z0-9]/g, "");
                        if (normOrig !== normFix) {
                          finalIsPerfect = false;
                        } else {
                          finalIsPerfect = Boolean(parsedCoach.is_grammar_perfect);
                        }

                        if (parsedCoach.explanation && typeof parsedCoach.explanation === "string" && parsedCoach.explanation.length > 3) {
                          finalExplanation = parsedCoach.explanation.trim();
                        } else if (!finalIsPerfect) {
                          finalExplanation = "문장의 철자 오류 및 문법 표현을 자연스러운 표준 영어로 교정했습니다.";
                        }

                        const casual = (parsedCoach.casual_native && typeof parsedCoach.casual_native === "string" && parsedCoach.casual_native.trim()) || finalDirectFix;
                        const fluent = (parsedCoach.fluent_polite && typeof parsedCoach.fluent_polite === "string" && parsedCoach.fluent_polite.trim()) || finalDirectFix;

                        finalVariants = [
                          { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: finalDirectFix },
                          { label: "추천 1 · Casual Native", sentence: casual },
                          { label: "추천 2 · Fluent & Expressive", sentence: fluent }
                        ];
                      }
                    }
                  } catch (parseErr) {
                    console.warn("Workers AI coach JSON parse error:", parseErr);
                  }
                }
              }
            }
          } catch (aiErr) {
            aiDebugInfo.error = (aiErr && (aiErr.stack || aiErr.message)) || String(aiErr);
          }
        }
        const responsePayload = {
          _debug: { hasEnvAI: Boolean(env && env.AI), aiDebug: aiDebugInfo },
          reply: finalReply,
          follow_up_hint: finalHint,
          is_grammar_perfect: finalIsPerfect,
          corrected_sentence: finalDirectFix,
          corrected_variants: finalVariants,
          grammar_explanation: finalExplanation,
          better_expressions: [
            { tone: "Casual Native", phrase: finalVariants[1]?.sentence || finalDirectFix },
            { tone: "Fluent & Expressive", phrase: finalVariants[2]?.sentence || finalDirectFix }
          ],
          pronunciation_tips: convResult.pronunciationTips,
          key_vocabulary: convResult.keyVocabulary,
          recommended_speech_rate: convResult.recommendedSpeechRate || null,
          scores: {
            fluency: finalIsPerfect ? 94 : 68,
            grammar: finalIsPerfect ? 98 : 60,
            vocabulary: 78,
            cefr_level: finalIsPerfect ? "B2" : "B1"
          }
        };

        return new Response(JSON.stringify(responsePayload), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }

    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};
