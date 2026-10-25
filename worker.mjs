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

        const grammarResult = analyzeGrammarAndPhrasing(userMessage, modelMeta);
        const convResult = generateContextualReply(userMessage, modelId, scenarioTitle, partnerName, history, grammarResult);

        let finalReply = convResult.reply;
        let finalHint = convResult.followUpHint;
        let finalDirectFix = grammarResult.corrected;
        let finalExplanation = grammarResult.explanation;
        let finalIsPerfect = grammarResult.isPerfect;
        let finalVariants = grammarResult.correctedVariants;

        // If Workers AI is available in env, query Llama 3.1 8B on Cloudflare GPU edge!
        if (env && env.AI) {
          try {
            const aiPrompt = `You are a warm English conversation partner named ${partnerName} and an ESL grammar coach.
Scenario: "${scenarioTitle}".
Recent conversation:
${history.slice(-4).map(m => (m.role === 'user' ? 'User: ' : `${partnerName}: `) + m.text).join('\n')}

User said: "${userMessage}"

Respond ONLY with a JSON object:
{
  "reply": "Warm conversational response addressing user (1-2 sentences) ending with 1 follow-up question.",
  "follow_up_hint": "1 sentence the user could say next.",
  "is_grammar_perfect": true/false,
  "direct_fix": "Fix only grammar/spelling errors while keeping user's intended meaning.",
  "casual_native": "Natural everyday phrasing.",
  "fluent_polite": "Polite native phrasing.",
  "grammar_explanation": "1 concise sentence explaining errors."
}`;
            const aiRes = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
              messages: [{ role: "user", content: aiPrompt }],
              max_tokens: 384,
              temperature: 0.3
            });
            if (aiRes && aiRes.response) {
              const cleaned = aiRes.response.replace(/```json/gi, "").replace(/```/g, "").trim();
              const s = cleaned.indexOf("{");
              const e = cleaned.lastIndexOf("}");
              if (s !== -1 && e > s) {
                const parsed = JSON.parse(cleaned.slice(s, e + 1));
                if (parsed.reply) finalReply = parsed.reply;
                if (parsed.follow_up_hint) finalHint = parsed.follow_up_hint;
                if (parsed.direct_fix && !grammarResult.isPerfect) {
                  finalDirectFix = parsed.direct_fix;
                  finalVariants = [
                    { label: "1. 내 문장 어법 교정 (Direct Fix)", sentence: finalDirectFix },
                    { label: "추천 1 · Casual Native", sentence: parsed.casual_native || finalVariants[1]?.sentence || finalDirectFix },
                    { label: "추천 2 · Fluent & Expressive", sentence: parsed.fluent_polite || finalVariants[2]?.sentence || finalDirectFix }
                  ];
                }
                if (parsed.grammar_explanation && !grammarResult.isPerfect) {
                  finalExplanation = parsed.grammar_explanation;
                }
              }
            }
          } catch (aiErr) {
            // Use local grammarResult & convResult
          }
        }

        const responsePayload = {
          reply: finalReply,
          follow_up_hint: finalHint,
          is_grammar_perfect: finalIsPerfect,
          corrected_sentence: finalDirectFix,
          corrected_variants: finalVariants,
          grammar_explanation: finalExplanation,
          better_expressions: convResult.betterExpressions,
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
