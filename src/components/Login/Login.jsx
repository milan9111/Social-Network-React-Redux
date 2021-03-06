import React from "react";
import styles from './../common/FormsControls/FormsControl.module.css';
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'email'} validate={[required]} component={Input} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} validate={[required]} component={Input} />
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type="checkbox" /> remember me
            </div>

            {props.captchaUrl ? <img src={props.captchaUrl} alt='captcha'/> : null}

            {props.captchaUrl 
            ?  
            <div>
                <Field placeholder={'Symbols'} component={Input} validate={[required]} name={'captcha'} type="text" />
            </div> 
            : 
            null}

            {props.error ?  <div className={styles.formSummaryError}>{props.error}</div> : null}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth) {
        return(
            <Redirect to={'/profile'} />
        );
    }
     
    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
        
    );
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);



