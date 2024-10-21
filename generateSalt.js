const bcrypt = require('bcrypt');

async function generateSalt() {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Generated salt:', salt);
    } catch (err) {
        console.error('Error generating salt:', err);
    }
}

// Call the function to generate salt
generateSalt();
