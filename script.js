const inputSlider = document.querySelector("[data-lenghtSlider]");
const lenghtDisplay = document.querySelector("[data-lenghtNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#Number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_/\/.,;:+-=><{}[]"'

let password ="";
let passwordLenght = 10;
let checkCount = 0;

handleSlider();

// setIndicator("#ccc");

// set passwordlenght
function handleSlider(){
    inputSlider.value = passwordLenght;
    lenghtDisplay.innerText = passwordLenght;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLenght - min) *100/(max - min)) + "% 100"
}

// function setIndicator(){
//     indicator.style.backgroundColor = color;
//     indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
// }

function getRdInteger(min, max){
    return Math.floor(Math.random ()*(max-min)) + min;
}
function generateRdNumber(){
    return getRdInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRdInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRdInteger(65,91))
}

function generateSymbol (){
    const randNumber = getRdInteger (0,symbols.length)
    return symbols.charAt(randNumber)
}


async function copyContent (){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value)
    copyMsg.innerText = "copied";
    }
    catch (e){
    copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add ("active");
    setTimeout( () => {
    copyMsg.classList.remove("active")
}, 2000);
}

function shufflePassword(array){
    // password shuffle algorithm 
    for (let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random () * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        let str = "";
        array.forEach((el) => (str += el));
        return str;
    }
}


function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });
}

// Special Condition

if(passwordLenght < checkCount) {
    passwordLenght = checkCount;
    handleSlider();
}

allCheckBox.forEach ( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input' ,(e) =>{
    passwordLenght = e.target.value;
    handleSlider();
})


copyBtn.addEventListener ('click', () => {
if(passwordDisplay.value)
copyContent();
})

generateBtn.addEventListener( 'click', () => {
    if (checkCount == 0) 
    return;

    if (passwordLenght < checkCount){
        passwordLenght = checkCount;
        handleSlider();
    }
    password = "";

let funcArr = [];

if(uppercaseCheck.checked)
funcArr.push(generateUpperCase);

if(lowercaseCheck.checked)
funcArr.push(generateLowerCase);

if(numberCheck.checked)
funcArr.push(generateRdNumber);
console.log("symbolCheck ==", symbolCheck)
if(symbolCheck.checked)
funcArr.push(generateSymbol);

// compulsary addition
for (let i =0; i<funcArr.length; i++){
    password += funcArr[i] ();
}

// remaining addition

for (let i = 0; i<passwordLenght-funcArr.length; i++){
    let randIndex = getRdInteger(0, funcArr.length);
    password += funcArr[randIndex]();
}

password = shufflePassword(Array.from(password));

passwordDisplay.value = password;

})
