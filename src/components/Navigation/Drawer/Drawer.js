import React, { Component } from "react";
import classes from "./Drawer.module.css";
import Mask from "../../UI/Mask/Mask";

import { NavLink } from "react-router-dom";

const links = [
    {
        text: 'Список',
        to: '/',
        exact: true
    },
    {
        text: 'Авторизация',
        to: '/auth',
        exact: false
    },
    {
        text: 'Создать тест',
        to: '/quiz-creator',
        exact: false
    },
]

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >   
                        {link.text}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];
        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                {
                    this.props.isOpen 
                    ?  <Mask onClick={this.props.onClose} />
                    : null
                }
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav> 
            </React.Fragment>
            
        );
    }
}

export default Drawer;