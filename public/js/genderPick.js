console.log(userId)
var userId;
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        userId = user.uid;
    } else {
        window.location = "/authentication.html";
    }
});

var femaleRef = () => {
    db.collection("Users").doc(userId).update({
        "gender" : "female"
    })
    .then(function(){
        window.location = "/profile.html";
    });
}
var maleRef = () => {
    db.collection("Users").doc(userId).update({
        "gender" : "male"
    })
    .then(function(){
        window.location = "/profile.html";
    });
}
// function neriinugno(name) {

//     console.log(name);
// }

// var a = (name) => {
//     console.log(name);
    
// }
// a(name);

// neriinugno(name);