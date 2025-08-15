
export interface ScouterData {
  powerLevel: number;
  reasoning: string;
}

export interface ModelConfig {
  nameKey: string;
  id: string;
  params: {
    thinkingConfig?: { thinkingBudget: number };
  };
}
