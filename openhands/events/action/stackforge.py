from dataclasses import dataclass
from openhands.core.schema import ActionType
from openhands.events.action.action import Action

@dataclass
class StartStackForgeBuildAction(Action):
    project_name: str
    project_description: str
    supabase_token: str
    cloudflare_token: str
    polar_api_key: str
    action: str = ActionType.START_STACKFORGE_BUILD

    def __str__(self) -> str:
        return f'**StartStackForgeBuildAction** (project_name={self.project_name})'
