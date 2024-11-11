require('dotenv').config();

const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

const imap = new Imap({
  user: process.env.IMAP_USER,        // Replace with your email
  password: process.env.IMAP_PASSWORD,       // Replace with your email password
  host: process.env.IMAP_HOST,              // Replace with your email provider's IMAP server
  port: process.env.IMAP_PORT,                             // IMAP port (usually 993 for SSL)
  tls: true                              // Enable TLS for secure connection
});

// Open the inbox and fetch emails
const openInbox = (callback) => {
  imap.openBox('INBOX', true, callback);
};

// Helper function to save email content to a JSON file with an index number
const saveEmailToFile = (emailData, emailIndex) => {
  const filePath = path.join(__dirname, 'emails', `${emailIndex}.json`);
  fs.writeFileSync(filePath, JSON.stringify(emailData, null, 2), 'utf8');
  console.log(`Saved email to ${filePath}`);
};

// Ensure the 'emails' directory exists
if (!fs.existsSync(path.join(__dirname, 'emails'))) {
  fs.mkdirSync(path.join(__dirname, 'emails'));
}

imap.once('ready', () => {
  openInbox((err, box) => {
    if (err) throw err;
    console.log(`Total messages: ${box.messages.total}`);

    // Only fetch emails if there are messages in the inbox
    if (box.messages.total === 0) {
      console.log('No messages found in the inbox.');
      imap.end();
      return;
    }

    // Fetch the last 10 messages in descending order
    const start = box.messages.total;
    const end = Math.max(box.messages.total - 9, 1); // Adjust to fetch up to 10 emails
    console.log(end)
    const fetchRange = `${start}:${end}`;

    const fetch = imap.seq.fetch(fetchRange, {
      bodies: '',
      struct: true
    });

    fetch.on('message', (msg, seqno) => {
      console.log(`\nMessage #${seqno}`);
      msg.on('body', async (stream) => {
        const parsed = await simpleParser(stream);

        // Save email data to a JSON file with an index number
        saveEmailToFile(parsed, seqno);
      });
    });

    fetch.once('end', () => {
      console.log('Done fetching emails.');
      imap.end();
    });
  });
});

imap.once('error', (err) => {
  console.error('IMAP error:', err);
});

imap.once('end', () => {
  console.log('Connection ended.');
});

imap.connect();