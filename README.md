# DBZ Power Scouter (战斗力侦测器)

[![Made with Gemini](https://img.shields.io/badge/Made%20with-Gemini-blue.svg)](https://ai.google.dev/)

An interactive web application that mimics a Dragon Ball Z scouter. Upload an image, and the app will use the Google Gemini API to analyze the subject and assign a power level, complete with an in-character analysis.

一个模仿《龙珠Z》战斗力侦测器的互动网页应用。上传一张图片，应用将使用 Google Gemini API 分析图片中的对象，并为其分配一个战斗力数值，同时附上一段符合角色设定的分析。

---

## 🚀 Live Demos

### Standalone Web App (Use Your Own API Key)
Experience the full application on Cloudflare Pages. This version allows you to use your own Gemini API key for unlimited analysis.

**[➡️ Launch on Cloudflare Pages](https://power-scouter.pages.dev/)**

### AI Studio Prompt Demo
See the core prompt in action directly within Google AI Studio.

**[➡️ Try in AI Studio](https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221-4VmnNzut1Z3Ouu2MSwE41CCX61vE-h1%22%5D,%22action%22:%22open%22,%22userId%22:%22102038139080022776927%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing)**

## ✨ Features

*   **AI-Powered Analysis**: Leverages the multimodal capabilities of the Gemini API to generate a power level and a creative reason for any image.
*   **Multiple Upload Methods**: Easily upload images via file picker, drag-and-drop, or pasting directly from the clipboard.
*   **Thematic UI/UX**: A retro, DBZ-inspired interface with a scanning animation and futuristic typography to immerse you in the experience.
*   **Bilingual Support**: Fully functional in both English and Chinese, with language detection based on browser settings.
*   **Customizable Settings**:
    *   Switch between different Gemini models (`2.5 Flash`, `2.5 Pro`).
    *   Manually select your preferred language.
    *   Securely input your own Gemini API key, stored locally in your browser.
*   **Responsive Design**: The scouter display adapts smoothly to both desktop and mobile screens.

## 📸 Screenshot

Below is an example of the scouter analyzing an image. The UI features a green, futuristic theme reminiscent of the original scouters from Dragon Ball Z.

![App Screenshot](https://storage.googleapis.com/static.aistudio.google.com/prompt/screenshots/dbz-scouter.png)

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Tailwind CSS
*   **AI Model**: Google Gemini API (`@google/genai`)

## 🤖 How It Works

The application's logic is straightforward:

1.  **Image Input**: The user uploads an image through one of the supported methods (click, drag-drop, paste).
2.  **Data Conversion**: The React frontend converts the image file into a base64-encoded string.
3.  **API Request**: The base64 string, along with a carefully crafted prompt (in either English or Chinese), is sent to the Gemini API. The prompt instructs the model to act as a DBZ scouter and return its analysis in a structured JSON format.
4.  **JSON Schema Enforcement**: The API call specifies a `responseSchema` to ensure the model's output is always a valid JSON object containing `powerLevel` (integer) and `reasoning` (string).
5.  **Display Results**: The frontend parses the JSON response and dynamically displays the power level and analysis over the user's image, completing the scouter effect.

## 🔑 API Key Configuration

To use this application, you need a Google Gemini API Key.

1.  Get a key for free from [Google AI Studio](https://makersuite.google.com/).
2.  Open the application and click the settings icon (⚙️) in the top-right corner.
3.  Paste your Gemini API key into the designated field.
4.  The key is saved securely in your browser's `localStorage` for future sessions.
