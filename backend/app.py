from flask import Flask, request, render_template, make_response
from flask_cors import CORS
from weasyprint import HTML
import os

app = Flask(__name__)

# Configure CORS to allow specific origins for all routes
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "https://resume-996zp7en3-vamsis-projects-151d8ae7.vercel.app",
            "https://resume-mocha-five-26.vercel.app",
            "https://resume-ami6dqmbz-vamsis-projects-151d8ae7.vercel.app"  # New frontend origin
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route("/", methods=["GET", "OPTIONS"])
def index():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    # Handle GET request for root
    return {"message": "Welcome to the Resume API"}, 200

@app.route("/api/generate_resume", methods=["POST", "OPTIONS"])
def generate_resume():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    # Handle POST request
    data = request.json
    if not data:
        return {"error": "No data provided"}, 400
    
    try:
        rendered = render_template("resume_template.html", data=data)
        pdf = HTML(string=rendered).write_pdf()
        
        response = make_response(pdf)
        response.headers["Content-Type"] = "application/pdf"
        response.headers["Content-Disposition"] = "attachment; filename=resume.pdf"
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
        return response
    except Exception as e:
        return {"error": f"Failed to generate PDF: {str(e)}"}, 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's PORT env variable
    app.run(host="0.0.0.0", port=port)
