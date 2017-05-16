(function() {
'use strict';
var state = {
    quizQuestionData: [
        {
            questionText: 'What does the word “testament” (as in New/Old Testament) mean?',
            answerOptions: ["Testimony", "History", "Covenant", "Canon"],
            correctAnswer: "Covenant"
        },
        {
            questionText: 'How many books are in the Old Testament?',
            answerOptions: ["39", "36", "27", "63"],
            correctAnswer: "39"
        },
        {
            questionText: 'Jews refer to their Scriptures (our Old Testament) as what?',
            answerOptions: ["The Talmud", "The Pentateuch", "The Tanak", "The Holy Writ"],
            correctAnswer: "The Tanak"
        },
        {
            questionText: 'In the English Bible the Old Testament is organized ____.',
            answerOptions: ["Alphabetically", "Topically", "Chronologically", "By Size"],
            correctAnswer: "Topically"
        },
        {
            questionText: 'The Jewish organization of the Scriptures (our Old Testament) ends in what book?',
            answerOptions: ["Ecclesiastes", "2 Kings", "Malachi", "2 Chronicles"],
            correctAnswer: "2 Chronicles"
        },
        {
            questionText: 'How many books of the New Testament did Paul write?',
            answerOptions: ["12", "10", "13", "19"],
            correctAnswer: "13"
        },
        {
            questionText: 'Which of the following are considered part of the “Law”?',
            answerOptions: ["Genesis", "Joshua", "Numbers", "Both 1 and 3"],
            correctAnswer: "Both 1 and 3"
        },
        {
            questionText: 'Which of the following are considered “Major Prophets”?',
            answerOptions: ["Isaiah", "Ezekiel", "Lamentations", "All of the above"],
            correctAnswer: "All of the above"
        },
        {
            questionText: 'Paul’s epistles are arranged according to_____?',
            answerOptions: ["Alphabetical order", "Size", "Chronological order", "Range of distribution"],
            correctAnswer: "Size"
        },
        {
            questionText: 'The last book of the Old Testament, Malachi, was written around when?',
            answerOptions: ["430 B.C.", "430 A.D.", "1400 B.C.", "43 A.D."],
            correctAnswer: "430 B.C."
        }
    ],
    currentQuestion: null,
    currentQuestionNum: 0,
    totalNumOfQuestions: 10,
    userScoreCorrect: 0,
    userScoreIncorrect: 0
};

function setCurrentQuestion(questionNum) {
    state.currentQuestion = state.quizQuestionData[questionNum - 1];
}

function closeDialog() {
    $("body").removeClass("startDialogIsOpen finishDialogIsOpen");
}

function closeDialogOnStart() {
    $(".btn-start").click(function(event) {
        closeDialog();
    });
}

function disableAnswers() {
    $(".answer-box").addClass("not-clickable");
}

function enableAnswers() {
    $(".answer-box").removeClass("not-clickable");
}

function incrementCurrentQuestionNum() {
    var totalNumOfQuestions = state.quizQuestionData.length;
    if (state.currentQuestionNum < totalNumOfQuestions) {
        state.currentQuestionNum++;
        setCurrentQuestion(state.currentQuestionNum);
    }
}

function incrementUserScoreCorrect() {
    state.userScoreCorrect++;
}

function incrementUserScoreIncorrect() {
    state.userScoreIncorrect++;
}

function initializeQuestionNum() {
    state.currentQuestionNum = 1;
    setCurrentQuestion(1);
}

function initializeUserScore() {
    state.userScoreCorrect = 0;
    state.userScoreIncorrect = 0;
}

function renderCurrentQuestionNum() {
    $(".question-number").text(state.currentQuestionNum);
}

function renderTotalNumOfQuestions() {
    $(".total-number-questions").text(state.quizQuestionData.length);
}

function renderQuestionText() {
    $(".question").text(state.currentQuestion.questionText);
}

function renderAnswerOptions() {
    var answerOptions = state.currentQuestion.answerOptions;
    var answerNumClassSelector;
    var i;
    for (i = 0; i < answerOptions.length; i++) {
        answerNumClassSelector = ".answer";
        answerNumClassSelector += i + 1;
        $(answerNumClassSelector).text(answerOptions[i]);
    }
}

function renderUserScoreCorrect() {
    $(".number-correct").text(state.userScoreCorrect);
}

function renderUserScoreIncorrect() {
    $(".number-incorrect").text(state.userScoreIncorrect);
}

function renderCurrentQuestion() {
    renderCurrentQuestionNum();
    renderQuestionText();
    renderAnswerOptions();
    enableAnswers();
}

function initiateQuiz() {
    initializeQuestionNum();
    initializeUserScore();
    clearFeedback();
    renderCurrentQuestion();
    renderUserScoreCorrect();
    renderUserScoreIncorrect();
    renderTotalNumOfQuestions();
    hideButtonNext();
    hideButtonFinish();
}

function renderAnswerFeedback(userAnswer) {
    var correctAnswer = state.currentQuestion.correctAnswer;
    if (userAnswer === correctAnswer) {
        $(".feedback").text("Correct!");
        return true;
    } else {
        $(".feedback").text("Sorry! The correct answer is " + correctAnswer);
        return false;
    }
}

function clearFeedback() {
    $(".feedback").text('');
}

function showButtonNext() {
    $(".btn-next").removeClass("hidden");
}

function hideButtonNext() {
    $(".btn-next").addClass("hidden");
}

function showButtonFinish() {
    $(".btn-finish").removeClass("hidden");
}

function hideButtonFinish() {
    $(".btn-finish").addClass("hidden");
}

function evaluateUserAnswerOnClick() {
    $(".answer").click(function(event) {
        var userAnswer = $(event.currentTarget).children("span").text();
        var userIsCorrect = renderAnswerFeedback(userAnswer);
        if (userIsCorrect) {
            incrementUserScoreCorrect();
            renderUserScoreCorrect();
        } else {
            incrementUserScoreIncorrect();
            renderUserScoreIncorrect();
        }
        disableAnswers();
        if (state.currentQuestionNum === state.totalNumOfQuestions) {
            showButtonFinish();
        } else {
            showButtonNext();
        }
    });
}

function goToNextQuestionOnNext() {
    $(".btn-next").click(function(event) {
        hideButtonNext();
        clearFeedback();
        incrementCurrentQuestionNum();
        renderCurrentQuestion();
    });
}

function openFinishModalOnFinish() {
    $(".btn-finish").click(function(event) {
       $("body").addClass("finishDialogIsOpen"); 
    });
}

function restartQuizOnRetry() {
    $(".btn-retry").click(function(event) {
        initiateQuiz();
        closeDialog();
    });
}

$(function() {
    initiateQuiz();
    closeDialogOnStart();
    evaluateUserAnswerOnClick();
    goToNextQuestionOnNext();
    openFinishModalOnFinish();
    restartQuizOnRetry();
})

})()