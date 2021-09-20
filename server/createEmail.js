const fs = require('fs');
const Path = require('path');

const STYLE_TAG = '%STYLE%';
const CONTENT_TAG = '%CONTENT%';

function getFile(relativePath) {
  return new Promise((resolve, reject) => {
    const path = Path.join(__dirname, relativePath);

    return fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err);
      return resolve(file);
    });
  });
}

function createEmail(content) {
  return Promise.all([
    getFile('./public/inlined.css'),
    getFile('./public/email.html')
  ])
    .then(([style, template]) => {
      let emailHTML = template;
      emailHTML = emailHTML.replace(CONTENT_TAG, content);
      emailHTML = emailHTML.replace(STYLE_TAG, style);

      return emailHTML;
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = createEmail;
