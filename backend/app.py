from flask import Flask, request, render_template, make_response
from flask_cors import CORS, cross_origin
from weasyprint import HTML

app = Flask(__name__)

# Allow multiple origins
CORS(app, origins=[
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://resume-44cllyxyv-vamsis-projects-151d8ae7.vercel.app"
])

@app.route("/api/generate_resume", methods=["POST"])
def generate_resume():
    data = request.json
    
    rendered = render_template("resume_template.html", data=data)
    pdf = HTML(string=rendered).write_pdf()
    
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=resume.pdf'
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
