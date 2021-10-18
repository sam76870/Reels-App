import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './Posts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { database } from '../firebase';
import Video from './Video';
const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '0px'
    },
    loader: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    typo: {
        marginLeft: '2%'
    },
    vac: {
        marginLeft: '3.5%',
        color: '#8e8e8e',
        cursor: 'pointer'
    },
    dp: {
        marginLeft: '2%'
    },
    cc: {
        height: '50vh',
        overflowY: 'auto'
    },
    seeComments: {
        height: '54vh',
        overflowY: 'auto'
    },
    ci: {

        color: 'white',
        left: '9%',
        cursor: 'pointer'
    },
    mn: {
        color: 'white',


    },
    tmn: {
        color: 'white'
    }

});

function Posts({ userData = null }) {
    const classes = useStyles();
    const [posts, setPosts] = useState(null);
    const callback = entries => {
        entries.forEach(element => {
            console.log(element);
            let childVideo = element.target.childNodes[0];
            childVideo.play().then(() => {
                // if video is not in viewport then pause it
                if (!childVideo.paused && !element.isIntersecting) {
                    childVideo.pause();
                }
            })
        });
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.85 });
    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            parr = []
            querySnapshot.forEach((doc) => {
                console.log(doc.data(), +"   " + doc.id);
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data);
            })
            setPosts(parr);
        })
        return unsub;
    }, [])
    useEffect(() => {
let element = document.querySelectorAll('.videos');
element.forEach(el=>{
    observer.observe(el);
})
return ()=>{
    observer.disconnect();
    // its same as we clean up our listener or we can say that we unsubscribed listeners
    // which we put on vidoes 
}
    }, [posts])
    return (
        <>
            <div className='place'>
            </div>
            {posts == null ? <CircularProgress className={classes.loader} color='secondary' /> :
                <div className='video-container' id='video-container'>
                    {
                        posts.map((post, index) => (
                            <React.Fragment key={post.pId}>
                                <div className='videos'>
                                    <Video source={post.pUrl} id={post.pId} />
                                    <div className='fa' style={{ display: 'flex' }}>
                                        <Avatar src={post.uProfile}></Avatar>
                                        <h4>{post.uName}</h4>
                                    </div>
                                </div>
                                <div className='place'></div>
                            </React.Fragment>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default Posts