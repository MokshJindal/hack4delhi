const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are a knowledgeable assistant about Delhi government policies, schemes, and facts.
Current information:
- Current CM of Delhi: Rekha Gupta
- You provide accurate information about Delhi government schemes and policies
- Answer questions about Delhi facts, policies, and rumors
- Be concise and factual in your responses`;

async function callGroqAPI(question) {
  const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
    model: 'mixtral-8x7b-32768',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question }
    ],
    temperature: 0.7,
    max_tokens: 1024
  }, {
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].message.content;
}

async function callOpenAI(question) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question }
    ],
    temperature: 0.7,
    max_tokens: 1024
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].message.content;
}

async function callClaude(question) {
  const response = await axios.post('https://api.anthropic.com/v1/messages', {
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: question }
    ]
  }, {
    headers: {
      'Authorization': `Bearer ${CLAUDE_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.content[0].text;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'empty question' });
    }

    let answer;
    let source = 'groq';

    try {
      answer = await callGroqAPI(question);
    } catch (e) {
      console.log('groq failed, trying openai...');
      if (OPENAI_KEY) {
        try {
          answer = await callOpenAI(question);
          source = 'openai';
        } catch (e2) {
          console.log('openai also failed');
          if (CLAUDE_KEY) {
            answer = await callClaude(question);
            source = 'claude';
          } else {
            throw e;
          }
        }
      } else if (CLAUDE_KEY) {
        answer = await callClaude(question);
        source = 'claude';
      } else {
        throw e;
      }
    }

    res.json({ answer, source });
  } catch (err) {
    console.error('chat error:', err.message);
    res.status(500).json({ error: 'failed to get response' });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  console.log(`groq: ${GROQ_API_KEY ? 'yes' : 'no'}`);
  console.log(`openai: ${OPENAI_KEY ? 'yes' : 'no'}`);
  console.log(`claude: ${CLAUDE_KEY ? 'yes' : 'no'}`);
});
