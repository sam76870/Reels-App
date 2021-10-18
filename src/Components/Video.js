import React from 'react'
import './Video.css'
import ReactDom from 'react-dom';
function Video(props) {
    const handleMute = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    const handleAutoScroll = (e) => {
        let next = ReactDom.findDOMNode(e.target).parentNode.nextSibling;
        if (next) {
            next.scrollIntoView({ behaviour: 'smooth' });
        }
    }
    return (
        <>
            <video onEnded={handleAutoScroll}
                src={props.source}
                className='video-styles'
                onClick={handleMute}
                muted='muted'
                type='video/mp4'>

            </video>
        </>
    )
}

export default Video
