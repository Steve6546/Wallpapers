import React from "react";
import { useTranslation } from "react-i18next";

interface ApiKeyErrorInfoProps {
  visible: boolean;
}

export function ApiKeyErrorInfo({ visible }: ApiKeyErrorInfoProps) {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <div className="mt-2 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md text-sm text-red-800 dark:text-red-200">
      <h3 className="font-semibold mb-1">{t("API_KEY_ERROR$TITLE")}</h3>
      <p className="mb-2">{t("API_KEY_ERROR$DESCRIPTION")}</p>
      <ul className="list-disc pl-5 mb-2">
        <li>{t("API_KEY_ERROR$CHECK_CORRECT_KEY")}</li>
        <li>{t("API_KEY_ERROR$CHECK_CREDITS")}</li>
        <li>{t("API_KEY_ERROR$TRY_FREE_MODEL")}</li>
      </ul>
      <p>
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-700 dark:text-red-300 hover:underline font-medium"
        >
          {t("API_KEY_ERROR$CHECK_ACCOUNT")}
        </a>
      </p>
    </div>
  );
}
