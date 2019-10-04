console.log(userId)

var femaleRef = () => {
    db.collection("Users").doc(user.uid).update({
        "gender" : "female"
    })
    window.location = "/profile.html";
}
var maleRef = () => {
    db.collection("Users").doc(user.uid).update({
        "gender" : "male"
    })
    window.location = "/profile.html";
}
// function neriinugno(name) {

//     console.log(name);
// }

// var a = (name) => {
//     console.log(name);
    
// }
// a(name);

// neriinugno(name);