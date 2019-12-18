import React from 'react';
import classes from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem 
                    answerState={props.answerState ? props.answerState[answer.id] : null}
                    onAnswerClick={props.onAnswerClick}
                    answer={answer} 
                    key={answer.id} />
            );
        }) }
    </ul>
);

export default AnswersList;