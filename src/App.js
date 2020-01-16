import React from 'react';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout-out/checkout-out';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //checking to see if user is auth 
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }, () => {
            //console can't go after setState bc it is async, must add callback function to see log when state is set
            console.log(this.state);
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render () {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/crwn-clothing' component={HomePage}/>
          <Route path='/crwn-clothing/shop' component={ShopPage}/>
          <Route exact path='/crwn-clothing/checkout' component={CheckoutPage}/>
          <Route 
            exact 
            path='/signin' 
            render={() => this.props.currentUser ? 
            (<Redirect to='/'/>) 
            : 
            (<SignInAndSignUp/>)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
