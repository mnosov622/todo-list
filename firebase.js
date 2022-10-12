console.log('Hello from firebase');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWJdqEsXlcuPEDo01DJgLNNGUxkpbm26I",
  authDomain: "javascript-notes-f5d1a.firebaseapp.com",
  databaseURL: "https://javascript-notes-f5d1a-default-rtdb.firebaseio.com",
  projectId: "javascript-notes-f5d1a",
  storageBucket: "javascript-notes-f5d1a.appspot.com",
  messagingSenderId: "596935800202",
  appId: "1:596935800202:web:174cb082e81d1b18dbc473",
  measurementId: "G-9FXXQENW3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let id = "123";
   
  let data = {};
   
  data["message"] = "Hello Google Firebase";
   
    firebase.database().ref('test/'+id).set(data,function(error) {
                if (error) {
                  // The write failed...
 
                  console.log({error});
                } else {
 
                                        
                    alert("success");
                  // Data saved successfully!
                }
              });
              