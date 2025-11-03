// Final permission fix
// Re-deploying to get new database permissions
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const axios = require("axios");

// Initialize Firebase Admin so we can talk to Firestore
admin.initializeApp();

// Define the name of the secret we created in the vault
const RECAPTCHA_SECRET_KEY_NAME = "RECAPTCHA_SECRET_KEY";

// --- This is your new backend function ---
exports.sendContactEmail = onCall({
  secrets: [RECAPTCHA_SECRET_KEY_NAME], // Give this function access to the secret
  cors: ["https://barlowailabs.web.app", "https://barlowailabs.com", "http://localhost:5000"], // Allow requests from your domain and localhost
  maxInstances: 10,
}, async (request) => {
  
  // 1. Get the data from the form
  const name = request.data.name;
  const email = request.data.email;
  const subject = request.data.subject;
  const message = request.data.message;
  const recaptchaToken = request.data.recaptchaToken;

  // 2. Get the secret key from the vault
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    console.error("Could not access secret key.");
    throw new HttpsError("internal", "Could not access secret key.");
  }

  // 3. Verify the reCAPTCHA token
  let verificationResponse;
  try {
    verificationResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`
    );
  } catch (error) {
    console.error("Failed to verify reCAPTCHA:", error);
    throw new HttpsError("internal", "Failed to verify reCAPTCHA.");
  }

  if (!verificationResponse.data.success) {
    console.warn("reCAPTCHA verification failed:", verificationResponse.data);
    throw new HttpsError(
      "invalid-argument",
      "reCAPTCHA verification failed."
    );
  }

  // 4. reCAPTCHA is valid! Get ready to send emails.
  const firestore = getFirestore();

  // --- Email 1: Auto-reply to the User ---
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScsGNySFzLaWvSRbq9SJbsoU32LFleLB2jwJitu7xT9Nr_qVw/viewform?usp=header";
  
  const autoReply = {
    to: [email],
    message: {
      subject: "Thank you for contacting Barlow AI Labs!",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <p>Dear ${name},</p>
            <p>Thank you for contacting Barlow AI Labs for your web development needs!</p>
            <p>Please complete our brief questionnaire: <a href="${googleFormLink}" style="color: #007bff;">Click here to fill the form</a></p>
            <p>We look forward to collaborating with you!</p>
            <div style="padding-top: 20px;">Best regards,<br>Barlow AI Labs</div>
        </div>
      `,
    },
  };

  // --- Email 2: Notification to You (the Admin) ---
  const adminNotification = {
    to: ["tevin@barlowailabs.com"],
    replyTo: email, // So you can "Reply" directly to the user
    message: {
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <p><strong>New message from:</strong> ${name} (${email})</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    },
  };

  // 5. Add both emails to the "mail" collection for the extension to send
  try {
    // We get a reference to the 'mail' collection
    const mailCollection = firestore.collection("mail");
    
    // Add both emails as new documents
    await mailCollection.add(autoReply);
    await mailCollection.add(adminNotification);

  } catch (error) {
    console.error("Failed to queue emails:", error);
    throw new HttpsError("internal", "Failed to queue emails.");
  }

  // 6. Send a success message back to the website
  return { message: "Your message has been sent successfully!" };
});