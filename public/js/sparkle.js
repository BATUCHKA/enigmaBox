firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
        let userId = u.uid;
        firebase.firestore().doc(`Users/${userId}`).get().then(val => {
            let data = val.data(), itemUrl = "";
            data = data.items;
            console.log(data)
            itemUrl = data[ data.length-1 ].itemUrl;
            document.getElementsByClassName("smallD")[0].classList.add('bigd');
            document.getElementsByClassName("smallD")[0].src = itemUrl;
            document.getElementsByClassName('sparkle')[0].classList.add('bigger');

            console.log('!!!')
            setTimeout(function() {
                window.location = "../profile.html";
            }, 2000);
        })
    }
});

// const db = firebase.firestore();
// let userId;

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         userId = user.uid;

//         db.doc('Users/' + userId).get()
//             .then(function(doc) {
//                 const lvl= doc.data().items.length;
//             })
//     }
// });

