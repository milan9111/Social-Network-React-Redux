import React from "react";
import style from "./ProfileInfo.module.css";
import { Input, Textarea } from "../../common/FormsControls/FormsControls";
import { Contacts } from "./ProfileInfo";
import { Field, reduxForm } from "redux-form";



const ProfileDataForm = (props) => {
     
    return(
      
         <form onSubmit={props.handleSubmit}>
            <div className={style.discrptionBlock}>
                {props.isOwner ? <div><button>Save</button></div> : null}
                <div>
                    <b>My name is:</b> 
                    <Field placeholder={'Full name'} name={'fullName'} validate={[]} component={Input}/>
                </div>
                <div>
                    <b>About me: </b> 
                    <Field placeholder={'About me'} name={'aboutMe'} validate={[]} component={Input}/>
                    </div>
                <Contacts contacts={props.profile.contacts}/> 
                <div>
                    <b>Loking for a job:</b>
                    <Field placeholder={''} name={'lookingForAJob'} validate={[]} component={Input} type='checkbox'/>
                </div>
                <div>
                    <b>My professionals skills:</b>
                    <Field placeholder={'My professionals skills'} name={'lookingForAJobDescription'} validate={[]} component={Textarea}/>    
                </div>
            </div>
         </form>  
      
    );
}

const ProfileDataReduxForm = reduxForm({
    form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataReduxForm;