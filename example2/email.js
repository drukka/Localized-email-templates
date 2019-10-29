const Email = require('email-templates');
const fs = require('fs');

const email = new Email({
  message: {
    from: 'sender@example.com'
  },
  preview: false,
  transport: {
    host: YOUR_SMTP_HOST,
    port: YOUR_SMTP_PORT,
    secure: true,
    auth: {
      user: YOUR_SMTP_USER,
      pass: YOUR_SMTP_PASSWORD
    }
  },
  send: true, // set this to true to send out the emails in dev/test env
  render: (view, locals) => {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/templates/${view}.hbs`, 'utf8', (err, file) => {
        if (err) {
          return reject(err);
        }

        const handlebars = require('handlebars');
        const i18n = require('i18n');

        i18n.configure({
          locales: ['en', 'de'],
          directory: `${__dirname}/locales`,
          defaultLocale: 'en'
        });
        i18n.setLocale(locals.language);

        handlebars.registerHelper('__', (str, ...params) => {
          return i18n.__(str, ...params);
        });

        const template = handlebars.compile(file, {
          noEscape: true
        });

        email.juiceResources(template(locals)).then(html => {
          resolve(html);
        });
      });
    });
  }
});

email.send({
  template: `greeting`,
  message: {
    to: 'recipient@example.com'
  },
  locals: {
    name: 'Adam',
    language: 'de'
  }
});