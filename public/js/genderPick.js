console.log(userId)

var femaleRef = () => {
    db.collection("Users").doc(user.uid).update({
        "gender" : "female"
    })
    window.location = "/enigmaBox/public/profile.html";
}
var maleRef = () => {
    db.collection("Users").doc(user.uid).update({
        "gender" : "male"
    })
    window.location = "/enigmaBox/public/profile.html";
}
// function neriinugno(name) {

//     console.log(name);
// }

// var a = (name) => {
//     console.log(name);
    
// }
// a(name);

// neriinugno(name);