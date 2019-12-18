document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const questions = [
        {
            question: "What is 2*5?",
            choices: [2, 5, 10, 15, 20],
            correctAnswer: 2
        },
        {
            question: "What is 3*6?",
            choices: [3, 6, 9, 12, 18],
            correctAnswer: 4
        },
        {
            question: "What is 8*9?",
            choices: [72, 99, 108, 134, 156],
            correctAnswer: 0
        },
        {
            question: "What is 1*7?",
            choices: [4, 5, 6, 7, 8],
            correctAnswer: 3
        },
        {
            question: "What is 8*8?",
            choices: [20, 30, 40, 50, 64],
            correctAnswer: 4
        }
    ];

    let questionCounter = 0;
    const selections = [];
    const quiz = document.getElementById('quiz');

    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const startBtn = document.getElementById('start');

    const chose = () => {
        const inputs = document.querySelector('input[name="answer"]:checked');
        if (!inputs) {
            return
        }
        selections[questionCounter] = +inputs.value;
    }

    const createRadioButtons = (index) => {

        const radioList = document.createElement('ul');

        questions[index].choices.forEach((choice, index) => {
            const item = document.createElement('li');

            item.innerHTML = `
                <input id="question${index}" type="radio" name="answer" value="${choice}"/> 
                <label for="question${index}">${choice}</label>
            `;

            radioList.appendChild(item)
        })

        return radioList;
    }

    const renderItems = (index) => {

        const renderItem = document.createElement('div');
        const header = document.createElement('h2');
        const question = document.createElement('p');
        const radioButtons = createRadioButtons(index);

        renderItem.id = 'question';

        header.textContent = `Question ${index + 1} :`;
        question.textContent = questions[index].question

        renderItem.appendChild(header);
        renderItem.appendChild(question);
        if (radioButtons) {
            renderItem.appendChild(radioButtons);
        }

        return renderItem;
    }

    const startQuestions = () => {
        quiz.innerHTML = '';
        quiz.style.display = 'block';

        if (questionCounter < questions.length) {
            const item = renderItems(questionCounter);
            quiz.appendChild(item)

            // Controls display of 'prev' button
            if (questionCounter === 1) {
                prevBtn.style.display = 'block';
            } else if (questionCounter === 0) {
                prevBtn.style.display = 'none';
                next.style.display = 'block';
            }
        } else {
            const res = document.createElement('p');
            res.textContent = 'Sanks for question';
            quiz.appendChild(res)
            prevBtn.style.display = 'none';
            next.style.display = 'none';
            startBtn.style.display = 'block';
        }

    }
    startQuestions();

    nextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        chose();

        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            startQuestions();
        }
    });

    prevBtn.addEventListener('click', () => {
        event.preventDefault();
        chose();

        questionCounter--;
        startQuestions();
    });

    startBtn.addEventListener('click', () => {
        event.preventDefault();
        chose();

        questionCounter = 0;
        startQuestions();
    });





})