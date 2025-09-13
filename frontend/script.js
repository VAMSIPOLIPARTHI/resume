// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // Add project entry dynamically
    const addProjectBtn = document.querySelector('#addProject');
    const projectsContainer = document.querySelector('#projects');
    if (addProjectBtn && projectsContainer) {
        addProjectBtn.addEventListener('click', () => {
            const projectEntry = document.createElement('div');
            projectEntry.className = 'project-entry';
            projectEntry.innerHTML = `
                <input type="text" name="project_title" placeholder="Project Title (e.g., E-commerce Platform)" required>
                <textarea name="project_description" placeholder="Project Description (use action verbs like 'developed,' 'implemented')" required></textarea>
                <input type="text" name="project_tech" placeholder="Tech Stack (e.g., React, Node.js, MongoDB)" required>
                <input type="url" name="project_github" placeholder="GitHub Link (optional)">
                <input type="url" name="project_portfolio" placeholder="Portfolio/Link (optional)">
                <button type="button" class="remove-project">Remove Project</button>
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

    const form = document.querySelector('#resumeForm');
    if (!form) {
        console.error('Form not found. Ensure your HTML includes <form id="resumeForm">.');
        return;
    }
    console.log('Form found:', form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Collect project entries
        const projectEntries = document.querySelectorAll('.project-entry');
        const projects = Array.from(projectEntries).map(entry => {
            const project = {
                title: entry.querySelector('input[name="project_title"]').value || '',
                description: entry.querySelector('textarea[name="project_description"]').value || '',
                tech: entry.querySelector('input[name="project_tech"]').value || ''
            };
            const github = entry.querySelector('input[name="project_github"]').value;
            const portfolio = entry.querySelector('input[name="project_portfolio"]').value;
            if (github) project.github = github;
            if (portfolio) project.portfolio = portfolio;
            return project;
        });

        // Collect form data
        const data = {
            name: document.querySelector('#name').value || '',
            email: document.querySelector('#email').value || '',
            phone: document.querySelector('#phone').value || '',
            education: {
                degree: document.querySelector('#degree').value || '',
                college: document.querySelector('#college').value || '',
                year: document.querySelector('#year').value || ''
            },
            skills: {
                technical: document.querySelector('#technical_skills').value || ''
            },
            projects: projects
        };

        // Optional fields
        const linkedin = document.querySelector('#linkedin').value;
        const github = document.querySelector('#github').value;
        const cgpa = document.querySelector('#cgpa').value;
        const softSkills = document.querySelector('#soft_skills').value;
        const experience = {
            company: document.querySelector('#company').value || '',
            role: document.querySelector('#role').value || '',
            duration: document.querySelector('#duration').value || '',
            description: document.querySelector('#experience_description').value || ''
        };
        const certifications = document.querySelector('#certifications').value;
        const languages = document.querySelector('#languages').value;
        const interests = document.querySelector('#interests').value;

        if (linkedin) data.linkedin = linkedin;
        if (github) data.github = github;
        if (cgpa) data.education.cgpa = cgpa;
        if (softSkills) data.skills.soft = softSkills;
        if (experience.company || experience.role || experience.duration || experience.description) {
            data.experience = experience;
        }
        if (certifications) data.certifications = certifications;
        if (languages || interests) {
            data.other = {};
            if (languages) data.other.languages = languages;
            if (interests) data.other.interests = interests;
        }

        console.log('Sending ATS-optimized data:', data);
        console.log('Tip: Include job-specific keywords in skills, projects, and experience for a high ATS score.');

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
