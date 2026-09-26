import sys
import os

# Ensure the project root and backend are on sys.path for serverless execution
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.app.main import app

# Export app for Vercel Serverless Function handler
app = app
