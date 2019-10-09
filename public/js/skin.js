const db = firebase.firestore();
let userId;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = user.uid;

        db.doc('Users/' + userId).get()
            .then(function(doc) {
                const lvl= doc.data().level;

                if (lvl >= 2 && lvl < 4) {
                    let lvl2BoxEl = document.getElementsByClassName('silverb')[0].src = '../src/silverb.png';
                }
                if (lvl >= 4 && lvl < 6) {
                    let lvl2BoxEl = document.getElementsByClassName('silverb')[0].src = '../src/silverb.png';
                    let lvl4BoxEl = document.getElementsByClassName('goldenb')[0].src = '../src/goldenb.png';
                }
                if (lvl == 6) {
                    let lvl2BoxEl = document.getElementsByClassName('silverb')[0].src = '../src/silverb.png';
                    let lvl4BoxEl = document.getElementsByClassName('goldenb')[0].src = '../src/goldenb.png';
                    let lvl6BoxEl = document.getElementsByClassName('diamondb')[0].src = '../src/dimondb.png';
                }
            })
    }
});


function jump() {
    window.location.href = `../profile.html`
}
