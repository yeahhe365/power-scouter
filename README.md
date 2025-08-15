# DBZ Power Scouter (战斗力侦测器)

[![Made with Gemini](https://img.shields.io/badge/Made%20with-Gemini-blue.svg)](https://ai.google.dev/)

一个模仿《龙珠Z》战斗力侦测器的互动网页应用。上传一张图片，应用将使用 Google Gemini API 分析图片中的对象，并为其分配一个战斗力数值，同时附上一段符合角色设定的分析。

---

## 🚀 在线体验 (Live Demos)

### 独立 Web 应用 (使用您自己的 API 密钥)
在 Cloudflare Pages 上体验完整的应用程序。此版本允许您使用自己的 Gemini API 密钥进行无限制的分析。

**[➡️ 在 Cloudflare Pages 上启动](https://power-scouter.pages.dev/)**

### AI Studio 提示词示例
直接在 Google AI Studio 中查看核心提示词的实际效果。

**[➡️ 在 AI Studio 中尝试](https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221-4VmnNzut1Z3Ouu2MSwE41CCX61vE-h1%22%5D,%22action%22:%22open%22,%22userId%22:%22102038139080022776927%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing)**

## ✨ 主要功能 (Features)

*   **AI 驱动分析**: 利用 Gemini API 的多模态能力，为任何图像生成战斗力数值和富有创意的分析理由。
*   **多种上传方式**: 通过文件选择器、拖放或直接从剪贴板粘贴，轻松上传图像。
*   **主题化 UI/UX**: 复古的、受《龙珠Z》启发的界面，配有扫描动画和未来派字体，带给您身临其境的体验。
*   **双语支持**: 完全支持英语和中文，并能根据浏览器设置自动检测语言。
*   **可自定义设置**:
    *   在不同的 Gemini 模型（`2.5 Flash`, `2.5 Pro`）之间切换。
    *   手动选择您偏好的语言。
    *   安全地输入您自己的 Gemini API 密钥，该密钥仅存储在您的本地浏览器中。
*   **响应式设计**: 侦测器显示界面能流畅地适应桌面和移动设备屏幕。

## 📸 应用截图 (Screenshot)

下图是侦测器分析图像的示例。UI 采用了绿色、未来主义的主题，让人联想到《龙珠Z》中的原始侦测器。

![App Screenshot](https://storage.googleapis.com/static.aistudio.google.com/prompt/screenshots/dbz-scouter.png)

## 🛠️ 技术栈 (Tech Stack)

*   **前端**: React, TypeScript, Tailwind CSS
*   **AI 模型**: Google Gemini API (`@google/genai`)

## 🤖 工作原理 (How It Works)

应用程序的逻辑非常直接：

1.  **图像输入**: 用户通过支持的方式（点击、拖放、粘贴）上传一张图片。
2.  **数据转换**: React 前端将图像文件转换为 base64 编码的字符串。
3.  **API 请求**: base64 字符串与精心设计的提示词（英文或中文）一同发送到 Gemini API。提示词指示模型扮演一个《龙珠Z》的战斗力侦测器，并以结构化的 JSON 格式返回其分析结果。
4.  **JSON Schema 强制执行**: API 调用指定了一个 `responseSchema`，以确保模型的输出始终是包含 `powerLevel` (整数) 和 `reasoning` (字符串) 的有效 JSON 对象。
5.  **显示结果**: 前端解析 JSON 响应，并将战斗力数值和分析动态地显示在用户上传的图片上，完成侦测器效果。

## 🔑 API 密钥配置 (API Key Configuration)

要使用此应用程序，您需要一个 Google Gemini API 密钥。

1.  从 [Google AI Studio](https://makersuite.google.com/) 免费获取密钥。
2.  打开应用程序，点击右上角的设置图标 (⚙️)。
3.  将您的 Gemini API 密钥粘贴到指定字段中。
4.  密钥会安全地保存在您浏览器的 `localStorage` 中，以便将来使用。
