var userId;
// user auth
document.getElementById("ami").style.display = "none";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = user.uid;

        db.doc('Users/' + userId).get()
            .then(function (doc) {
                const lvl = doc.data().items.length;
                let papa = document.createElement("div");
                papa.className = "box"
                let box = document.createElement("img");
                box.alt = "Дотор нь юу байгаа вэ";
                papa.appendChild(box);
                let aav =  document.getElementsByClassName("buhel_body")[0];

                if (lvl >= 0 && lvl < 2) {
                    box.src = "https://firebasestorage.googleapis.com/v0/b/enigma-box.appspot.com/o/box-skin.png?alt=media&token=e9145f77-89a6-46eb-a553-0bf5f494e310";
                }
              
                    if (lvl >= 2 && lvl < 4) {
                        box.src = "../src/silverb.png";
                    }
                if (lvl >= 4 && lvl < 6) {
                    box.src = "../src/goldenb.png";
                }
                if (lvl == 6) {
                    box.src = "../src/dimondb.png";
                }
                aav.appendChild(papa);

                document.getElementsByClassName("buhel_body")[0].style.display = "block"
                document.getElementById("ami").style.display = "flex";
                document.getElementById("loader").style.display = "none";
            })
    }
});

let life = 2;
document.getElementById('too').innerHTML = 'X' + life;

let db = firebase.firestore();
var refCollection = db.collection("Question");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//var rd = getRandomInt(2) + 1;

// user auth

async function main() {
    let lvl;
    let db = firebase.firestore();
    var refCollection = db.collection("Question");
    var userId;
    let items = [];
    let inpromise = new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userId = user.uid;
                db.collection("Users").doc(userId).get().then((doc) => {
                    if (doc.exists) {
                        lvl = doc.data().items.length + 1;
                        doc.data().items.forEach(el => {
                            items.push(el);
                        })
                    }
                    resolve();
                })
            }
        });
    })

    await inpromise;
    let life = 2;
    console.log(items);

    document.getElementById('too').innerHTML = 'X' + life;

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    let questionIndex = 0;

    let questions = [];
    let item = "";

    let itemUrlMan = '', itemUrlWoman = '';

    refCollection.where('random', '==', lvl).get()
        .then(snapshot => {
            console.log("snapshot = ",snapshot);

            snapshot.forEach(doc => {

                console.log("SHOW THIS TWICE PLS!");    
                console.log(lvl);
                item = doc.id;
                itemUrlMan = doc.data().manUrl;
                itemUrlWoman = doc.data().womanUrl;
                questions = doc.data().questions;

                console.log(questions);
                renderQuestion(questions[questionIndex])
            })
        });
    
    function renderQuestion(question) {
        console.log(question);
        let questionEl = document.getElementById('question');
        questionEl.innerHTML = '';

        document.getElementById('hint_heseg').innerHTML = 'Асуулт: ' + lvl;
        lvl++;

        let answerEl = document.createElement('h4');
        answerEl.classList.add("goy");
        answerEl.id = 'asuult';
        answerEl.innerHTML = questions[questionIndex].question;
        questionEl.appendChild(answerEl);


        for (let i = 0; i < questions[questionIndex].answer.length; i++) {
            let optionEl = document.createElement('div');
            optionEl.className = 'option';
            optionEl.innerHTML = questions[questionIndex].answer[i].value;
            optionEl.id = i;
            optionEl.onclick = choose;
            optionEl.classList.add("goy");
            questionEl.appendChild(optionEl);
        }

        questionEl.style.display = "block";
    }

    function pushItem() {
        const itemCollection = db.collection("Users");
        itemCollection.doc(userId).get().then(val => {
            let data = val.data();
            console.log(data);

            let pItem = {
                "item" : item,
                "itemUrl" : itemUrlMan
            }
            if(val.data().gender == "female") pItem.itemUrl = itemUrlWoman;

            data.items.push(pItem)

            itemCollection.doc(userId).update(data).then(k => {
                document.location.href = 'sparkle.html';
                console.log('amjiltttai nemlee');
            }).catch(err => {
                console.log('from push item', err)
            })


        }).catch(err => {
            console.log('from push item', err)
        })
    }

    function choose() {
        let answerId = this.id;
        console.log(question[questionIndex]);
        console.log(questions[questionIndex].answer[answerId]);
        if (questionIndex < questions.length && questions[questionIndex].answer[answerId].right === true) {
            console.log('zov')
            questionIndex++;
            if (questionIndex != questions.length) {
                renderQuestion(question[questionIndex - 1]);
            } else {
                console.log('question duuslaa');
                console.log('userId:', userId)
                pushItem();
                lvl++;
            }
        } else {
            console.log('buruu')
            life--;
            console.log(life)
            if (life == 0) {
                butsah();
            }
            document.getElementById('too').innerHTML = 'X' + life;
            this.style.borderColor = 'red';
        }
    }

}

function butsah() {
    window.location = "./profile.html"
}

main();