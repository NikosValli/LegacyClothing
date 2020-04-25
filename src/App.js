import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.component'; 
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages//sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
class App extends React.Component {

  unsubscribefromAuth=null;

  componentDidMount(){
    const {setCurrentUser}=this.props;
    this.unsubscribefromAuth=auth.onAuthStateChanged(async userAuth =>{
      if (userAuth){
        const userref=await createUserProfileDocument(userAuth);
        userref.onSnapshot(snapShot =>{
        setCurrentUser({
               id:snapShot.id,
            ...snapShot.data()
          });
        });
        

        }
       else{
       setCurrentUser(userAuth);

      }    
    });
  }

  componentWillUnmount(){
    this.unsubscribefromAuth();
  }

  render(){
    return (
      <div>
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage}/>
      <Route path='/signin' component={SignInAndSignUpPage}/>
  
      </Switch>
      </div>
    );

  }
  
}


const mapDispatchToProps=dispatch => ({
  setCurrentUser:user =>dispatch(setCurrentUser(user))

});

export default connect(null,mapDispatchToProps)(App);
