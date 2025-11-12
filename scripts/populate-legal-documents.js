/**
 * Script to populate legal documents in the database
 * 
 * Usage:
 * 1. Update the documents array below with actual content
 * 2. Run: node scripts/populate-legal-documents.js
 * 
 * Or use the API directly:
 * curl -X POST http://localhost:3001/api/legal/upsert \
 *   -H "Content-Type: application/json" \
 *   -d @legal-document.json
 */

const documents = [
  // English Documents (.com)
  {
    type: 'user-agreement',
    locale: 'en',
    title: 'User Agreement',
    content: `
      <h2>User Agreement</h2>
      <p>Last updated: ${new Date().toLocaleDateString()}</p>
      
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <h3>2. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p>
      
      <h3>3. Disclaimer</h3>
      <p>The materials on GHRS website are provided on an 'as is' basis. GHRS makes no warranties, expressed or implied.</p>
      
      <p><strong>Note:</strong> Replace this content with actual content from https://ghrs-group.com/rehab/user-agreement</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },
  {
    type: 'consent',
    locale: 'en',
    title: 'Consent to Data Processing',
    content: `
      <h2>Consent to Data Processing</h2>
      <p>Last updated: ${new Date().toLocaleDateString()}</p>
      
      <h3>1. Data Collection</h3>
      <p>We collect information that you provide directly to us when you create an account, make a purchase, or contact us.</p>
      
      <h3>2. Use of Data</h3>
      <p>We use the information we collect to provide, maintain, and improve our services.</p>
      
      <h3>3. Your Rights</h3>
      <p>You have the right to access, correct, or delete your personal data at any time.</p>
      
      <p><strong>Note:</strong> Replace this content with actual content from https://ghrs-group.com/consent</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },
  {
    type: 'privacy-policy',
    locale: 'en',
    title: 'Privacy Policy',
    content: `
      <h2>Privacy Policy</h2>
      <p>Last updated: ${new Date().toLocaleDateString()}</p>
      
      <h3>1. Information We Collect</h3>
      <p>We collect information you provide directly, information collected automatically, and information from third parties.</p>
      
      <h3>2. How We Use Your Information</h3>
      <p>We use your information to provide services, communicate with you, and improve our platform.</p>
      
      <h3>3. Information Sharing</h3>
      <p>We do not sell your personal information. We may share information with service providers and as required by law.</p>
      
      <p><strong>Note:</strong> Replace this content with actual content from https://ghrs-group.com/rehab/privacy-policy</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },

  // Russian Documents (.ru)
  {
    type: 'user-agreement',
    locale: 'ru',
    title: 'Пользовательское соглашение',
    content: `
      <h2>Пользовательское соглашение</h2>
      <p>Последнее обновление: ${new Date().toLocaleDateString('ru-RU')}</p>
      
      <h3>1. Принятие условий</h3>
      <p>Используя данный сервис, вы принимаете и соглашаетесь соблюдать условия настоящего соглашения.</p>
      
      <h3>2. Лицензия на использование</h3>
      <p>Предоставляется разрешение на временную загрузку одной копии материалов для личного некоммерческого использования.</p>
      
      <h3>3. Отказ от ответственности</h3>
      <p>Материалы на сайте GHRS предоставляются «как есть». GHRS не дает никаких гарантий, явных или подразумеваемых.</p>
      
      <p><strong>Примечание:</strong> Замените этот контент фактическим содержимым с https://ghrs-group.ru/polzovatelskoe-soglashenie</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },
  {
    type: 'data-processing',
    locale: 'ru',
    title: 'Обработка персональных данных',
    content: `
      <h2>Согласие на обработку персональных данных</h2>
      <p>Последнее обновление: ${new Date().toLocaleDateString('ru-RU')}</p>
      
      <h3>1. Сбор данных</h3>
      <p>Мы собираем информацию, которую вы предоставляете непосредственно при создании учетной записи, совершении покупки или обращении к нам.</p>
      
      <h3>2. Использование данных</h3>
      <p>Мы используем собранную информацию для предоставления, поддержки и улучшения наших услуг.</p>
      
      <h3>3. Ваши права</h3>
      <p>Вы имеете право на доступ, исправление или удаление ваших персональных данных в любое время.</p>
      
      <p><strong>Примечание:</strong> Замените этот контент фактическим содержимым с https://ghrs-group.ru/obrabotka-personalnyh-dannyh</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },
  {
    type: 'privacy-policy',
    locale: 'ru',
    title: 'Политика конфиденциальности',
    content: `
      <h2>Политика конфиденциальности</h2>
      <p>Последнее обновление: ${new Date().toLocaleDateString('ru-RU')}</p>
      
      <h3>1. Информация, которую мы собираем</h3>
      <p>Мы собираем информацию, которую вы предоставляете напрямую, информацию, собираемую автоматически, и информацию от третьих лиц.</p>
      
      <h3>2. Как мы используем вашу информацию</h3>
      <p>Мы используем вашу информацию для предоставления услуг, общения с вами и улучшения нашей платформы.</p>
      
      <h3>3. Обмен информацией</h3>
      <p>Мы не продаем вашу личную информацию. Мы можем делиться информацией с поставщиками услуг и по требованию закона.</p>
      
      <p><strong>Примечание:</strong> Замените этот контент фактическим содержимым с https://ghrs-group.ru/privacy-policy</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },

  // Georgian Documents
  {
    type: 'user-agreement',
    locale: 'ka',
    title: 'მომხმარებლის შეთანხმება',
    content: `
      <h2>მომხმარებლის შეთანხმება</h2>
      <p>ბოლო განახლება: ${new Date().toLocaleDateString('ka-GE')}</p>
      
      <h3>1. პირობების მიღება</h3>
      <p>ამ სერვისის გამოყენებით, თქვენ ეთანხმებით და იღებთ ამ შეთანხმების პირობებს.</p>
      
      <h3>2. გამოყენების ლიცენზია</h3>
      <p>ნებართვა გაიცემა მასალების ერთი ასლის დროებით ჩამოტვირთვაზე პირადი, არაკომერციული გამოყენებისთვის.</p>
      
      <h3>3. პასუხისმგებლობის უარყოფა</h3>
      <p>GHRS ვებსაიტზე მასალები მოწოდებულია "როგორც არის" საფუძველზე. GHRS არ იძლევა გარანტიებს.</p>
      
      <p><strong>შენიშვნა:</strong> შეცვალეთ ეს შინაარსი რეალური შინაარსით</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },
  {
    type: 'consent',
    locale: 'ka',
    title: 'მონაცემთა დამუშავების თანხმობა',
    content: `
      <h2>მონაცემთა დამუშავების თანხმობა</h2>
      <p>ბოლო განახლება: ${new Date().toLocaleDateString('ka-GE')}</p>
      
      <h3>1. მონაცემთა შეგროვება</h3>
      <p>ჩვენ ვაგროვებთ ინფორმაციას, რომელსაც თქვენ უშუალოდ გვაწვდით.</p>
      
      <h3>2. მონაცემთა გამოყენება</h3>
      <p>ჩვენ ვიყენებთ შეგროვებულ ინფორმაციას სერვისების მიწოდებისთვის.</p>
      
      <h3>3. თქვენი უფლებები</h3>
      <p>თქვენ გაქვთ უფლება ნებისმიერ დროს მოითხოვოთ თქვენი პერსონალური მონაცემების წვდომა, გამოსწორება ან წაშლა.</p>
      
      <p><strong>შენიშვნა:</strong> შეცვალეთ ეს შინაარსი რეალური შინაარსით</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  },
  {
    type: 'privacy-policy',
    locale: 'ka',
    title: 'კონფიდენციალურობის პოლიტიკა',
    content: `
      <h2>კონფიდენციალურობის პოლიტიკა</h2>
      <p>ბოლო განახლება: ${new Date().toLocaleDateString('ka-GE')}</p>
      
      <h3>1. ინფორმაცია, რომელსაც ვაგროვებთ</h3>
      <p>ჩვენ ვაგროვებთ ინფორმაციას, რომელსაც თქვენ უშუალოდ გვაწვდით.</p>
      
      <h3>2. როგორ ვიყენებთ თქვენს ინფორმაციას</h3>
      <p>ჩვენ ვიყენებთ თქვენს ინფორმაციას სერვისების მიწოდებისთვის.</p>
      
      <h3>3. ინფორმაციის გაზიარება</h3>
      <p>ჩვენ არ ვყიდით თქვენს პერსონალურ ინფორმაციას.</p>
      
      <p><strong>შენიშვნა:</strong> შეცვალეთ ეს შინაარსი რეალური შინაარსით</p>
    `,
    version: '1.0',
    effectiveDate: new Date('2025-01-01'),
    isActive: true
  }
];

// Function to populate documents via API
async function populateDocuments() {
  const API_URL = process.env.API_URL || 'http://localhost:3001';
  
  console.log('Starting to populate legal documents...\n');
  
  for (const doc of documents) {
    try {
      const response = await fetch(`${API_URL}/api/legal/upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: doc.type,
          locale: doc.locale,
          data: doc
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully upserted: ${doc.type} (${doc.locale})`);
      } else {
        console.error(`❌ Failed to upsert: ${doc.type} (${doc.locale}) - ${response.statusText}`);
      }
    } catch (error) {
      console.error(`❌ Error upserting ${doc.type} (${doc.locale}):`, error.message);
    }
  }
  
  console.log('\n✨ Population complete!');
}

// Export for use in other scripts or run directly
if (require.main === module) {
  populateDocuments().catch(console.error);
}

module.exports = { documents, populateDocuments };
