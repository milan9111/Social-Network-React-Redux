import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { required, maxLengthCreator } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls"; 

 
const MyPosts = (props) => {

    
    let postsElements = (props.posts).map((item, index) => <Post key={index} message={item.messages} like={item.likesCount} />);
    
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }
 
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3> 
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} validate={[required, maxLength10]} placeholder={'Post text message'}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

let AddNewPostFormRedux = reduxForm({
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm);




export default MyPosts;