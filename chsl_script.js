
// declarations
let options = document.querySelectorAll(".options");
let questionNo = document.querySelector(".questionNo");
let questionsAnswered = 0;
let testStarted = false;
let testComplete = false;
let resetRequired = false;
let answersRecorded = 0;
let allCompleted = false;
let correctlyAnswered = 0;
let resultShown = false;

// function defs
const clearStorage = () => {
    localStorage.clear();
}

const collectSubmitions = (option) => {
    if (questionsAnswered == 24) {
        testComplete = true;
        questionNo.innerText = "A1"
    }
    questionsAnswered += 1;
    localStorage.setItem(questionsAnswered, option.innerText);
    if (questionsAnswered < 25) {
        questionNo.innerText = "Q" + (questionsAnswered + 1);
    }

};

const resetScreen = () => {
    questionNo.innerText = "A1";
}

// getting answers (only for testing)
const resultGeneration = (option) => {
    if (answersRecorded == 24) {
        testComplete = true;
        console.log("test is complete");
        allCompleted = true;
    }
    answersRecorded += 1;
    localStorage.setItem("A" + answersRecorded, option.innerText);
    if (answersRecorded < 25) {
        questionNo.innerText = "A" + (answersRecorded + 1);
    }

};

const viewResult = () => {
    if (!resultShown) {
        for (i = 1; i <= 25; i++) {
            if (localStorage.getItem(i) == localStorage.getItem("A" + i)) {
                correctlyAnswered += 1;
            }
        }
        questionNo.style.width= "100%";
        questionNo.style.height= "100%";
        questionNo.style.borderRadius = "0px";
        questionNo.innerText ="You have got "+correctlyAnswered+" correct ( "+((correctlyAnswered * 2) - ((25 - correctlyAnswered) * 0.5)) + "/" + "50"+" )";
        if(correctlyAnswered>=20){
            questionNo.style.color = "green";
        }
        else{
            questionNo.style.color = "red"
        }
        resultShown = true;
    }
}

// func def end


// main execution centre
if (!testStarted) {
    clearStorage();
    testStarted = true;
}
options.forEach((option) => {
    option.addEventListener("click", () => {
        if (!allCompleted) {
            if (!testComplete) {
                collectSubmitions(option);
            }
            else if (resetRequired) {
                resetScreen();
                resetRequired = false;
            }
            else {
                resultGeneration(option);
            }
        }
        else {
            viewResult();
        }
    })
})
