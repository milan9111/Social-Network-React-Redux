import React from 'react';
import preloader from './../../../assect/images/loader.gif';
import style from './../../Users/Users.module.css';



export let Preloader = (props) => {
    return(
        <img src={preloader} className={style.loader} alt='loading...' />
    );
}