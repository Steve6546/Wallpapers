import axios from "axios";

// Check if we're using mock API
const useMockApi = import.meta.env.VITE_MOCK_API === "true";

// If using mock API, use the current host, otherwise use the configured backend host
const baseURL = useMockApi
  ? `${window.location.protocol}//${window.location.host}`
  : `${import.meta.env.VITE_USE_TLS === "true" ? "https" : "http"}://${import.meta.env.VITE_BACKEND_HOST || window.location.host}`;

export const openHands = axios.create({
  baseURL,
});

// Store the OpenRouter API key in localStorage
export const setOpenRouterApiKey = (apiKey: string) => {
  localStorage.setItem("openrouter_api_key", apiKey);
};

export const getOpenRouterApiKey = (): string | null =>
  localStorage.getItem("openrouter_api_key");

// Add request interceptor to include the OpenRouter API key from localStorage if available
openHands.interceptors.request.use(
  (config) => {
    const apiKey = getOpenRouterApiKey();

    // If we have an API key in localStorage, add it to the request headers
    if (apiKey) {
      // Create a new headers object to avoid modifying the parameter directly
      const newHeaders = { ...config.headers };
      newHeaders.Authorization = `Bearer ${apiKey}`;

      // Return a new config object with the updated headers
      return {
        ...config,
        headers: newHeaders,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);
