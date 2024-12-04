import { https } from 'firebase-functions';
import { initializeApp, messaging } from 'firebase-admin';

initializeApp(); 

export const sendNotification = https.onRequest(async (req, res) => {
  try {
    // Get the notification data from the request body
    const { token, message } = req.body; 

    // Create the notification message
    const payload = {
      notification: {
        title: 'Custom Notification',
        body: message,
      },
    };

    // Send the message to the device with the specified token
    await messaging().sendToDevice(token, payload);
    res.status(200).send('Notification sent successfully!');

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification'); 
  }
});