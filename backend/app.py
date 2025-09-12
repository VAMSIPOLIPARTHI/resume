from flask import Flask, request, render_template, make_response
from flask_cors import CORS
from weasyprint import HTML

app = Flask(__name__)

# This is the correct way to specify your frontend's URL
# The URL MUST match exactly, including 'https://'
FRONTEND_URL = "https://resume-kd223rxhx-vamsis-projects-151d8ae7.vercel.app"
CORS(app, origins=FRONTEND_URL)

@app.route("/api/generate_resume", methods=["POST"])
def generate_resume():
    data = request.json

    # ... (rest of your code) ...
    rendered = render_template("resume_template.html", data=data)
    pdf = HTML(string=rendered).write_pdf()

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=resume.pdf'
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
