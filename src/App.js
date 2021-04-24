import React from 'react';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionsData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyAlZdrzLWlEQKOjq5trMfqan_7niTWwk10",
  authDomain: "chat-app-8c5d5.firebaseapp.com",
  projectId: "chat-app-8c5d5",
  storageBucket: "chat-app-8c5d5.appspot.com",
  messagingSenderId: "113050167222",
  appId: "1:113050167222:web:d1811b87584f93d1f4c317",
  measurementId: "G-1KF8FG72FM"
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics();
function App() {
  
  const[userLoggedIn] = useAuthState(auth);
  
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {userLoggedIn ? <ChatRoom/> : <SignIn/>}
        </section>
    </div>
  );
}

export default App;
