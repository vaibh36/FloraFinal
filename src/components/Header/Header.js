import React from 'react';
import './Header.css';
import * as constants from '../../Constants';
import { Link, useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { clearCart, setUser } from '../../actions/action';
import { connect } from "react-redux";
import isEmpty from 'lodash.isempty';
import { auth } from '../../firebase';
import { useMediaQuery } from 'react-responsive';
import MobileVersion from './MobileVersion/MobileVersion';

const allPlants = ['Cactus', 'Caanta', 'Cillar', 'Lily', 'Lemon', 'Limca'];

const Header = ({ count, clearCart, myUser, setUsr, setModalHandler, logout, setRouteViaHeader }) => {
    const history = useHistory();
    const [user, updateUser] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [hide, setHide] = React.useState(true);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 980px)'
    })

    console.log('Value for desktop is:-', isDesktopOrLaptop)

    React.useEffect(() => {
        updateUser(myUser.email)

        return () => {
            document.addEventListener('click', () => {
                setSearchResults([])
            })
        }
    }, [count]);

    const logOut = () => {
        logout();
        clearCart()
        history.push('/')
    }

    const shoppingCartHandler = () => {
        isEmpty(myUser) ? history.push('/') : history.push('/checkout')
    }


    const onChangeHandler = (event) => {
        setSearchInput(event.target.value);
        console.log('Element entered is:-', event.target.value)
        const results = allPlants.filter((val) => {
            if (val.includes(event.target.value))
                return val
        });
        console.log('Results searched are:-', results);
        setSearchResults(event.target.value ? results : []);
    }


    const setSearchedValue = (val) => {
        console.log('Value clicked is:-', val, setRouteViaHeader);
        setSearchInput(val);
        document.getElementById('results').classList.add('hide__dropdown');
        setRouteViaHeader(val)
    }



    return (
        <React.Fragment>
            { isDesktopOrLaptop ?
                <div className="header__container">
                    <ul className="items">
                        <li><Link className="items__link" onClick={() => history.push('/')}>{constants.Home}</Link></li>
                        <li><Link className="items__link" onClick={() => history.push('/allplants/all')}>{constants.Shop}</Link></li>
                        <li>{constants.About}</li>
                        <li>{constants.getinTouch}</li>

                        {
                            isEmpty(myUser) ?
                                <li><Link className="items__link" onClick={setModalHandler}>{constants.Login}</Link></li>
                                :
                                <li style={{ marginTop: '0px' }}>
                                    <div style={{ marginTop: '5px' }}>
                                        <p style={{ marginBottom: '0px', fontWeight: '100' }}>Signed in as:</p>
                                        <span>{user}</span>
                                        <div>
                                            <Link className="items__link" onClick={logOut} style={{ margin: '0px', fontWeight: '100' }}>Logout</Link>
                                        </div>
                                    </div>
                                </li>
                        }
                        <li>
                            <div style={{ position: 'relative', display: 'flex' }}>
                                <input
                                    onChange={(event) => onChangeHandler(event)}
                                    value={searchInput} autoComplete="off"
                                    className="search" type="text"
                                    id="search" placeholder="Search"
                                    style={{ borderRadius: '5px', border: 'none', width: '200px', height: '30px' }} />

                                {
                                    searchResults.length > 0 &&
                                    (
                                        <div id="results" style={{
                                            position: 'absolute', width: '100%', marginTop: '30px',
                                            border: '1px solid gray', backgroundColor: 'mintcream', borderRadius: '10px'
                                        }}

                                        >
                                            {
                                                searchResults.map((val) => {
                                                    return <p onClick={() => setSearchedValue(val)} style={{ color: 'black', margin: '0px', border: '1px dotted gray', cursor: 'pointer' }}>{val}</p>
                                                })
                                            }
                                        </div>
                                    )
                                }

                                <div style={{ left: '210px', bottom: '10px', position: 'absolute' }} onClick={shoppingCartHandler}>
                                    {!isEmpty(myUser) && <p style={{ margin: '0px' }}>{count}</p>}
                                    <ShoppingCartIcon style={{ cursor: 'pointer', marginTop: '0px' }} />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div> : <MobileVersion setModalHandler={setModalHandler} logout={logOut} />
            }
        </React.Fragment>

    )
};

const mapStateToProps = (state) => {
    return {
        count: state.get('count'),
        myUser: state.get('user').toJS(),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsr: val => dispatch(setUser(val)),
        clearCart: () => dispatch(clearCart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);