from flask import Flask, request, render_template, make_response, send_from_directory
from flask_cors import CORS
from weasyprint import HTML
import os

app = Flask(__name__)

# Configure CORS for all routes
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "https://resume-996zp7en3-vamsis-projects-151d8ae7.vercel.app",
            "https://resume-mocha-five-26.vercel.app",
            "https://resume-ami6dqmbz-vamsis-projects-151d8ae7.vercel.app",
            "https://resume-iq84gul0u-vamsis-projects-151d8ae7.vercel.app"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/x-icon')

@app.route("/", methods=["GET", "OPTIONS"])
def index():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    response = make_response({"message": "Welcome to the Resume API"})
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
    return response

@app.route("/api/generate_resume", methods=["POST", "OPTIONS"])
def generate_resume():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    data = request.json
    if not data:
        response = make_response({"error": "No data provided"}, 400)
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        return response
    
    try:
        rendered = render_template("resume_template.html", data=data)
        pdf = HTML(string=rendered).write_pdf()
        
        response = make_response(pdf)
        response.headers["Content-Type"] = "application/pdf"
        response.headers["Content-Disposition"] = "attachment; filename=resume.pdf"
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        return response
    except Exception as e:
        response = make_response({"error": f"Failed to generate PDF: {str(e)}"}, 500)
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        return response

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
