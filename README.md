# 📫 AlchEMAIList – Smart Email Automation Dashboard

AlchEMAIList is an intelligent, agent-powered email assistant that helps you manage your inbox with ease. It simplifies reading, replying, and spam-checking your emails using powerful **Large Language Models (LLMs)** and seamless **Gmail integration** — all presented in a beautiful, distraction-free UI. It also features robust context processing via **Alchemyst AI** for enhanced email understanding and generation.

---
![Screenshot 2025-07-06 132530](https://github.com/user-attachments/assets/5d6d5a08-9bed-4851-a4d8-0657ae5040a6)
---
### Watched the demo Video here - [Click](https://x.com/Yoges_ai/status/1941754822501466365)
---
## 📚 Additional Documentation

- 👉 For contributing guidelines, see [`docs/contributing.md`](docs/contributing.md)
- 🧱 For a detailed project structure overview, check [`docs/project_structure.md`](docs/project_structure.md)
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
| Auth            | Google OAuth 2.0                        |
| AI Logic        | Alchemyst AI API, Google Gemini (fallback) |
| Email Actions   | Gmail API via OAuth Tokens              |

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
```bash
npm install
```

4. Start Local Dev Server
First, start the backend proxy (if you have a separate Express.js proxy for Alchemyst):

```bash
npx ts-node src/server/server.ts # Adjust path as per your backend proxy setup
```
Then, start the frontend development server (in another terminal):

```bash
npm run dev
```

# 🚀 Getting Started

Once you've completed the setup, your application should be up and running, typically accessible at:

`http://localhost:5173`

---

# 🔐 Google Authentication Setup (Gmail Integration)

To enable the application's Gmail integration, you'll need to configure an **OAuth 2.0 Client ID** in the Google Cloud Console. Follow these steps carefully:

## 1. Access Google Cloud Console

Head over to the [Google Cloud Console](https://console.cloud.google.com/) and log in with your Google account.

## 2. Select or Create a Project

From the top-left dropdown, either select an existing project or create a new one for your application.

## 3. Enable the Gmail API

1.  In the search bar at the top, type and select "Gmail API."
2.  Click the **Enable** button to activate the API for your project.

---

## 4. Configure OAuth Consent Screen

This step defines how your application requests user consent for accessing their data.

1.  In the left navigation menu, go to **APIs & Services > OAuth consent screen**.
2.  Choose "External" user type and click **CREATE**.

### App Information

* **App name:** Give your app a clear name (e.g., `AlchEMAIList`).
* **User support email:** Provide an email address for user support.
* **App logo (Optional):** You can upload a logo for your app.

### Developer Contact Information

* **Email addresses:** Enter your email address(es).

Click **SAVE AND CONTINUE**.

### Scopes (Crucial Step!)

This defines the permissions your application will request.

1.  Click **ADD OR REMOVE SCOPES**.
2.  In the "Filter" box, search for and select the following scopes:
    * `.../auth/gmail.readonly` (Read access to Gmail)
    * `.../auth/gmail.send` (Send emails)
    * `.../auth/gmail.compose` (Create, read, and send messages, and manage drafts)
    * `.../auth/gmail.modify` (Modify messages: mark as read/unread, add/remove labels, move to trash)
    * `.../auth/gmail.com` (**CRITICAL FOR DELETION:** Provides full access to the mailbox, including permanently deleting messages and managing labels.)
    * `.../auth/userinfo.email` (View your email address)
    * `.../auth/userinfo.profile` (View your basic profile info)
3.  Click **ADD TO YOUR SCOPED APPS**.
4.  Review the selected scopes and click **SAVE AND CONTINUE**.

### Test Users (Optional, for "External" apps)

If your application isn't yet verified by Google, you **must** add test users.

* Add the Gmail accounts you'll use for testing the application.

Click **SAVE AND CONTINUE**.

### Summary

* Review your OAuth consent screen summary.
* Click **BACK TO DASHBOARD**.

---

## 5. Create OAuth Client ID Credentials

This generates the **Client ID** and **Client Secret** your application needs for authentication.

1.  In the left navigation menu, go to **APIs & Services > Credentials**.
2.  Click **+ CREATE CREDENTIALS** at the top and select "OAuth client ID."

### Configuration

* **Application type:** Choose "Web application."
* **Name:** Give it a descriptive name (e.g., `AlchEMAIList Web Client`).
* **Authorized JavaScript origins:**
    * Click **+ ADD URI**.
    * Add `http://localhost:5173`
    * *(If you deploy your app, remember to add your production URL here too, e.g., `https://your-app.com`)*
* **Authorized redirect URIs:**
    * Click **+ ADD URI**.
    * Add `http://localhost:5173`
    * *(Again, if you deploy your app, add your production URL here, e.g., `https://your-app.com`)*

### Generate Credentials

1.  Click **CREATE**.
2.  A dialog will appear showing your **Client ID** and **Client Secret**. **Copy these values immediately!** You'll need them for the next step.

### Update Environment Variables

Paste the copied Client ID and Client Secret into your project's `.env.local` file:


### 🧪 Current Limitations
Email Fetching Limit: There is a limit of first 20 emails setup in the code to be safe from Google charges, It can be changed as per requirement.
Summmaries of Email is also limited to 5 to stay safe from LLM credit charges
Only demo accounts can send real emails via Gmail until Google OAuth verification is complete for production apps.
Gemini fallback uses a lighter summarization prompt (can be tuned for more detailed responses).



📬 Contact & Contributions
Want to try it out or contribute? DM me on [LinkedIn](https://www.linkedin.com/in/yogesh-kumar-299298260/) or open an issue!

## 📄 License  
This project is licensed under the [MIT License](LICENSE).
