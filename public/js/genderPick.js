console.log(userId)

var femaleRef = () => {
    db.collection("Users").doc(user.uid).set({
        "gender" : "female"
    })
}
var maleRef = () => {
    db.collection("Users").doc(user.uid).set({
        "gender" : "male"
    })
}
// function neriinugno(name) {

//     console.log(name);
// }

// var a = (name) => {
//     console.log(name);
    
// }
// a(name);

// neriinugno(name);