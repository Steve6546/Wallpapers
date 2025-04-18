/**
 * Determines if a model is free to use on OpenRouter
 * This is a simplified implementation - in a real app, this would be determined by the API
 * @param modelId The model ID to check
 * @returns boolean indicating if the model is free
 */
export const isFreeModel = (modelId: string): boolean => {
  // List of known free models on OpenRouter
  const freeModels = [
    "mistralai/mistral-7b-instruct",
    "meta-llama/llama-3-8b-instruct",
    "google/gemma-7b-it",
    "openchat/openchat",
    "nousresearch/nous-hermes",
    "microsoft/phi-3-mini",
    "google/gemma-2-9b-it",
  ];

  // Check if the model ID is in the list of free models
  return freeModels.some((freeModel) =>
    modelId.toLowerCase().includes(freeModel.toLowerCase()),
  );
};
