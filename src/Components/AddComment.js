import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddComment.css'
import { database } from '../firebase';
const useStyle = makeStyles({
    cbtn: {
        marginRight: '1%',
        marginTop: '4%'
    }
})
function AddComment({userData=null,postData=null}) {
    const classes = useStyle();
    const [text, setText] = useState('');
    const manageComment = (e) => {
        let comment = e.target.value;
        setText(comment);
    }
    const handleOnEnter = (e) => {
        let obj = {
            text: text,
            uName: userData.username,
            uUrl: userData.profileUrl
        }
        database.comments.add(obj).then(docRef => {
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, docRef.id]
            })
        }).then(() => {
            setText('');
        }).catch(e => {
            console.log(e + " ");
        })
    }
    return (
        <div className='emojiBox'>
            <TextField value={text} fullWidth={true} label='Add a comment' onChange={manageComment} />
            <Button
                onClick={handleOnEnter}
                disabled={text == '' ? true : false}
                className={classes.cbtn}
                color='primary'>
                Post
            </Button>
        </div >
    )
}

export default AddComment
