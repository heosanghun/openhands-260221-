import sys
print("Python path:", sys.path)
try:
    import openhands.server.listen
    print("Successfully imported openhands.server.listen")
    print("App:", openhands.server.listen.app)
except Exception as e:
    print("Error importing app:", e)
    import traceback
    traceback.print_exc()
