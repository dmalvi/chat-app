import React, { Component } from 'react';
import './App.css';
import firebase, {googleProvider} from './firebase';

//Converter - FirebaseFB to Array (GLOBAL SCOPE)
function toArray(firebaseObject) {
  let array = []
  for (let item in firebaseObject) {
    array.push({ ...firebaseObject[item], key: item })
    // array.push({ value: firebaseObject[item], key: item })
  }
  return array;
}

class App extends Component {

  state = {
    user: '',
    loggedIn: false,
    chatInput: '',
    chatLog: []
  }

  componentDidMount() {
    this.auth();
  }

  auth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // User is signed in.
        const displayName = user.displayName;
        this.setState({ user: displayName, loggedIn: true });
        console.log(displayName + ' LOGGED IN');
        firebase
        .database()
        .ref('/messages')
        .on('value', (snapshot) => {
          const message = toArray(snapshot.val()); //.val() == .json()
          this.setState({ chatLog: message })
        });
      } else {
        // User is signed out, user === null
        this.setState({ user: '', loggedIn: false, chatLog:[] });
        console.log('LOGGED OUT');
      }
    })
  }

  login = () => {
    firebase.auth().signInWithRedirect(googleProvider)
    .catch(error =>  {
      console.log("No access!", error);
    });
  }

  logout = () => {
    firebase.auth().signOut().then(function() {

      console.log('logged out');
    }, function(error) {
      console.log('logout error');
    });
  }



//Post to DB
onSubmit = (event) => {
  const message = {message: this.state.chatInput, user: this.state.user}
  event.preventDefault();
  if (this.state.chatInput) {
    firebase
    .database()
    .ref(`/messages`)
    .push(message);
    console.log('Posted Successfully!');
  }
  this.setState({chatInput:''});
};

//Update state on input change
handleChatInput = (event) => {
this.setState({chatInput: event.target.value})
}
;

  render(){

    const { chatLog } = this.state
    const listOfMessages = chatLog.map(mess => (
      <div key={mess.key} className="annonsDiv">
      <p><em>{mess.user}: </em></p>
      <p>{mess.message}</p>
      </div>
    ));

    return (
      <div>
      <nav>

      <button className="button" disabled={this.state.loggedIn} onClick={this.login}>Login</button>
      <button className="button" disabled={!this.state.loggedIn} onClick={this.logout}>Logout</button>

      </nav>



      {this.state.loggedIn && <div>
        <h2> Logged in as: {this.state.user} </h2>

        <form onSubmit={this.onSubmit} className="hello">

        <label htmlFor="chatInput">Message</label>

        <input name="chatInput" onChange={this.handleChatInput} value={this.state.chatInput} type="text" placeholder="Enter Message" />
        <button type="submit" className="button">Submit</button>

        </form>
        <div className="chatOutput"> {listOfMessages} </div>
        </div>}

      </div>
    )
  }
}

export default App;
