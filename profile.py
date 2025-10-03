from flask import Blueprint, request, jsonify
from db_config import get_db_connection
import jwt
from config import SECRET_KEY

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/profile", methods=["GET"])
def get_profile():
    token = request.cookies.get("token")

    if not token:
        return jsonify({"error": "Not logged in"}), 401

    try:
        # 🔑 Decode JWT
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = data["user_id"]

        # 🔎 Fetch user from DB
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT full_name FROM users_auth WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"fullName": user["full_name"]})

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Session expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
