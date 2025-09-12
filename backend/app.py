from flask import Flask, request, render_template, make_response
from flask_cors import CORS, cross_origin # Import cross_origin

app = Flask(__name__)

# No need for global CORS config if you're using the decorator
# CORS(app, origins="https://resume-44cllyxyv-vamsis-projects-151d8ae7.vercel.app")

@app.route("/api/generate_resume", methods=["POST", "OPTIONS"])
@cross_origin(origin="https://resume-44cllyxyv-vamsis-projects-151d8ae7.vercel.app", supports_credentials=True)
def generate_resume():
    if request.method == "OPTIONS":
        # This part handles the preflight OPTIONS request
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = "https://resume-44cllyxyv-vamsis-projects-151d8ae7.vercel.app"
        response.headers['Access-Control-Allow-Methods'] = "POST"
        response.headers['Access-Control-Allow-Headers'] = "Content-Type"
        return response
    
    # Otherwise, handle the POST request
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
