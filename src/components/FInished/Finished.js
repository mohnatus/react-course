import React from "react";
import classes from "./Finished.module.css";

const Finished = props => {
    const correctCount = Object.keys(props.results)
                        .filter(key => props.results[key] === 'success')
                        .length;
    return (
        <div className={classes.Finished}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.results[quizItem.id] === 'error' ? classes.error : classes.success
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}.</strong>&nbsp;{quizItem.question}&nbsp;
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
            </ul>

            <p>
                Правильно: {correctCount} из {props.quiz.length}
            </p>

            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
    );
};

export default Finished;
