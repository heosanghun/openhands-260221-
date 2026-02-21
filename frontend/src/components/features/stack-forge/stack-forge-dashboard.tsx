import React from "react";
import { useConversationWebSocket } from "#/contexts/conversation-websocket-context";
import ActionType from "#/types/action-type";

interface StackForgeDashboardProps {
  // Add props if needed
}

export const StackForgeDashboard: React.FC<StackForgeDashboardProps> = () => {
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [supabaseToken, setSupabaseToken] = React.useState("");
  const [cloudflareToken, setCloudflareToken] = React.useState("");
  const [polarApiKey, setPolarApiKey] = React.useState("");
  const [isBuilding, setIsBuilding] = React.useState(false);

  const webSocket = useConversationWebSocket();

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
      },
    };

    webSocket.sendMessage(action as any);
    console.log("Sent START_STACKFORGE_BUILD action:", action);
    // Notification for the user
    setTimeout(() => {
        alert("🔥 StackForge 빌드가 시작되었습니다. 터미널의 로그를 확인해주세요!");
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-950 text-slate-100 p-8 overflow-y-auto">
      <div className="max-w-2xl w-full space-y-8 bg-slate-900/50 p-10 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2">
            STACKFORGE
          </h1>
          <p className="text-slate-400">인프라와 코드를 벼려내는 강력한 대장간</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="project-name" className="block text-sm font-medium text-slate-300">
              프로젝트 이름
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-awesome-saas"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="project-description" className="block text-sm font-medium text-slate-300">
              구축하고 싶은 서비스 설명 (프롬프트)
            </label>
            <textarea
              id="project-description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="예: 이름, 생년월일, 태어난 시를 입력받아 사주팔자를 풀이해주고 이메일로 발송해주는 서비스"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-white placeholder-slate-500 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="supabase-token" className="block text-sm font-medium text-slate-300">
              Supabase Access Token
            </label>
            <input
              id="supabase-token"
              type="password"
              value={supabaseToken}
              onChange={(e) => setSupabaseToken(e.target.value)}
              placeholder="sbp_..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cloudflare-token" className="block text-sm font-medium text-slate-300">
              Cloudflare API Token
            </label>
            <input
              id="cloudflare-token"
              type="password"
              value={cloudflareToken}
              onChange={(e) => setCloudflareToken(e.target.value)}
              placeholder="Cloudflare API Token"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="polar-key" className="block text-sm font-medium text-slate-300">
              Polar API Key
            </label>
            <input
              id="polar-key"
              type="password"
              value={polarApiKey}
              onChange={(e) => setPolarApiKey(e.target.value)}
              placeholder="polar_..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-white placeholder-slate-500"
            />
          </div>

          <button
            onClick={handleBuildStart}
            disabled={isBuilding || !projectName}
            className={`w-full py-4 mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-200 ${
              (isBuilding || !projectName) ? "opacity-50 cursor-not-allowed grayscale" : ""
            }`}
          >
            {isBuilding ? "⚒️ 대장간 가동 중..." : "🔥 StackForge 빌드 시작"}
          </button>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <p className="text-xs text-center text-slate-500">
            StackForge는 입력하신 API 키를 안전하게 사용하여 인프라를 자동으로 구축합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
