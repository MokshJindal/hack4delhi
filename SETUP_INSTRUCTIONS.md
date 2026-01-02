# Setup Instructions for Delhi Policy Rumour Detector

This chatbot requires a backend server to work properly. Follow these steps:

## Step 1: Install Node.js (if not already installed)
Download from: https://nodejs.org/

## Step 2: Clone or Navigate to Your Project
Open terminal and go to your project folder

## Step 3: Install Dependencies
```bash
npm install
```

## Step 4: Create .env File
Create a `.env` file in the project root with your API keys:
```
GROQ_API_KEY=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
OPENAI_KEY=your_openai_key_here_optional
CLAUDE_KEY=your_claude_key_here_optional
PORT=3000
```

## Step 5: Start the Server
```bash
node server.js
```

You should see: "server started on port 3000"

## Step 6: Open the Chatbot
Once server is running, open your browser and go to:
```
http://localhost:3000/rumour_detector.html
```

## Features
- Works with Groq API (primary)
- Falls back to OpenAI if Groq fails
- Falls back to Claude if both fail
- Configured to answer questions about Delhi policies and government

## Troubleshooting

**Issue**: "Cannot GET /rumour_detector.html"
- Make sure server.js is running
- Try visiting: http://localhost:3000 first to verify server works

**Issue**: "Unable to fetch response"
- Check if server is running
- Verify API keys in .env file
- Check browser console (F12) for error messages

**Issue**: Dependencies not installing
- Make sure you have npm installed
- Try: `npm install --force`

## Need Help?
If it still doesn't work, check:
1. Is the server running? (check terminal)
2. Do you have valid API keys?
3. Is port 3000 free? (no other app using it)
