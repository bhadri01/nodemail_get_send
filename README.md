# Email Management Project

> This project provides functionality to send and receive emails using Node.js. It uses nodemailer for sending emails via SMTP and imap for fetching emails via IMAP.

## Setup

- Clone the repository.
- Install dependencies:
```
npm install
```
- Create a `.env` file in the root directory with the following content:
```
# SMTP
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
# IMAP
IMAP_USER=your_imap_user
IMAP_PASSWORD=your_imap_password
IMAP_HOST=your_imap_host
IMAP_PORT=your_imap_port
```

## Usage
## Sending Emails

>To send an email, modify the sendEmail.js file to include the sender and recipient addresses, then run the script:
```
node sendEmail.js
```


## Fetching Emails

>To fetch emails, run the getEmails.js script. This will save the emails to the emails directory as JSON files:
```
node getEmails.js
```