# quick start for the rumour detector

so you wanna get this thing running? cool, it's actually super easy. im gonna walk you through it real quick.

## what we fixed

basically we moved the api key out of the code and into environment variables so your secret stuff stays secret. we also set up some docs to help you get this going.

## running it locally (literally 5 minutes)

go to your terminal and do this:

1. cd hack4delhi
2. cp .env.example .env
3. open .env and paste your gemini key where it says your_gemini_api_key_here
4. npm install
5. npm start

then go to http://localhost:3000 in your browser. you should see the dashboard thing. click on rumour verifier and try asking it a question. if you get an answer back, congrats it works!

## deploying to render (when youre ready)

once local is working, read DEPLOYMENT.md. its all there - basically just connect your github repo to render, add the env var, and youre done. render auto deploys when you push.

## if something breaks

common issues:
- modules missing: run npm install again
- port already in use: change PORT in .env to like 3001
- api key not working: double check its actually in the .env file
- chatbot says server error: check your internet, check gemini key is valid

## questions?

read DEPLOYMENT.md for more details or check the comments in server.js
