var provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
var userId;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        userId = user.uid;
        var uidDoc = db.collection("Users").doc(user.uid);
        uidDoc.get().then(function (doc) {
            if (doc.exists) {
                window.location = "/profile.html";
            } else {
                db.collection("Users").doc(user.uid).set({
                    name: user.displayName,
                    items: [],
                    level: 0
                })
                    .then(function () {

                        console.log("User Created!!!");
                    })
                    .catch(function (error) {
                        console.log("Error writing user: ", error);
                    }).finally(function () {
                        window.location = "/genderPick.html";
                    });
            }
        }).catch(function (error) {
            console.log("Error getting user:", error);
        })
    } else {
        console.log("TEST");
        document.getElementById('fb').addEventListener("click", faceLogin);
    }
});

function faceLogin() {
    console.log('asdasdasd')
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}