// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded'); // Debug: Confirm DOM is loaded

    // Find the form
    const form = document.querySelector('form');
    if (!form) {
        console.error('Form not found. Ensure your HTML includes a <form> element.');
        console.log('Available elements:', document.querySelectorAll('*').length); // Debug: Count DOM elements
        return;
    }
    console.log('Form found:', form); // Debug: Log form element

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get input elements
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        // Add other inputs as needed

        // Debug: Log all input IDs in the DOM
        console.log('Available input IDs:', Array.from(document.querySelectorAll('input')).map(input => input.id));

        if (!nameInput || !emailInput) {
            console.error('Required input fields not found:', {
                nameInput: !!nameInput,
                emailInput: !!emailInput
            });
            return;
        }

        const data = {
            name: nameInput.value || '',
            email: emailInput.value || ''
            // Add other fields expected by resume_template.html
        };

        console.log('Sending data:', data); // Debug: Log payload

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
