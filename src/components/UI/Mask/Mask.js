import React from "react";
import classes from "./Mask.module.css";

const Mask = props => {
    return (
       <div className={classes.Mask}
        onClick={props.onClick}></div>
    );
}

export default Mask;