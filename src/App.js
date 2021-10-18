import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AuthProvider from './Context/AuthProvider';
import Main from './MaterialUI/Main';
import Ioa from './Components/Ioa';
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route }from 'react-router-dom';

function App() {
  return (
    // <>
    //   <AuthProvider>
    //     <Signup/>  
    //     <Login />
    //   </AuthProvider>
      // <Main/>
    //   <Ioa/>
    //  </>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/'component={Feed}/>
          <Route path='/login'component={Login}/>
          <Route path='/signup'component={Signup}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
