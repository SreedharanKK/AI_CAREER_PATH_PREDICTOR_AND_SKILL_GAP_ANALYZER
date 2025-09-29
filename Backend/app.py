from flask import Flask
from flask_cors import CORS

# Import your routes (separate files you will create)
from routes.signup import signup_bp
from routes.login import login_bp
from routes.profile import profile_bp

app = Flask(__name__)
CORS(app, supports_credentials=True)  # allow frontend React to connect

# Register Blueprints (each route file will have its own blueprint)
app.register_blueprint(signup_bp, url_prefix="/api/auth")
app.register_blueprint(login_bp, url_prefix="/api/auth")
app.register_blueprint(profile_bp, url_prefix="/api/user")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
