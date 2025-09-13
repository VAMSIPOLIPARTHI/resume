document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // Add education entry
    const addEducationBtn = document.querySelector('#addEducation');
    const educationContainer = document.querySelector('#education');
    if (addEducationBtn && educationContainer) {
        addEducationBtn.addEventListener('click', () => {
            const educationEntry = document.createElement('div');
            educationEntry.className = 'education-entry space-y-4';
            educationEntry.innerHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="degree" placeholder="Degree (e.g., B.S. Computer Science)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <input type="text" name="college" placeholder="College/University (e.g., XYZ University)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <input type="number" name="year" placeholder="Year of Graduation (e.g., 2023)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <input type="number" name="cgpa" placeholder="CGPA/Percentage (optional, e.g., 8.5)" step="0.01" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <button type="button" class="remove-education bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Remove Education</button>
            `;
            educationContainer.insertBefore(educationEntry, addEducationBtn);
            educationEntry.querySelector('.remove-education').addEventListener('click', () => educationEntry.remove());
        });

        educationContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-education')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Add project entry
    const addProjectBtn = document.querySelector('#addProject');
    const projectsContainer = document.querySelector('#projects');
    if (addProjectBtn && projectsContainer) {
        addProjectBtn.addEventListener('click', () => {
            const projectEntry = document.createElement('div');
            projectEntry.className = 'project-entry space-y-4';
            projectEntry.innerHTML = `
                <input type="text" name="project_title" placeholder="Project Title (e.g., E-commerce Platform)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <textarea name="project_description" placeholder="Project Description (use action verbs like 'developed,' 'implemented'; keep concise, 1-2 bullets)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                <input type="text" name="project_tech" placeholder="Tech Stack (e.g., React, Node.js, MongoDB)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <input type="url" name="project_github" placeholder="GitHub Link (optional)" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <button type="button" class="remove-project bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Remove Project</button>
            `;
            projectsContainer.insertBefore(projectEntry, addProjectBtn);
            projectEntry.querySelector('.remove-project').addEventListener('click', () => projectEntry.remove());
        });

        projectsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-project')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Add experience entry
    const addExperienceBtn = document.querySelector('#addExperience');
    const experienceContainer = document.querySelector('#experience');
    if (addExperienceBtn && experienceContainer) {
        addExperienceBtn.addEventListener('click', () => {
            const experienceEntry = document.createElement('div');
            experienceEntry.className = 'experience-entry space-y-4';
            experienceEntry.innerHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="company" placeholder="Company Name (e.g., ABC Corp)" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <input type="text" name="role" placeholder="Role (e.g., Software Engineer Intern)" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <input type="text" name="duration" placeholder="Duration (e.g., Jan 2023 - Jun 2023)" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <textarea name="experience_description" placeholder="Description (use action verbs like 'developed,' 'designed'; keep concise, 1-2 bullets)" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 sm:col-span-2"></textarea>
                </div>
                <button type="button" class="remove-experience bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Remove Experience</button>
            `;
            experienceContainer.insertBefore(experienceEntry, addExperienceBtn);
            experienceEntry.querySelector('.remove-experience').addEventListener('click', () => experienceEntry.remove());
        });

        experienceContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-experience')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Add certification entry
    const addCertificationBtn = document.querySelector('#addCertification');
    const certificationsContainer = document.querySelector('#certifications');
    if (addCertificationBtn && certificationsContainer) {
        addCertificationBtn.addEventListener('click', () => {
            const certificationEntry = document.createElement('div');
            certificationEntry.className = 'certification-entry space-y-4';
            certificationEntry.innerHTML = `
                <input type="text" name="certification" placeholder="Certification (e.g., AWS Certified Developer)" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <button type="button" class="remove-certification bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Remove Certification</button>
            `;
            certificationsContainer.insertBefore(certificationEntry, addCertificationBtn);
            certificationEntry.querySelector('.remove-certification').addEventListener('click', () => certificationEntry.remove());
        });

        certificationsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-certification')) {
                e.target.parentElement.remove();
            }
        });
    }

    const form = document.querySelector('#resumeForm');
    if (!form) {
        console.error('Form not found. Ensure your HTML includes <form id="resumeForm">.');
        return;
    }
    console.log('Form found:', form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Collect education entries
        const educationEntries = document.querySelectorAll('.education-entry');
        const education = Array.from(educationEntries).map(entry => ({
            degree: entry.querySelector('input[name="degree"]').value || '',
            college: entry.querySelector('input[name="college"]').value || '',
            year: entry.querySelector('input[name="year"]').value || '',
            cgpa: entry.querySelector('input[name="cgpa"]').value || ''
        })).filter(edu => edu.degree && edu.college && edu.year);

        // Collect project entries
        const projectEntries = document.querySelectorAll('.project-entry');
        const projects = Array.from(projectEntries).map(entry => {
            const project = {
                title: entry.querySelector('input[name="project_title"]').value || '',
                description: entry.querySelector('textarea[name="project_description"]').value || '',
                tech: entry.querySelector('input[name="project_tech"]').value || ''
            };
            const github = entry.querySelector('input[name="project_github"]').value;
            if (github) project.github = github;
            return project;
        }).filter(proj => proj.title && proj.description && proj.tech);

        // Collect experience entries
        const experienceEntries = document.querySelectorAll('.experience-entry');
        const experience = Array.from(experienceEntries).map(entry => ({
            company: entry.querySelector('input[name="company"]').value || '',
            role: entry.querySelector('input[name="role"]').value || '',
            duration: entry.querySelector('input[name="duration"]').value || '',
            description: entry.querySelector('textarea[name="experience_description"]').value || ''
        })).filter(exp => exp.company || exp.role || exp.duration || exp.description);

        // Collect certification entries
        const certificationEntries = document.querySelectorAll('input[name="certification"]');
        const certifications = Array.from(certificationEntries)
            .map(input => input.value)
            .filter(cert => cert.trim());

        // Collect form data
        const data = {
            name: document.querySelector('#name').value || '',
            email: document.querySelector('#email').value || '',
            phone: document.querySelector('#phone').value || '',
            education: education,
            skills: {
                technical: document.querySelector('#technical_skills').value || ''
            },
            projects: projects
        };

        // Optional fields
        const linkedin = document.querySelector('#linkedin').value;
        const github = document.querySelector('#github').value;
        const portfolio = document.querySelector('#portfolio').value;
        const summary = document.querySelector('#summary').value;
        const tools = document.querySelector('#tools').value;
        const softSkills = document.querySelector('#soft_skills').value;

        if (linkedin) data.linkedin = linkedin;
        if (github) data.github = github;
        if (portfolio) data.portfolio = portfolio;
        if (summary) data.summary = summary;
        if (tools) data.skills.tools = tools;
        if (softSkills) data.skills.soft = softSkills;
        if (experience.length > 0) data.experience = experience;
        if (certifications.length > 0) data.certifications = certifications;

        console.log('Sending ATS-optimized data:', data);
        console.log('Tip: Include job-specific keywords in summary, skills, projects, and experience. Keep descriptions concise (1-2 bullets) to fit one page.');

        try {
            const response = await fetch('https://resume-1-24gr.onrender.com/api/generate_resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});
