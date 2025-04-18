import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nKey } from "#/i18n/declaration";
import { mapProvider } from "#/utils/map-provider";
import { VERIFIED_MODELS, VERIFIED_PROVIDERS } from "#/utils/verified-models";
import { extractModelAndProvider } from "#/utils/extract-model-and-provider";
import { isFreeModel } from "#/utils/is-free-model";
import { ModelInfoBadge } from "#/components/features/settings/model-info-badge";
import { OpenRouterInfo } from "./openrouter-info";

interface ModelSelectorProps {
  isDisabled?: boolean;
  models: Record<string, { separator: string; models: string[] }>;
  currentModel?: string;
}

export function ModelSelector({
  isDisabled,
  models,
  currentModel,
}: ModelSelectorProps) {
  const [, setLitellmId] = React.useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = React.useState<string | null>(
    null,
  );
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (currentModel) {
      // runs when resetting to defaults
      const { provider, model } = extractModelAndProvider(currentModel);

      setLitellmId(currentModel);
      setSelectedProvider(provider);
      setSelectedModel(model);
    }
  }, [currentModel]);

  const handleChangeProvider = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedModel(null);

    const separator = models[provider]?.separator || "";
    setLitellmId(provider + separator);
  };

  const handleChangeModel = (model: string) => {
    const separator = models[selectedProvider || ""]?.separator || "";
    let fullModel = selectedProvider + separator + model;
    if (selectedProvider === "openai") {
      // LiteLLM lists OpenAI models without the openai/ prefix
      fullModel = model;
    }
    setLitellmId(fullModel);
    setSelectedModel(model);
  };

  const clear = () => {
    setSelectedProvider(null);
    setLitellmId(null);
  };

  const { t } = useTranslation();

  // Function to get the full model ID
  const getFullModelId = (provider: string, model: string): string => {
    const separator = models[provider]?.separator || "";
    if (provider === "openai") {
      return model; // OpenAI models don't have a prefix
    }
    return provider + separator + model;
  };

  return (
    <div className="flex flex-col w-[680px]">
      <div className="flex justify-between gap-[46px]">
        <fieldset className="flex flex-col gap-2.5 w-full">
          <label className="text-sm">{t(I18nKey.LLM$PROVIDER)}</label>
          <Autocomplete
            data-testid="llm-provider-input"
            isRequired
            isVirtualized={false}
            name="llm-provider-input"
            isDisabled={isDisabled}
            aria-label={t(I18nKey.LLM$PROVIDER)}
            placeholder={t(I18nKey.LLM$SELECT_PROVIDER_PLACEHOLDER)}
            isClearable={false}
            onSelectionChange={(e) => {
              if (e?.toString()) handleChangeProvider(e.toString());
            }}
            onInputChange={(value) => !value && clear()}
            defaultSelectedKey={selectedProvider ?? undefined}
            selectedKey={selectedProvider}
            classNames={{
              popoverContent: "bg-tertiary rounded-xl border border-[#717888]",
            }}
            inputProps={{
              classNames: {
                inputWrapper:
                  "bg-tertiary border border-[#717888] h-10 w-full rounded p-2 placeholder:italic",
              },
            }}
          >
            <AutocompleteSection title={t(I18nKey.MODEL_SELECTOR$VERIFIED)}>
              {Object.keys(models)
                .filter((provider) => VERIFIED_PROVIDERS.includes(provider))
                .map((provider) => (
                  <AutocompleteItem
                    data-testid={`provider-item-${provider}`}
                    key={provider}
                  >
                    {mapProvider(provider)}
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
            <AutocompleteSection title={t(I18nKey.MODEL_SELECTOR$OTHERS)}>
              {Object.keys(models)
                .filter((provider) => !VERIFIED_PROVIDERS.includes(provider))
                .map((provider) => (
                  <AutocompleteItem key={provider}>
                    {mapProvider(provider)}
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
          </Autocomplete>
        </fieldset>

        <fieldset className="flex flex-col gap-2.5 w-full">
          <label className="text-sm">{t(I18nKey.LLM$MODEL)}</label>
          <Autocomplete
            data-testid="llm-model-input"
            isRequired
            isVirtualized={false}
            name="llm-model-input"
            aria-label={t(I18nKey.LLM$MODEL)}
            placeholder={t(I18nKey.LLM$SELECT_MODEL_PLACEHOLDER)}
            isClearable={false}
            onSelectionChange={(e) => {
              if (e?.toString()) handleChangeModel(e.toString());
            }}
            isDisabled={isDisabled || !selectedProvider}
            selectedKey={selectedModel}
            defaultSelectedKey={selectedModel ?? undefined}
            classNames={{
              popoverContent: "bg-tertiary rounded-xl border border-[#717888]",
            }}
            inputProps={{
              classNames: {
                inputWrapper:
                  "bg-tertiary border border-[#717888] h-10 w-full rounded p-2 placeholder:italic",
              },
            }}
          >
            <AutocompleteSection title={t(I18nKey.MODEL_SELECTOR$VERIFIED)}>
              {models[selectedProvider || ""]?.models
                .filter((model) => VERIFIED_MODELS.includes(model))
                .map((model) => {
                  const fullModelId = getFullModelId(
                    selectedProvider || "",
                    model,
                  );
                  const modelIsFree = isFreeModel(fullModelId);

                  return (
                    <AutocompleteItem key={model}>
                      <div className="flex items-center justify-between w-full">
                        <span>{model}</span>
                        <ModelInfoBadge isFree={modelIsFree} />
                      </div>
                    </AutocompleteItem>
                  );
                })}
            </AutocompleteSection>
            <AutocompleteSection title={t(I18nKey.MODEL_SELECTOR$OTHERS)}>
              {models[selectedProvider || ""]?.models
                .filter((model) => !VERIFIED_MODELS.includes(model))
                .map((model) => {
                  const fullModelId = getFullModelId(
                    selectedProvider || "",
                    model,
                  );
                  const modelIsFree = isFreeModel(fullModelId);

                  return (
                    <AutocompleteItem
                      data-testid={`model-item-${model}`}
                      key={model}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{model}</span>
                        <ModelInfoBadge isFree={modelIsFree} />
                      </div>
                    </AutocompleteItem>
                  );
                })}
            </AutocompleteSection>
          </Autocomplete>
        </fieldset>
      </div>

      {/* Display OpenRouter information */}
      <OpenRouterInfo />
    </div>
  );
}
