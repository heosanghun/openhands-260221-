import subprocess
import os

def check_deploy_tools():
    print("--- Checking Deployment Tools ---")
    
    # 1. Check Wrangler
    try:
        result = subprocess.run(["wrangler", "--version"], capture_output=True, text=True, shell=True)
        print(f"Wrangler version: {result.stdout.strip()}")
    except Exception as e:
        print(f"Wrangler check failed: {e}")
        
    # 2. Check Node/NPM
    try:
        node_ver = subprocess.run(["node", "--version"], capture_output=True, text=True, shell=True)
        print(f"Node version: {node_ver.stdout.strip()}")
    except Exception as e:
        print(f"Node check failed: {e}")

    print("--- Check Complete ---")

if __name__ == "__main__":
    check_deploy_tools()
