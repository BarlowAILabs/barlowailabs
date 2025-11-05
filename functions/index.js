// Final version with added logging for diagnostics
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {getFirestore} = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const axios = require("axios");

// Initialize Firebase Admin
admin.initializeApp();

const RECAPTCHA_SECRET_KEY_NAME = "RECAPTCHA_SECRET_KEY";

exports.sendContactEmail = onCall({
  region: "europe-west4",
  secrets: [RECAPTCHA_SECRET_KEY_NAME],
  maxInstances: 10,
}, async (request) => {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    console.error("CRITICAL: Failed to access reCAPTCHA secret.");
    throw new HttpsError("internal", "A server configuration error occurred.");
  }

  const {name, email, subject, message, recaptchaToken} = request.data;

  try {
    const verificationResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
    );
    if (!verificationResponse.data.success) {
      console.warn("reCAPTCHA verification failed:", verificationResponse.data["error-codes"]);
      throw new HttpsError("invalid-argument", "reCAPTCHA verification failed.");
    }
  } catch (error) {
    console.error("Error during reCAPTCHA POST request:", error);
    throw new HttpsError("internal", "Failed to verify reCAPTCHA.");
  }

  try {
    const firestore = getFirestore();
    const mailCollection = firestore.collection("mail");
    const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScsGNySFzLaWvSRbq9SJbsoU32LFleLB2jwJitu7xT9Nr_qVw/viewform?usp=header";

    const autoReply = {
      to: [email],
      message: {
        subject: "Thank you for contacting Barlow AI Labs!",
        html: `<p>Dear ${name},</p><p>Thank you for contacting Barlow AI Labs! To help us understand your needs, please complete our brief questionnaire: <a href="${googleFormLink}">Click here</a>.</p><p>Best regards,<br>The Barlow AI Labs Team</p>`,
      },
    };

    const adminNotification = {
      to: ["tevin@barlowailabs.com"],
      replyTo: email,
      message: {
        subject: `New Contact Form: ${subject}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><hr><p><strong>Message:</strong></p><p>${message}</p>`,
      },
    };

    // *** DIAGNOSTIC LOGGING ***
    console.log("About to write the following objects to Firestore:");
    console.log("Auto-Reply Object:", JSON.stringify(autoReply, null, 2));
    console.log("Admin Notification Object:", JSON.stringify(adminNotification, null, 2));

    await Promise.all([
      mailCollection.add(autoReply),
      mailCollection.add(adminNotification),
    ]);
    console.log("Successfully added documents to 'mail' collection.");
  } catch (error) {
    console.error("Failed to queue emails in Firestore:", error);
    throw new HttpsError("internal", "Failed to send email.");
  }

  return {message: "Your message has been sent successfully!"};
});
