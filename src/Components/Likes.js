import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase'
const useStyle = makeStyles({
    like: {
        color: '#e74c3c',
        cursor: 'pointer'
    },
    unlike: {
        color: 'white',
        cursor: 'pointer'
    }
})
function Likes({ userData = null, postData = null }) {
    const classes = useStyle();
    const [like, setLike] = useState(null);
    useEffect(() => {
        let check = postData.likes.includes(userData?.userId) ? true : false;
        setLike(check);
    }, [postData])
    const handleLike = async () => {
        if (like == true) {
            // unlike
            let uArr = postData.likes.filter(el => {
                return el != userData.userId;
            })
            await database.posts.doc(postData.postId).update({
                likes: uArr
            })
        } else {
            // like
            let uArr = [...postData.likes, userData.userId];
            await database.posts.doc(postData.postId).update({
                likes: uArr
            })
        }
    }
    return (
        <div>
            {
                like != null ? <>
                    {like == false ? <FavoriteIcon className={`${classes.unlike} icon-styling`} onClick={handleLike} /> :
                        <FavoriteIcon className={`${classes.like} icon-styling`} onClick={handleLike} />}
                </>
                    : <></>
            }
        </div>
    )
}

export default Likes
