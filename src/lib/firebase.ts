// firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyA_CH0V1t7naAOU9ZOLjEhBK_BH3i2Oc1Q",
  authDomain: "ayaboo-ee702.firebaseapp.com",
  projectId: "ayaboo-ee702",
  storageBucket: "ayaboo-ee702.firebasestorage.app",
  messagingSenderId: "758420249109",
  appId: "1:758420249109:web:4994a3c7b5eeba4fad4c1c",
  measurementId: "G-K7KDYS2H8F",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const generateToken = async ()=> {
  //  const permission = await Notification.requestPermission();
  // console.log(permission,'permission');
  // console.log(import.meta.env.VITE_FIREBASE_PUSH_NOTIFICATION_VAPID_KEY,'env');

  await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_PUSH_NOTIFICATION_VAPID_KEY,
  });
}

export async function getDeviceToken() {
  try {
    const permission = await Notification.requestPermission();
    // console.log(permission,'permission');

    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_PUSH_NOTIFICATION_VAPID_KEY,
      });
      if (currentToken) {
        // console.log("Device Token:", currentToken);
        return currentToken;
      } else {
        console.warn("No registration token available.");
      }
    } else {
      console.warn("Permission not granted.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token.", error);
  }
}

// fahOgciggkmYMv1kKHr3wY:APA91bHKg4Qo9gL1hfxvTfYf5h_ty1fo_Hu8LvVgblLtZwHKiS4JZJQExnVXtyQWeTkgcg9WEkxpZbX98xbZCZ3qNmJRzUFP76AkfESt-e68aGoCqe87mRY
