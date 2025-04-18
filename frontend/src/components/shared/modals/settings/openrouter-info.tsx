import React from "react";
import { useTranslation } from "react-i18next";

export function OpenRouterInfo() {
  const { t } = useTranslation();

  return (
    <div className="mt-4 p-4 bg-base-tertiary rounded-md text-sm">
      <h3 className="font-semibold mb-2">{t("OPENROUTER_INFO$TITLE")}</h3>
      <p className="mb-2">{t("OPENROUTER_INFO$DESCRIPTION")}</p>
      <p className="mb-2">
        <strong>{t("OPENROUTER_INFO$FREE_MODELS_TITLE")}</strong>{" "}
        {t("OPENROUTER_INFO$FREE_MODELS_DESCRIPTION")}
      </p>
      <p className="mb-2">
        <strong>{t("OPENROUTER_INFO$PAID_MODELS_TITLE")}</strong>{" "}
        {t("OPENROUTER_INFO$PAID_MODELS_DESCRIPTION")}
      </p>
      <p>
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {t("OPENROUTER_INFO$GET_API_KEY")}
        </a>
      </p>
    </div>
  );
}
