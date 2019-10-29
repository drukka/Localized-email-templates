const Email = require('email-templates');

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
  views: {
    options: {
      extension: 'hbs'
    }
  }
});

email.send({
  template: `${__dirname}/templates/greeting`,
  message: {
    to: 'recipient@example.com'
  },
  locals: {
    name: 'Adam'
  }
});