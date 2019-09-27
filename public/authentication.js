var provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        
        var uidDoc = db.collection("Users").doc(user.uid);
        uidDoc.get().then(function(doc) {
            if (doc.exists) {
                console.log('User exist!!');
            } else {
                db.collection("Users").doc(user.uid).set({
                    name: user.displayName,
                    items: null,
                    score: 0
                })
                    .then(function () {
                        
                        console.log("User Created!!!");
                    })
                    .catch(function (error) {
                        console.log("Error writing user: ", error);
                    }).finally(function(){
                        window.location = "/profile.html";
                    });
            }
        }).catch(function(error) {
            console.log("Error getting user:", error);
        })
    }
});
/* fb acc aas avaad yums oruulaad sanuulah */
//db ni database doroh zuil

//tsaanaasaa coll dotor doc usgeed dotor yum ogoh
// db.collection('users').add({
//     'userId': 'asdf',
//     'items': ['KK']
// }).then(doc => {
//     console.log(doc.id)
// });

// add OR update
// db.collection('name').doc('userId').set({
//     'userId': 'user001',
//     'userName': 'userName001',
//     'items': ['watch', 'phone', 'hat', 't-shirt']
// });

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
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
    }).catch(function (error) {
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

// var sout = firebase.auth().signOut().then(function() {
// }).catch(function(error) {
// });