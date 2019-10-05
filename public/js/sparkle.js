setTimeout(function() {
    document.getElementsByClassName('sparkle')[0].classList.add('bigger');
}, 200);

var userId = 'dWHdOdvOkJbN6Bp0QliWxFPAwl43';
firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
        userId = u.uid;
    }
});

console.log(userId)

let itemUrl;

// firebase.firestore().collection('Users').doc(userId).get().then(val => {
//     let data = val.data();
//     data = data.items;
//     console.log(data)

//     Object.keys(data).forEach(key => {
//         itemUrl = data[key]
//     })
// })

setTimeout(function() {
    firebase.firestore().doc(`Users/${userId}`).get().then(val => {
        let data = val.data();
        console.log(user)
        data.items;
        document.getElementsByClassName("smallD")[0].classList.add('bigd');
        document.getElementsByClassName("smallD")[0].src = itemUrl;
    })
}, 730);
