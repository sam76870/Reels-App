import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@material-ui/core/LinearProgress';
import MovieCreationIcon from '@material-ui/icons/MovieCreation'
import { storage, database } from '../firebase'
// font-family: 'Grand Hotel', cursive;
const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '2rem'

    },
}))
function UploadFile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const type = ['video/mp4', 'video/webm', 'video/ogg'];
    const onChange = (e) => {
        const file = e?.target?.files[0];
        console.log(file);
        if (!file) {
            setError('Please select file');
            setTimeout(() => { setError('') }, 2000);
            return;
        }
        if (type.indexOf(file.type) == -1) {
            setError('Please select a video file');
            setTimeout(() => { setError(null) }, 2000);
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError('Selected file is too big');
            setTimeout(() => { setError(null) }, 2000);
            return;
        }
        const id = uuidv4();
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        // this is a eventListner and it it takes three callback function as a input
        // fn1 check how much pic uploaded yet means progress tracking
        function fn1(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }
        // fn2 check error while uploading a pic
        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError(null);
                console.log(error);
            }, 2000)
            setLoading(false);
        }
        // fn3 check succesion of fully uploaded
        async function fn3() {
            setLoading(true);
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                let obj = {
                    comments: [],
                    likes: [],
                    pid: id,
                    pUrl: url,
                    uName: props?.userData?.username,
                    uProfile: props?.userData?.profileUrl,
                    userId: props?.userData?.userId,
                    createdAt: database.getCurrentTimeStamp()
                }
                console.log(obj);
                console.log(props.userData);
                database.posts.add(obj).then(async docRef => {
                    let res = await database.users.doc(props.userData.userId).update({
                        postIds: [...props.userData.postIds, docRef.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch(e => {
                    setError(e);
                    setTimeout(() => {
                        setError(null);
                    }, 2000);
                    setLoading(false)
                })
            })
        }
    }
    return (
        <>
            {
                error != null ? <Alert severity='error'>{error}</Alert> :
                    <>
                        <input
                            color='primary'
                            type='file'
                            onChange={onChange}
                            id='icon-button-file'
                            style={{ display: 'none' }}
                        />
                        <label htmlFor='icon-button-file'>
                            <Button
                                startIcon={<MovieCreationIcon />}
                                disabled={loading}
                                variant='outlined' component='span'
                                className={classes.button} size='medium' color='secondary'>
                                Upload File
                            </Button>
                        </label>
                        {loading ? <LinearProgress color='secondary' style={{ marginTop: '5%' }} /> : <></>}
                    </>
            }
        </>
    )
}

export default UploadFile
