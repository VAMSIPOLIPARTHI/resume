from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from weasyprint import HTML
import io

app = Flask(__name__)
CORS(app)  # <-- enable CORS for all routes

@app.route("/api/generate_resume", methods=["POST"])
def generate_resume():
    data = request.json
    resume_html = f"""
    <h1>{data['name']}</h1>
    <p>Email: {data['email']}</p>
    <p>Phone: {data['phone']}</p>
    <h2>Education</h2>
    <p>{data['education']}</p>
    <h2>Skills</h2>
    <p>{data['skills']}</p>
    <h2>Projects</h2>
    <p>{data['projects']}</p>
    """

    pdf_file = io.BytesIO()
    HTML(string=resume_html).write_pdf(pdf_file)
    pdf_file.seek(0)

    return send_file(pdf_file, as_attachment=True, download_name="resume.pdf")
