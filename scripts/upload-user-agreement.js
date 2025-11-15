const fs = require('fs');
const path = require('path');

// Read the full legal content
const legalContent = fs.readFileSync(
  path.join(__dirname, '../public/locales/ru/legal_full.json'),
  'utf8'
);

const data = JSON.parse(legalContent);

// Prepare the request body
const requestBody = {
  type: 'user-agreement',
  locale: 'ru',
  title: data.userAgreement.title,
  content: data.userAgreement.content,
  version: '1.0',
  isActive: true
};

// Make the API call
fetch('http://localhost:4000/api/legal/upsert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody)
})
  .then(response => response.json())
  .then(result => {
    console.log('✅ User Agreement uploaded successfully!');
    console.log('Document ID:', result._id);
    console.log('Type:', result.type);
    console.log('Locale:', result.locale);
    console.log('Title:', result.title);
    console.log('Content length:', result.content?.length || 0, 'characters');
    console.log('Version:', result.version);
    console.log('Is Active:', result.isActive);
  })
  .catch(error => {
    console.error('❌ Error uploading User Agreement:', error);
  });
