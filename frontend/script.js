// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded'); // Debug: Confirm DOM is loaded
    const form = document.querySelector('form');
    if (!form) {
        console.error('Form not found in the DOM. Check if <form> exists in your HTML.');
        return;
    }

    console.log('Form found:', form); // Debug: Log the form element

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get input elements and check if they exist
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        // Add other inputs as needed

        console.log('Input elements:', { nameInput, emailInput }); // Debug: Log inputs

        if (!nameInput || !emailInput) {
            console.error('Required input fields not found:', {
                nameInput: !!nameInput,
                emailInput: !!emailInput
            });
            console.log('Available IDs in DOM:', Array.from(document.querySelectorAll('input')).map(input => input.id)); // Debug: List all input IDs
            return;
        }

        const data = {
            name: nameInput.value || '',
            email: emailInput.value || ''
            // Add other form fields as needed
        };

        console.log('Sending data:', data); // Debug: Log the data being sent

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
