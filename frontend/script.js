// script.js
const form = document.querySelector('form'); // Adjust selector to match your form
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const data = {
        name: document.querySelector('#name').value, // Adjust based on your form fields
        email: document.querySelector('#email').value,
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
