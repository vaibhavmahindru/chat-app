import React, { useState } from 'react';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

  
})

const auth = firebase.auth()
const firestore = firebase.firestore()
//const analytics = firebase.analytics();
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

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)

  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messageRef = firestore.collection('messages')
  const query = messageRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query , {idField : 'id'})
  //console.log(messages)
  //const [messages] = firestore.collection('messages')
  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    console.log('coming here')
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

  }
  return(
    <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
      <button type="submit">send</button>
    </form>
    </>
  )
}

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
  
}
export default App;
