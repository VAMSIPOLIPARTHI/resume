from flask import Flask, request, render_template, make_response
from flask_cors import CORS
from weasyprint import HTML

app = Flask(__name__)

# Configure CORS to allow specific origins and handle preflight requests
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "https://resume-996zp7en3-vamsis-projects-151d8ae7.vercel.app"
        ],
        "methods": ["GET", "POST", "OPTIONS"],  # Allow POST and OPTIONS
        "allow_headers": ["Content-Type", "Authorization"]  # Allow necessary headers
    }
})

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
    rendered = render_template("resume_template.html", data=data)
    pdf = HTML(string=rendered).write_pdf()

    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "attachment; filename=resume.pdf"
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
