var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location = '/index.html';
    }
});
provider.setCustomParameters({
    'display': 'popup'
  });


const db = firebase.firestore();//db ni database doroh zuil

//tsaanaasaa coll dotor doc usgeed dotor yum ogoh
db.collection('users').add({
    'userId': 'asdf',
    'items' : ['KK']
}).then(doc => {
    console.log(doc.id)
});

// add OR update
// db.collection('users').doc('userId').set({
//     'userId': 'user001',
//     'userName': 'userName001',
//     'items': ['watch', 'phone', 'hat', 't-shirt']
// })

// get one doc
// db.collection('users').doc('userKK').get().then((docs) => {
//     console.log(docs.data());
// });

// get all docs in collection
// db.collection('users').get().then((docs) => {
//     docs.forEach(doc => {
//         console.log(doc.data());
//     })
// });

function faceLogin() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        
        console.log(user);

        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}