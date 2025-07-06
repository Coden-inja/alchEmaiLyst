# 📫 AlchEMAIList – Smart Email Automation Dashboard

AlchEMAIList is an intelligent, agent-powered email assistant that helps you manage your inbox with ease. It simplifies reading, replying, and spam-checking your emails using powerful **Large Language Models (LLMs)** and seamless **Gmail integration** — all presented in a beautiful, distraction-free UI. It also features robust context processing via **Alchemyst AI** for enhanced email understanding and generation.

---

## ⚡ Key Features

* **✉️ Email Summarizer** – Extract key insights from any email or thread using AI.
* **🤖 AI Reply Composer** – Generate human-like replies using Alchemyst LLM (with Gemini fallback supported).
* **🛡️ Spam Detector** – Instantly check if any message is spam before sending or replying.
* **🧠 Intelligent Context Management** – Leverage Alchemyst's context capabilities for enhanced understanding and more relevant AI responses.
* **🔐 Google OAuth Login** – Uses your Gmail account to send and manage emails, and access inbox metadata securely.
* **🌈 Beautiful UI** – Built with TailwindCSS, ShadCN, and neon gradients for a premium feel.

---

## 🧠 How It Works

### AI Agent Logic

| Task             | LLM Used                                             | Notes                                                                                                                                                                                            |
| :--------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chat Completion  | 🧠 Alchemyst LLM proxy (alchemyst-ai/alchemyst-c1 model) | Uses `/proxy/default/chat/completions` endpoint for direct Alchemyst usage, or specific `{proxyUrl}/{OpenAIAPIKey}` for external proxying.                                                        |
|                  | 🔁 Gemini Fallback (if Alchemyst fails)              | Automatic fallback via agent logic in `ApiService`.                                                                                                                                              |
| Email Summary    | 📩 Gmail thread + LLM summarizer                     | Email content pulled via Google Auth, summarized by AI.                                                                                                                                          |
| Reply Generation | 📬 Gmail + LLM-based generation                      | Persona-based logic can be implemented via Alchemyst.                                                                                                                                            |
| Spam Detection   | 📛 Google email + heuristic API                      | Uses Gmail metadata + Alchemyst API for analysis.                                                                                                                                                |
| Export to Sheets | Data Flow                                            | (You mentioned you have images for the Data Flow diagram, so please insert them here. ) _Since I cannot insert images, this is a placeholder for your Data Flow diagram._ |

---

## 🧰 Tech Stack

| Layer           | Tech Used                               |
| :-------------- | :-------------------------------------- |
| Frontend        | React, Vite, TailwindCSS, ShadCN, Lucide |
| Backend Proxy   | Express.js + Axios                      |
| Auth            | Google OAuth 2.0                        |
| AI Logic        | Alchemyst AI API, Google Gemini (fallback) |
| Email Actions   | Gmail API via OAuth Tokens              |
| Export to Sheets |                                         |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/coden-inja/alchEmaiLyst.git](https://github.com/coden-inja/alchEmaiLyst.git)
cd alchEmaiLyst

```

2. Setup .env.local
Create a .env.local file in the root of your project directory using .env.example . This file will store your API keys and base URLs.

# Alchemyst AI Configuration
VITE_ALCHEMYST_API_BASE= # Or your local Alchemyst backend URL
VITE_ALCHEMYST_API_KEY=your_alchemyst_api_key                     # Your Alchemyst Bearer token for authentication

# Google Gemini Configuration (for AI fallback)
VITE_GEMINI_API_KEY=your_google_gemini_api_key                     # Your Google Gemini API key

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id                     # Your Google OAuth Client ID
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret             # Your Google OAuth Client Secret

3. Install Dependencies
Bash
`
npm install
`

4. Start Local Dev Server
First, start the backend proxy (if you have a separate Express.js proxy for Alchemyst):

Bash

`
npx ts-node src/server/server.ts # Adjust path as per your backend proxy setup
`
Then, start the frontend development server:

Bash
`
npm run dev
`

The application should now be running, typically accessible at http://localhost:5173.

🔐 Google Auth Setup
To enable Gmail integration, you need to configure an OAuth 2.0 Client ID in the Google Cloud Console.

Go to Google Cloud Console: Navigate to the Google Cloud Console. Log in with your Google account.

Create or Select a Project: From the top-left dropdown, select an existing project or create a new one.

Enable the Gmail API: In the search bar at the top, type "Gmail API" and select it. Click "Enable" to enable the API for your project.

Configure OAuth Consent Screen:

In the left navigation menu, go to APIs & Services > OAuth consent screen.

Choose "External" user type and click "CREATE".

App information: Fill in your App name (e.g., AlchEMAIList), User support email, and optionally add an App logo.

Developer contact information: Enter your email address.

Click "SAVE AND CONTINUE".

Scopes: This is a crucial step for granting permissions.

Click "ADD OR REMOVE SCOPES".

In the "Filter" box, search for and select the following scopes:

.../auth/gmail.readonly (Read access to Gmail)

.../auth/gmail.send (Send emails)

.../auth/gmail.compose (Create, read, and send messages, and manage drafts)

.../auth/gmail.modify (Modify messages: mark as read/unread, add/remove labels, move to trash)

.../auth/gmail.full_access (CRITICAL FOR DELETION: Provides full access to the mailbox, including permanently deleting messages and managing labels.)

.../auth/userinfo.email (View your email address)

.../auth/userinfo.profile (View your basic profile info)

Click "ADD TO YOUR SCOPED APPS".

Review the selected scopes and click "SAVE AND CONTINUE".

Test users (Optional, for "External" apps): If your app is not yet verified, you'll need to add test users. Add the Gmail accounts you'll use for testing.

Click "SAVE AND CONTINUE".

Review your OAuth consent screen summary and click "BACK TO DASHBOARD".

Create OAuth Client ID Credentials:

In the left navigation menu, go to APIs & Services > Credentials.

Click "+ CREATE CREDENTIALS" at the top and select "OAuth client ID".

Application type: Choose "Web application".

Name: Give it a descriptive name (e.g., AlchEMAIList Web Client).

Authorized JavaScript origins:

Click "+ ADD URI".

Add http://localhost:5173

(If you deploy your app, add your production URL here too, e.g., https://your-app.com)

Authorized redirect URIs:

Click "+ ADD URI".

Add http://localhost:5173

(If you deploy your app, add your production URL here too, e.g., https://your-app.com)

Click "CREATE".

A dialog will appear showing your Client ID and Client Secret. Copy these values.

Paste these values into your .env file as VITE_GOOGLE_CLIENT_ID and VITE_GOOGLE_CLIENT_SECRET.

Important Note on Scopes: After making changes to your requested scopes, existing users of your application will need to re-authenticate and grant the new permissions. Your application should guide users through this process (e.g., by checking isAuthenticated() and redirecting to getAuthUrl()).

🧪 Current Limitations
Email Fetching Limit: The current email fetching implementation (not shown in GoogleAuthService.ts) does not inherently limit the number of emails fetched or implement pagination. This might lead to fetching a large number of emails at once. This is a potential area for future enhancement.

Only demo accounts can send real emails via Gmail until Google OAuth verification is complete for production apps.

Gemini fallback uses a lighter summarization prompt (can be tuned for more detailed responses).

📸 Screenshots




📬 Contact & Contributions
Want to try it out or contribute? DM me on LinkedIn or open an issue!

📄 License
MIT © YourName