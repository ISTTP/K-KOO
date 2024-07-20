import firebase from 'firebase/app';
import 'firebase/messaging';
import axiosInstance from '#apis/axios.ts';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      registerServiceWorker();
    } else if (permission === 'denied') {
      console.log('푸시 알림 권한 차단');
    }
  });
}

function registerServiceWorker() {
  return navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then(() => {
      console.log('Service Worker 등록 성공');
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export function getFcmToken() {
  messaging
    .getToken({ vapidKey: process.env.FIREBASE_VAPID_KEY })
    .then((token: string) => {
      sendToken(token);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function sendToken(token: string) {
  axiosInstance
    .put('/user/token', { token })
    .then(() => {
      console.log('FCM 토큰 저장 성공');
    })
    .catch((error) => {
      throw new Error(error);
    });
}
