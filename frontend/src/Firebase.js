import firebase from 'firebase';

const config = {
    projectId: 'reactchat-236d0',
    apiKey:'',
    databaseURL: 'https://reactchat-236d0-default-rtdb.firebaseio.com'
  };
firebase.initializeApp(config);

export default firebase;