import type { ModelConfig } from '../types';

export const availableModels: ModelConfig[] = [
  { 
    nameKey: 'model.gemini-2.5-flash.name', 
    id: 'gemini-2.5-flash', 
    params: {} 
  },
  { 
    nameKey: 'model.gemini-2.5-pro.name', 
    id: 'gemini-2.5-pro', 
    params: {} 
  },
];

export const defaultModel = availableModels[0];