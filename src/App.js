import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Home from './container/Home/Home';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { setUser, addItems } from './actions/action';
import { auth } from './firebase';
import Modal from 'react-modal';
import CartItems from './container/Checkout/Checkout';
import { BounceLoader } from 'react-spinners';
import PlantTypes from './container/AllPlants/AllPlants';
import leftImage from './assets/logo.jpg';
import Address from './container/Address/Address';
import SearchedPlant from './components/Header/SearchedPlant/SearchedPlant';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';


Modal.setAppElement('#root')

function App(props) {
  const [modal, setModal] = React.useState(false);
  const [spinner, setSpinner] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    const { setUsr, addItems } = props;
    const unsubscribe = auth.onAuthStateChanged((authUser = {}) => {
      console.log('Value of auth change is:-', authUser);
      if (authUser) {
        console.log('Auth user is1:-', authUser.email);
        setUsr({
          email: authUser.email,
          uid: authUser.uid,
        });
        fetch('http://localhost:8085/flora/user/' + authUser.email)
          .then((response) => {
            console.log('Response is:-', response);
            return response.json()
          })
          .then((data) => {
            console.log('Final user data is:-', data);
            const { user = {} } = data;
            const { cart = {} } = user;
            const { products = [] } = cart;

            const myCart = products.reduce((acc, item) => {
              return {
                ...acc,
                [item.name]: item,
              };
            }, {});
            addItems(myCart)
          })
          .catch((err) => {
            setSpinner(false)
          })
        setSpinner(false)
      } else {
        console.log('Not defined auth user:-', authUser);
        setSpinner(false)
      }
    })
    return () => {
      setSpinner(false);
      unsubscribe();
    }
  }, []);

  const loginHandler = (email, password) => {
    setSpinner(true)
    const { setUsr } = props;


    setModal(false)
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log('Auth user is:-', authUser);
        fetch('http://localhost:8085/flora/user/' + authUser.email)
          .then((response) => {
            console.log('Response is:-', response);
            return response.json()
          })
          .then((data) => {
            console.log('Final user data is:-', data);
          })
          .catch((err) => {

          })

        setUsr({
          email: authUser.user.email,
          uid: authUser.user.uid,
        });
        setSpinner(false);
      })
      .catch((e) => {
        alert(e.message);
        setSpinner(false)
      });
  };

  const registerHandler = (email, password) => {
    const { setUsr } = props;
    setSpinner(true)
    setModal(false)
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        const { user = {} } = auth;
        setUsr({
          email: user.email,
          uid: user.uid,
        });
        console.log('Value of auth in register is:-', auth);
        setSpinner(false)
      })
      .catch((e) => {
        alert(e);
        setSpinner(false)
      });
  };

  const logoutHandler = () => {
    setSpinner(true);
    const { setUsr } = props;
    auth.signOut();
    setUsr({});
    setSpinner(false)
  }

  const removeDropdown = () => {
    console.log('Dropdown removed');
    if (document.getElementById('results')) {
      document.getElementById('results').classList.add('hide__dropdown')
    }
 
  }

  const forgotPassword = () => {
    setModal(false);
    history.push('/forgotpassword')
  }

  const onScrollEvent = () => {
    if(document.getElementById('mobile__header')){
      if (document.getElementById('mobile__header').classList.contains('show_nav')){
        document.getElementById('mobile__header').classList.remove('show_nav')
        if(document.getElementById('card__style')){
          document.getElementById('card__style').classList.remove('card__style')
        }
      }
    }
  }

  const setRouteViaHeader = (val)=>{
    history.push('/searchedplant/' + val)
  }

  return (

    !spinner ? (
      <div style={{ overflow: 'scroll', height: '100vh' }} 
      onScroll={() => onScrollEvent()} 
      onClick={() => removeDropdown()} className="App">
        {
          modal && <Login
            modalIsOpen={modal}
            setIsOpen={() => setModal(false)}
            login={loginHandler}
            register={registerHandler}
            forgot={forgotPassword}
          />
        }
        <Switch>
          <Route exact path='/'>
            <Header  setRouteViaHeader={setRouteViaHeader} setModalHandler={() => setModal(true)} logout={logoutHandler} />
            <Home />
          </Route>
          <Route exact path='/checkout'>
            <Header  setRouteViaHeader={setRouteViaHeader} setModalHandler={() => setModal(true)} logout={logoutHandler} />
            <CartItems />
          </Route>
          <Route exact path='/allplants/:id'>
            <Header  setRouteViaHeader={setRouteViaHeader} setModalHandler={() => setModal(true)} logout={logoutHandler} />
            <PlantTypes />
          </Route>
          <Route exact path='/address'>
            <Header  setRouteViaHeader={setRouteViaHeader} setModalHandler={() => setModal(true)} logout={logoutHandler} />
            <Address />
          </Route>

          <Route exact path='/searchedplant/:id'>
            <Header setRouteViaHeader={setRouteViaHeader} setModalHandler={() => setModal(true)} logout={logoutHandler} />
            <SearchedPlant />
          </Route>

          <Route exact path='/forgotpassword'>
            <Header setRouteViaHeader={setRouteViaHeader} setModalHandler={() => setModal(true)} logout={logoutHandler} />
            <ForgotPassword />
          </Route>

        </Switch>
      </div>) : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BounceLoader /></div>

  );
}

const mapStateToProps = (state) => {
  return {
    myUser: state.get('user').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsr: usr => dispatch(setUser(usr)),
    addItems: data => dispatch(addItems(data))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);