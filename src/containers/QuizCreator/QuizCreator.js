import React, { Component } from 'react';
import classes from "./QuizCreator.module.css"
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import Select from "../../components/UI/Select/Select"
import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import { connect } from "react-redux";
import { createQuizQuestion, createQuiz  } from "../../redux/actions/create";

import { createControl, validateControl, validateForm } from "../../form/formFramework";

function createOptionControl(index) {
    return createControl({
        label: `Вариант ${index}`,
        errorMessage: 'Значение не может быть пустым',
        id: index,
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
        
    }
}

class QuizCreator extends Component {
    state = {
        formControls: createFormControls(),
        correctAnswerId: 1,
        isFormValid: false
    }

    submitHandler(event) {
        event.preventDefault();
    }

    addQuestionHandler = (event) => {
        event.preventDefault();
        
        const { question, option1, option2, option3, option4 } = this.state.formControls; 
        const quiestionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            correctAnswerId: this.state.correctAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        };

        this.setState({
            formControls: createFormControls(),
            correctAnswerId: 1,
            isFormValid: false
        });

        this.props.createQuizQuestion(quiestionItem);
    }

    createQuizHandler = (event) => {
        event.preventDefault();
    
        this.setState({
            isFormValid: false,
            correctAnswerId: 1,
            formControls: createFormControls()  
        })

        this.props.createQuiz(); 
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls, 
            isFormValid: validateForm(formControls)
        });
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null }
                </Auxiliary>
                
            );
        })
    }

    selectChangeHandler = event => {
        this.setState({
            correctAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderControls() }

                        <Select 
                            label="Выберите правильный ответ"
                            value={this.state.correctAnswerId}
                            onChange={this.selectChangeHandler}
                            
                            options={[
                                { text: '1', value: 1},
                                { text: '2', value: 2},
                                { text: '3', value: 3},
                                { text: '4', value: 4},
                            ]}
                        />

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Добавить вопрос</Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={!this.props.quiz.length}
                        >Создать тест</Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        createQuiz: () => dispatch(createQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);