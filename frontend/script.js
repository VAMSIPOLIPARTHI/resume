document.getElementById("resumeForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        education: this.education.value,
        skills: this.skills.value,
        projects: this.projects.value
    };

    let response = await fetch("https://resume-1-24gr.onrender.com/api/generate_resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        let blob = await response.blob();
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "resume.pdf";
        link.click();
    } else {
        alert("Error generating resume!");
    }
});
