import type { ModelConfig } from '../types';

export const availableModels: ModelConfig[] = [
  { 
    nameKey: 'model.gemini-2.5-flash.name', 
    id: 'gemini-2.5-flash', 
    params: {} 
  },
];

export const defaultModel = availableModels[0];
