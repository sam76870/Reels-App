import React from 'react'

function Videos(props) {
    // console.log(props);
    const handleMute = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    return (
        <>
            <video className="video-styles" onClick={handleMute} controls muted='muted' type='video/mp4'>
                <source src={props.source} type='video/webm' />
            </video>
        </>
    )
}

export default Videos
