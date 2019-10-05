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

let rd = 1;

console.log(rd);

let questionIndex = 0;

let questions = [];
let item = "";

let itemUrl = '';

refCollection.where('random', '==', rd).limit(1).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            item = doc.id;
            itemUrl = doc.data().url;
            questions = doc.data().questions;
            itemUrl = doc.data().url;
            console.log(questions)
            renderQuestion(questions[questionIndex])
        });
    })

function renderQuestion(question) {
    console.log(question);
    let questionEl = document.getElementById('question');
    questionEl.innerHTML = '';
    
    document.getElementById('hint_heseg').innerHTML = 'level: ' + lvl;
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
}

function pushItem() {
    const itemCollection = db.collection("Users");
    itemCollection.doc(userId).update({
        [`items.${item}`] : itemUrl
    }).then( k => {
        console.log('amjiltttai nemlee');

    }).catch(err =>{
        console.log('from push item', err)
    })
}

function choose() {
    let answerId = this.id;
    if (questionIndex < questions.length && questions[questionIndex].answer[answerId].right === true) {
        console.log('zov')
        questionIndex++;
        if (questionIndex != questions.length)  {
            renderQuestion(question[questionIndex - 1]);
        } else {
            console.log('question duuslaa');
            console.log('userId:', userId)
            firebase.firestore().collection(`Users/${userId}/items`).add({
                url: itemUrl
            }).then(() => {
                // document.location.href = 'sparkle.html';
                console.log('DONE')
            }).catch(e => {
                console.log(e);
            })
            // pushItem();
        }
    } else { 
        console.log('buruu')
        life--;
        console.log(life)
        document.getElementById('too').innerHTML = 'X' + life;
    }
}