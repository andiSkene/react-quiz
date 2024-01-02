import { useState } from 'react';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js';

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    //timer is set to 10 seconds...
    let timer = 10000;

    //...but if the answer is selected it will take 1 second to check...
    if (answer.selectedAnswer) {
        timer = 1000;
    }

    //...and then show whether the answer is correct or not for 2 seconds
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function selectAnswerHandler(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        //check to see if it's correct
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return <div id="question">
        <QuestionTimer 
            key={timer} 
            timeout={timer}
            onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} 
            mode={answerState} />
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <Answers 
            answers={QUESTIONS[questionIndex].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={selectAnswerHandler} />
    </div>
}