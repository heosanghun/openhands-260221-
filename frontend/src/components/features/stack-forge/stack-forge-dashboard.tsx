import React from "react";
import { useTranslation } from "react-i18next";
import { useConversationWebSocket } from "#/contexts/conversation-websocket-context";
import ActionType from "#/types/action-type";

import { I18nKey } from "#/i18n/declaration";

interface StackForgeDashboardProps {
  // Add props if needed
}

interface StackForgeDashboardProps {
  // Add props if needed
}

export const StackForgeDashboard: React.FC<StackForgeDashboardProps> = () => {
  const { t, i18n } = useTranslation();
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [supabaseToken, setSupabaseToken] = React.useState("");
  const [cloudflareToken, setCloudflareToken] = React.useState("");
  const [polarApiKey, setPolarApiKey] = React.useState("");
  const [githubToken, setGithubToken] = React.useState("");
  const [gcpProjectId, setGcpProjectId] = React.useState("");
  const [gcpCredentialsJson, setGcpCredentialsJson] = React.useState("");
  const [isBuilding, setIsBuilding] = React.useState(false);
  const [isDark, setIsDark] = React.useState(true);

  const webSocket = useConversationWebSocket();

  const toggleLanguage = () => {
    const currentLng = i18n.resolvedLanguage || i18n.language || "ko-KR";
    const nextLng = currentLng.startsWith("ko") ? "en" : "ko-KR";
    i18n.changeLanguage(nextLng);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleBuildStart = () => {
    if (!webSocket) {
      alert("WebSocket connection is not available.");
      return;
    }

    setIsBuilding(true);
    const action = {
      action: ActionType.START_STACKFORGE_BUILD,
      args: {
        project_name: projectName,
        project_description: projectDescription,
        supabase_token: supabaseToken,
        cloudflare_token: cloudflareToken,
        polar_api_key: polarApiKey,
        github_token: githubToken,
        gcp_project_id: gcpProjectId,
        gcp_credentials_json: gcpCredentialsJson,
      },
    };

    webSocket.sendMessage(action as any);
    console.log("Sent START_STACKFORGE_BUILD action:", action);
    // Notification for the user
    setTimeout(() => {
      alert(t(I18nKey.STACKFORGE$BUILD_STARTED_ALERT));
    }, 500);
  };

  return (
    <div
      className={`flex flex-col items-center h-full w-full ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} p-8 overflow-y-auto pt-16 transition-colors duration-300`}
    >
      <div className="flex justify-end w-full max-w-2xl mb-4 gap-2">
        <button
          onClick={toggleLanguage}
          className={`px-3 py-1 text-xs font-medium border ${isDark ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-200"} rounded-full transition-colors`}
        >
          {(i18n.resolvedLanguage || i18n.language || "ko-KR").startsWith("ko")
            ? "English"
            : "한국어"}
        </button>
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 text-xs font-medium border ${isDark ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-200"} rounded-full transition-colors`}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div
        className={`max-w-2xl w-full my-auto space-y-8 ${isDark ? "bg-slate-900/50" : "bg-white"} p-10 rounded-2xl border ${isDark ? "border-slate-800" : "border-slate-200"} shadow-2xl backdrop-blur-sm mb-12`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2">
            {t(I18nKey.STACKFORGE$TITLE)}
          </h1>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            {t(I18nKey.STACKFORGE$SUBTITLE)}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="project-name"
              className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(I18nKey.STACKFORGE$PROJECT_NAME_LABEL)}
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-awesome-saas"
              className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="project-description"
              className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(I18nKey.STACKFORGE$PROJECT_DESCRIPTION_LABEL)}
            </label>
            <textarea
              id="project-description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder={t(
                I18nKey.STACKFORGE$PROJECT_DESCRIPTION_PLACEHOLDER,
              )}
              className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none min-h-[100px]`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="supabase-token"
              className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(I18nKey.STACKFORGE$SUPABASE_TOKEN_LABEL)}
            </label>
            <input
              id="supabase-token"
              type="password"
              value={supabaseToken}
              onChange={(e) => setSupabaseToken(e.target.value)}
              placeholder="sbp_..."
              className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="cloudflare-token"
              className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(I18nKey.STACKFORGE$CLOUDFLARE_TOKEN_LABEL)}
            </label>
            <input
              id="cloudflare-token"
              type="password"
              value={cloudflareToken}
              onChange={(e) => setCloudflareToken(e.target.value)}
              placeholder="Cloudflare API Token"
              className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="polar-key"
              className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(I18nKey.STACKFORGE$POLAR_KEY_LABEL)}
            </label>
            <input
              id="polar-key"
              type="password"
              value={polarApiKey}
              onChange={(e) => setPolarApiKey(e.target.value)}
              placeholder="polar_..."
              className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="github-token"
              className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(I18nKey.STACKFORGE$GITHUB_TOKEN_LABEL)}
            </label>
            <input
              id="github-token"
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_..."
              className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none`}
            />
          </div>

          <div
            className={`pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
          >
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              {t(I18nKey.STACKFORGE$GCP_SECTION_TITLE)}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="gcp-project-id"
                  className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  {t(I18nKey.STACKFORGE$GCP_PROJECT_ID_LABEL)}
                </label>
                <input
                  id="gcp-project-id"
                  type="text"
                  value={gcpProjectId}
                  onChange={(e) => setGcpProjectId(e.target.value)}
                  placeholder="my-gcp-project-123"
                  className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none`}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="gcp-creds"
                  className={`block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  {t(I18nKey.STACKFORGE$GCP_CREDS_LABEL)}
                </label>
                <textarea
                  id="gcp-creds"
                  value={gcpCredentialsJson}
                  onChange={(e) => setGcpCredentialsJson(e.target.value)}
                  placeholder='{ "type": "service_account", ... }'
                  className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400"} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none min-h-[80px] font-mono text-xs`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleBuildStart}
            disabled={isBuilding || !projectName}
            className={`w-full py-4 mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-200 ${
              isBuilding || !projectName
                ? "opacity-50 cursor-not-allowed grayscale"
                : ""
            }`}
          >
            {isBuilding
              ? t(I18nKey.STACKFORGE$BUILD_BUTTON_WORKING)
              : t(I18nKey.STACKFORGE$BUILD_BUTTON_IDLE)}
          </button>
        </div>

        <div
          className={`pt-6 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
        >
          <p
            className={`text-xs text-center ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            {t(I18nKey.STACKFORGE$FOOTER_TEXT)}
          </p>
        </div>
      </div>
    </div>
  );
};
