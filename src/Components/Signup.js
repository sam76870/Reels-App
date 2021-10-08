import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { signup } = useContext(AuthContext);

    // console.log(signup);
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            console.log(uploadTaskListener);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn-1 -> progress tracking
            // fn 2 -> error
            // fn 3 -> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
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
                    setError('');
                    console.log(error);
                }, 2000)
                setLoading(false);
            }
            // fn3 check succesion of fully uploaded
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profielUrl: downloadUrl,
                    postsId: []
                })


            }
            setLoading(false);
            console.log('user has signedup');
        }
        catch (err) {
            console.log(err);
            setError(err);
            setTimeout(() => setError(''), 2000);
            setLoading(false);
        }
    }
    const handleFilesSubmit = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file != null) {
            setFile(file);
        }
    }
    return (
        <div>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor=''>UserName</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='profile'>Profile Image</label>
                    <input type='file' accept='image*/' onChange={handleFilesSubmit} />
                </div>
                <button type='submit' disabled={loading}>Sign In</button>
            </form>
        </div>
    )
}

export default Signup
