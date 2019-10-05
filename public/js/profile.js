firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        let userId = user.uid;
        
        //userId = '4AAc6jf9Q5dEcx0z8XlNUmQIA8a2';

        firebase.firestore().collection('Users').doc(userId).get().then(val => {
            let items = val.data().items;

            if(val.data().gender == 'male') {
                let img = document.createElement('img')
                img.src = './src/erhun.png';
                document.getElementsByClassName("erhun")[0].appendChild(img)
            } else {
                let img = document.createElement('img')
                img.src = './src/emhun.png';
                document.getElementsByClassName("erhun")[0].appendChild(img)
            }
            items.forEach(item => {
                let img = document.createElement('img')
                img.src = item.itemUrl;

                document.getElementsByClassName("erhun")[0].appendChild(img)
            })
        }).catch(err => {
            console.log(err);
        });
    }
});


function play() {
    window.location = "./quiz.html";
}

function skin() {
    window.location = "./skin.html";
}
