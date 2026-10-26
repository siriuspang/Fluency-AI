const https = require('https');

const payload = JSON.stringify({
  userMessage: "It's difficult hving netural convarsations with AI.",
  scenarioTitle: "Casual Daily Talk",
  voiceName: "Alloy"
});

const req = https.request({
  hostname: 'fluency-ai.siriuspang.workers.dev',
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      console.log('STATUS:', res.statusCode);
      console.log('REPLY:', json.reply);
      console.log('CORRECTED:', json.corrected_sentence);
      console.log('IS_PERFECT:', json.is_grammar_perfect);
      console.log('EXPLANATION:', json.grammar_explanation);
      console.log('VARIANTS:', JSON.stringify(json.corrected_variants, null, 2));
    } catch (e) {
      console.error('Raw response:', body);
    }
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.error('Request err:', err.message);
  process.exit(1);
});

req.write(payload);
req.end();
