# 🧠 CogniCare - Companion App for Memory Support
🏆 *Social Impact Track Winner @ **MHacks 16***

## Overview
🚀 This project, built at the University of Michigan, is designed as a companion for individuals facing memory recollection challenges, including those at risk of Alzheimer's disease or Dementia.

🤖 Leveraging AI-powered memory analysis and cognitively stimulating brain exercises, **we're supporting memory health and allowing patients to remember their lives by reliving their memories.**

## Key Features
- **🎮 Interactive Brain Exercises**: Generative AI-powered games that stimulate cognitive functions, intelligently generated from your daily experiences.
- **🤖 AI-Powered Memory Access**: Your memories are analyzed, stored, and accessible through natural language queries.
- **👩‍💻 Powerful, Personalized Experience Recollection**: The mental activities are tailored for users with memory recollection issues; they can watch their own memories to remember important events.
- **📊 Data-Driven Insights**: Analytics to track health status and provide valuable feedback for users and caregivers.

## Running Locally

### Cloning the repository the local machine.

```bash
git clone https://github.com/ishaan1013/mhacks
```

### Add your [OpenAI API key](https://platform.openai.com/api-keys) (with GPT-4 access)

- Required in `backend/app.py` and `backend/gpt_4.ipynb`

### Setup the backend API

- 🪐 Preprocess video data with the Jupyter notebook files, which perform the following:
  - Converting videos into short fragments
  - Transcribing audio & analyzing frames chosen from video fragments using ORB analysis
  - Performing facial recognition
  - Generating questions, names, etc. for brain exercises
    
- 🐍 Run the flask app, which will be available at `http://127.0.0.1:5000`.

```bash
flask run
```

### Running the frontend application

```bash
npm install
```

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

