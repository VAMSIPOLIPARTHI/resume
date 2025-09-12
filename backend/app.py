from flask import Flask, request, render_template, make_response
from flask_cors import CORS
from weasyprint import HTML

app = Flask(__name__)
CORS(app)

@app.route("/api/generate_resume", methods=["POST"])
def generate_resume():
    data = request.json

    # Render resume HTML
    rendered = render_template("resume_template.html", data=data)

    # Convert to PDF
    pdf = HTML(string=rendered).write_pdf()

    # Send back as response
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=resume.pdf'
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
