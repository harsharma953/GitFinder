import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//firebase

import firebase from 'firebase/app';
import "firebase/auth"
import firebaseConfig from './Config/FirebaseConfig';


//Components
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';
import Signin from './Pages/SignIn';
import Signup from './Pages/Signup';
import { UserContext } from './Context/UserContext';
import Footer from './Layout/Footer';
import Header from './Layout/Header';


firebase.initializeApp(firebaseConfig);

function App() {
  
  const [user,setUser] = useState(null);

  
  return (
    <Router>
      <ToastContainer/>
      <UserContext.Provider value = {{user,setUser}}>
        <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="*" component={PageNotFound} />
              
            </Switch>
            <Footer></Footer>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
