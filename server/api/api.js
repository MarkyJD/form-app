const fs = require('fs').promises;
const FILE = './server/submission.json';
const fields = [
  {
    page_label: 'Test form',
    fields: [
      {
        field_id: 'name',
        field_label: 'Name',
        field_value: '',
        field_mandatory: 'yes',
        field_placeholder: 'Enter your name',
        field_type: 'text',
      },

      {
        field_id: 'email',
        field_label: 'Email address',
        field_value: '',
        field_mandatory: 'yes',
        field_placeholder: 'example@address.com',
        field_type: 'text',
      },
      {
        field_id: 'phone_type',
        field_label: 'Phone Type',
        field_value: '',
        field_mandatory: 'yes',
        field_options: [
          {
            option_label: 'Home',
          },
          {
            option_label: 'Work',
          },
          {
            option_label: 'Mobile',
          },
        ],
        field_type: 'select',
      },
      {
        field_id: 'number',
        field_label: 'Phone Number',
        field_value: '',
        field_mandatory: 'yes',
        field_placeholder: '04xxxxxxxx',
        field_type: 'text',
      },
      {
        field_id: 'subscribe',
        field_label: 'Subscribe',
        field_value: false,
        field_mandatory: '',
        field_placeholder: '',
        field_type: 'checkbox',
      },
    ],
  },
];

async function getSubmission() {
  const submission = await fs.readFile(FILE, 'utf-8');
  return JSON.parse(submission);
}

async function writeSubmission(submission) {
  let data = JSON.stringify(submission, null, 2);
  await fs.writeFile(FILE, data);
  return;
}

module.exports = {
  getFields: () => fields,
  getSubmission,
  writeSubmission,
};
