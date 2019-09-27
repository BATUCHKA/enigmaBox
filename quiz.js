// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBYXtJKzhgHDJfYfS3WB3LUiCR2baBBuT0",
    authDomain: "enigma-box.firebaseapp.com",
    databaseURL: "https://enigma-box.firebaseio.com",
    projectId: "enigma-box",
    storageBucket: "enigma-box.appspot.com",
    messagingSenderId: "1009957713350",
    appId: "1:1009957713350:web:4a02ab0a2de9d04dfbaec7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

refCollection.where('random', '==', rd).limit(10).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            questions = doc.data().questions;
            renderQuestion(questions[questionIndex])
        });
    })

function renderQuestion(question) {
    let questionEl = document.getElementById('question');
    questionEl.innerHTML = '';
    
    document.getElementById('hint_heseg').innerHTML = 'level: ' + lvl;
    lvl++;

    let answerEl = document.createElement('h4');
    answerEl.classList.add("goy");  
    answerEl.id = 'asuult'; 
    answerEl.innerHTML = question.question;
    questionEl.appendChild(answerEl);

    for (let i = 0; i < question.answers.length; i++) {
        let optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.innerHTML = question.answers[i].value;
        optionEl.id = i;
        optionEl.onclick = choose;
        optionEl.classList.add("goy");
        questionEl.appendChild(optionEl);
    }
}

function choose() {
    let answerId = this.id;
    if (questions[questionIndex].answers[answerId].right === true) {
        console.log('zov')
        questionIndex++;
        if (questionIndex != questions.length)  {
            renderQuestion(questions[questionIndex]);
        } else {
            console.log('question duuslaa')
            document.location.href = './sparkle.html'
        }
    } else {
        console.log('buruu')
    }
}