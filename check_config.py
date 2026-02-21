import os
from openhands.app_server.config import config_from_env

os.environ['RUNTIME'] = 'local'
os.environ['SANDBOX_TYPE'] = 'local'
config = config_from_env()
print(f"Sandbox injector: {config.sandbox}")
print(f"Sandbox spec injector: {config.sandbox_spec}")
