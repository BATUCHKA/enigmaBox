firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        let userId = user.uid;
        //userId = '4AAc6jf9Q5dEcx0z8XlNUmQIA8a2';

        firebase.firestore().collection('Users').doc(userId).get().then(val => {
            let items = val.data().items;

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
<<<<<<< HEAD
=======

>>>>>>> bb68627c5afb734419165bbe9dff6d92009daaed
function skin() {
    window.location = "./skin.html";
}
