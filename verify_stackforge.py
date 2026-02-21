import sys
import os

# Add current directory to path so we can import openhands
sys.path.append(os.getcwd())

try:
    from openhands.core.schema import ActionType
    from openhands.events.action.stackforge import StartStackForgeBuildAction
    from openhands.events.serialization.action import action_from_dict, event_to_dict

    def verify_stackforge_action():
        print("--- Verifying StartStackForgeBuildAction ---")
        
        # 1. Create action
        action = StartStackForgeBuildAction(
            project_name="test-project",
            project_description="test-description",
            supabase_token="sb_test",
            cloudflare_token="cf_test",
            polar_api_key="polar_test"
        )
        print(f"Action created: {action}")
        assert action.action == ActionType.START_STACKFORGE_BUILD
        assert action.project_name == "test-project"

        # 2. Serialize to dict
        data = event_to_dict(action)
        print(f"Serialized data: {data}")
        assert data['action'] == 'start_stackforge_build'
        assert data['args']['project_name'] == "test-project"
        assert data['args']['project_description'] == "test-description"

        # 3. Deserialize from dict
        # We need to simulate the structure expected by action_from_dict
        action_dict = {
            'action': 'start_stackforge_build',
            'args': {
                'project_name': 'test-project',
                'project_description': 'test-description',
                'supabase_token': 'sb_test',
                'cloudflare_token': 'cf_test',
                'polar_api_key': 'polar_test'
            }
        }
        deserialized = action_from_dict(action_dict)
        print(f"Deserialized action: {deserialized}")
        assert isinstance(deserialized, StartStackForgeBuildAction)
        assert deserialized.project_name == "test-project"
        
        print("--- Verification Successful! ---")

    if __name__ == "__main__":
        verify_stackforge_action()

except ImportError as e:
    print(f"Import failed: {e}")
    print("Please make sure dependencies are installed and the script is run from the project root.")
except Exception as e:
    print(f"Verification failed: {e}")
