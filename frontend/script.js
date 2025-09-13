// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'); // Adjust selector to match your form
    if (!form) {
        console.error('Form not found in the DOM');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get input elements and check if they exist
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        // Add other inputs as needed

        if (!nameInput || !emailInput) {
            console.error('Required input fields not found:', {
                nameInput: !!nameInput,
                emailInput: !!emailInput
            });
            return;
        }

        const data = {
            name: nameInput.value || '', // Fallback to empty string if no value
            email: emailInput.value || ''
            // Add other form fields as needed
        };

        try {
            const response = await fetch('https://resume-1-24gr.onrender.com/api/generate_resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
