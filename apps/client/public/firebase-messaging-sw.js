/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js');

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyANetlfSlaXU1QYmgNpNwsQfOKFl6G6tiE',
  projectId: 'k-koo-cf0c2',
  messagingSenderId: '37492525353',
  appId: '1:37492525353:web:0d504466ddc21967058f38',
});

const messaging = firebase.messaging();

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
  };

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions),
  );
});

self.addEventListener('notificationclick', function (event) {
  const url = 'https://k-koo.kro.kr';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
