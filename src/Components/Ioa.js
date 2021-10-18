// import React, { useState, useEffect } from 'react'
// import vid1 from './anime.mp4'
// import vid2 from './goku.mp4'
// import vid3 from './name.mp4'
// import vid4 from './rakt.mp4'
// import Videos from './Videos'

// function Ioa() {
//     const [sources, setSources] = useState([{ url: vid1 }, { url: vid2 }, { url: vid3 }, { url: vid4 }])
//     const callback = entries => {
//         entries.forEach(element => {
//             console.log(element);
//             let childVideo = element.target.childNodes[0];
//             childVideo.play().then(() => {
//                 // if video is not in viewport then pause it
//                 if (!childVideo.paused && !element.isIntersecting) {
//                     childVideo.pause();
//                 }
//             })
//         });
//     }
//     const observer = new IntersectionObserver(callback, {
//         threshold: 0.9
//     })
//     useEffect(() => {
//         let elements = document.querySelectorAll('.videos');
//         elements.forEach(allVideo => {
//             // we can put an observer in video by observe
//             observer.observe(allVideo);
//         })
//     })
//     return (
//         <div className='video-container'>
//             <div className='videos'>
//                 <Videos source={sources[0].url} />
//             </div>
//             <div className='videos'>
//                 <Videos source={sources[1].url} />
//             </div>
//             <div className='videos'>
//                 <Videos source={sources[2].url} />
//             </div>
//             <div className='videos'>
//                 <Videos source={sources[3].url} />
//             </div>
//         </div>
//     )
// }

// export default Ioa
