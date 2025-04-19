import { useQuery } from "@tanstack/react-query";
import AZM AI from "#/api/open-hands";

const fetchAiConfigOptions = async () => ({
  models: await AZM AI.getModels(),
  agents: await AZM AI.getAgents(),
  securityAnalyzers: await AZM AI.getSecurityAnalyzers(),
});

export const useAIConfigOptions = () =>
  useQuery({
    queryKey: ["ai-config-options"],
    queryFn: fetchAiConfigOptions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
