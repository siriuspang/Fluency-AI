// Cloudflare Worker for Fluency AI
// Handles /api/chat directly on Cloudflare Edge with zero-API-key instant AI coaching

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
      const pReg = new RegExp(`\b(yesterday|last\s+(?:night|week|month|year))\s+([a-z]+\s+)?${base}\b`, "gi");
      if (pReg.test(corrected)) {
        corrected = corrected.replace(pReg, `$1 $2${past}`);
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
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

    // Handle /api/chat endpoint
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();
        const userMessage = (body.userMessage || "").trim();
        const modelId = body.model || "gemini-4-argon";
        const scenarioTitle = body.scenarioTitle || "Casual Daily Talk";
        const partnerName = body.voiceName || "Kore";
        const history = Array.isArray(body.history) ? body.history : [];
        const modelMeta = MODEL_PERSONAS[modelId] || MODEL_PERSONAS["gemini-4-argon"];

        const grammarResult = analyzeGrammarAndPhrasing(userMessage, modelMeta);
        const convResult = generateContextualReply(userMessage, modelId, scenarioTitle, partnerName, history, grammarResult);

        const responsePayload = {
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

    // Fallback: serve static assets via Cloudflare Assets binding
    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};
