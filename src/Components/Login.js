import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { useHistory } from 'react-router-dom';
function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser, login, logout } = useContext(AuthContext)

    const handleSubmit = async () => {
        try {
            console.log(email + " " + password);
            setLoading(true);
            let res = await login(email, password);
            console.log(res.user);
            // setUser(res.user);
            setLoading(false);
            history.push('/');
        }
        catch (e) {
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000)
            setLoading(false);
        }
        setEmail('');
        setPassword('');
    }
    const handleSignOut = async () => {
        try {
            setLoading(true);
            let res = await logout();
            console.log(res);
            // setUser(null);
            setLoading(false);

        }
        catch (e) {
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000)
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(currentUser){
            history.push('/');
        }
    },[])
    return (
        <>
            {loading ? <h1>Please Wait.........loading </h1> : currentUser == null ?
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type='submit' disabled={loading}>Log In</button>
                        {error ? <h1>{error}</h1> : <></>}
                    </form>
                </div>
                 :
                <>
                    <button onClick={handleSignOut}>Log Out</button>
                 </>
            }
        </>
    )
}

export default Login
