var userId;
// user auth
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    if (user) {
        userId = user.uid;
    }
});

let life = 2;
document.getElementById('too').innerHTML = 'X' + life;

let lvl = 1;
let db = firebase.firestore();
var refCollection = db.collection("Question");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//var rd = getRandomInt(2) + 1;



// let rd = 1;

// console.log(rd);

let questionIndex = 0;

let questions = [];
let item = "";

let itemUrl = '';

// refCollection.where('random', '==', rd).limit(1).get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             item = doc.id;
//             itemUrl = doc.data().manUrl;
//             questions = doc.data().questions;
//             itemUrl = doc.data().manUrl;
//             console.log(questions)
//             renderQuestion(questions[questionIndex])
//         });
//     })

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}
let sh = [1, 2, 3, 4, 5, 6, 7];
let randomtoo = shuffle(sh);

console.log(randomtoo);

randomtoo.forEach((elemnt) => {

    console.log(elemnt);
    refCollection.where('random', '==', elemnt).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
                item = doc.id;
                itemUrl = doc.data().manUrl;
                questions = doc.data().questions;
                itemUrl = doc.data().manUrl;
                console.log(questions)
                renderQuestion(questions[questionIndex])
            });
        })
})


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
        data.items.push({
            item: item,
            itemUrl: itemUrl
        });
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
    if (questionIndex < questions.length && questions[questionIndex].answer[answerId].right === true) {
        console.log('zov')
        questionIndex++;
        if (questionIndex != questions.length) {
            renderQuestion(question[questionIndex - 1]);
        } else {
            console.log('question duuslaa');
            console.log('userId:', userId)
            pushItem();
        }
    } else {
        console.log('buruu')
        life--;
        console.log(life)
        if (life == 0) {
            window.location = "./profile.html"
        }
        document.getElementById('too').innerHTML = 'X' + life;
        this.style.borderColor = 'red';
    }
}
function butsah() {
    window.location = "./profile.html"
}