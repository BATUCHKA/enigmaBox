
var x = document.createElement('div')
x.classList.add('man-shoes');
var img = document.createElement('img')
img.src = './src/man-shoes.png'
x.appendChild(img)
console.log(x)
document.getElementsByClassName("erhun")[0].appendChild(x)
function play() {
    window.location = "./quiz.html";
}
function skin() {
    window.location = "./skin.html";
}
