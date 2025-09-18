import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import { join } from 'path';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor() {
    // Initialize only once
    if (!admin.apps.length) {
      // admin.initializeApp({
      //   credential: admin.credential.cert(
      //     join(__dirname, '../config/firebase-service-account.json'),
      //   ),
      // });

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      this.logger.log('Firebase initialized ✅');
    }
  }

  async sendToDevice(token: string, payload: admin.messaging.MessagingPayload) {
    try {
      const message: admin.messaging.Message = {
        token,
        data: payload.data,
        notification: payload.notification,
      };

      const response = await admin.messaging().send(message);
      this.logger.log(`Push sent to ${token}`);
      return response;
    } catch (error) {
      this.logger.error(`Error sending push: ${error.message}`);
      throw error;
    }
  }
}
