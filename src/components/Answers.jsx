import { useRef } from 'react';

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();

    //IF QUIZ IS NOT COMPLETE
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - .5);//shuffles randomly
    }
    
    return <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            //check if this answer is selected
            const isSelected = selectedAnswer === answer;

            let answerCssClass = '';
            if (answerState === 'answered' && isSelected) {
                answerCssClass = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                answerCssClass = answerState;
            }

            return <li key={answer} className="answer" >
                <button
                    onClick={() => onSelect(answer)}
                    className={answerCssClass} disabled={answerState !== ''} >{answer}</button>
            </li>

        })}
    </ul>
}