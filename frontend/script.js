// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded'); // Debug: Confirm DOM is loaded

    // Find the form
    const form = document.querySelector('#resumeForm');
    if (!form) {
        console.error('Form not found. Ensure your HTML includes a <form id="resumeForm"> element.');
        console.log('Available elements:', document.querySelectorAll('*').length);
        return;
    }
    console.log('Form found:', form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get input elements
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const phoneInput = document.querySelector('#phone');
        const educationInput = document.querySelector('#education');
        const skillsInput = document.querySelector('#skills');
        const projectsInput = document.querySelector('#projects');

        // Debug: Log all input IDs
        console.log('Available input IDs:', Array.from(document.querySelectorAll('input, textarea')).map(el => el.id));

        // Check if all inputs exist
        if (!nameInput || !emailInput || !phoneInput || !educationInput || !skillsInput || !projectsInput) {
            console.error('Required input fields not found:', {
                nameInput: !!nameInput,
                emailInput: !!emailInput,
                phoneInput: !!phoneInput,
                educationInput: !!educationInput,
                skillsInput: !!skillsInput,
                projectsInput: !!projectsInput
            });
            return;
        }

        const data = {
            name: nameInput.value || '',
            email: emailInput.value || '',
            phone: phoneInput.value || '',
            education: educationInput.value || '',
            skills: skillsInput.value || '',
            projects: projectsInput.value || ''
        };

        console.log('Sending data:', data);

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
