import {
  initializeApp
} from 'firebase';

var app = initializeApp({
  apiKey: "AIzaSyD8PMj_yp0DG9ELjhad8lfy1kx_0JF6utw",
  authDomain: "adopteunpet.firebaseapp.com",
  databaseURL: "https://adopteunpet.firebaseio.com",
  projectId: "adopteunpet",
  storageBucket: "gs://adopteunpet.appspot.com",
  messagingSenderId: "211002227398"
});
export let auth = app.auth();
export const db = app.database();
export let storage = app.storage();
export const namesRef = db.ref('petList');
export const namesRef2 = db.ref('adopted');