import { GoogleGenAI, Type } from "@google/genai";
import type { ScouterData, ModelConfig } from '../types';

// The process.env.API_KEY can now serve as a fallback.
const FALLBACK_API_KEY = process.env.API_KEY;

const prompts = {
  en: "You are a power scouter from the Dragon Ball Z universe. Analyze the subject in this image and determine their power level. Provide a numerical power level and a brief, dramatic, in-character reason for your assessment, written in English. Be creative. Your response must be a JSON object.",
  zh: "你是一个来自《龙珠Z》宇宙的战斗力侦测器。分析这张图片中的对象并确定他们的战斗力。提供一个数值形式的战斗力，并以侦测器的口吻给出一个简短、戏剧性的评估理由，必须用中文书写。请发挥创造力。你的回应必须是一个JSON对象。"
};

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve(''); // Should not happen with readAsDataURL
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeImagePowerLevel = async (
  imageFile: File, 
  modelConfig: ModelConfig, 
  language: 'en' | 'zh',
  apiKey: string | null // New parameter
): Promise<ScouterData> => {

  const keyToUse = apiKey || FALLBACK_API_KEY;

  if (!keyToUse) {
    throw new Error("API_KEY_MISSING"); // Specific error to be caught in App.tsx
  }

  const ai = new GoogleGenAI({ apiKey: keyToUse });

  const imagePart = await fileToGenerativePart(imageFile);
  const prompt = prompts[language] || prompts.en;
  
  const textPart = { text: prompt };

  const reasoningDescription = language === 'zh' 
    ? "一个简短的、符合侦测器口吻的分析，必须用中文书写。"
    : "A short, in-character analysis from the scouter's perspective, written in English.";

  const response = await ai.models.generateContent({
    model: modelConfig.id,
    contents: { parts: [textPart, imagePart] },
    config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                powerLevel: {
                    type: Type.INTEGER,
                    description: "The calculated power level value."
                },
                reasoning: {
                    type: Type.STRING,
                    description: reasoningDescription
                }
            },
            required: ["powerLevel", "reasoning"],
        },
        ...modelConfig.params,
    }
  });

  try {
    const jsonString = response.text.trim();
    const data: ScouterData = JSON.parse(jsonString);
    return data;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini response:", response.text);
    throw new Error("Invalid format returned by the AI.");
  }
};
