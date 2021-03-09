import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './MobileVersion.css';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { setUser, clearCart } from '../../../actions/action';
import { connect } from "react-redux";
import isEmpty from 'lodash.isempty';


const allPlants = ['Cactus', 'Caanta', 'Cillar', 'Lily', 'Lemon', 'Limca'];
class MobileVersion extends React.Component {

    state = {
        searchInput: '',
        results: []
    }


    componentDidMount() {
        if (document.getElementById('mobile__header').classList.contains('show_nav')) {
            document.getElementById('card__style').classList.add('card__style')
        }
    }


    onChangeHandler = (event) => {
        console.log('Element entered is:-', event.target.value);
        this.setState({
            searchInput: event.target.value
        })
        const results = allPlants.filter((val) => {
            if (val.includes(event.target.value))
                return val
        });
        console.log('Results searched are:-', results);
        this.setState({
            results
        })
    }


    toggle = () => {
        document.getElementById('mobile__header').classList.toggle('show_nav');
        if (document.getElementById('mobile__header').classList.contains('show_nav')) {
            if (document.getElementById('card__style')) {
                document.getElementById('card__style').classList.add('card__style')
            }
        } else {
            if (document.getElementById('card__style')) {
                document.getElementById('card__style').classList.remove('card__style')
            }
        }
    }

    selectedValue = (val) => {
        console.log('Value clicked is:-', val)
        this.setState({
            searchInput: val,
            results: []
        })
        this.props.history.push('/searchedplant/' + val)
    }

     shoppingCartHandler = () => {
        isEmpty(this.props.myUser) ? this.props.history.push('/') : this.props.history.push('/checkout')
    }

    render() {
        return (
            <div id="mobile__header" className="mobile__header">
                <div onClick={this.toggle}>
                    <MenuIcon style={{ margin: '20px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    <input
                        onChange={this.onChangeHandler}
                        autoComplete="off"
                        className="search" type="text"
                        id="search" placeholder="Search"
                        value={this.state.searchInput}
                        style={{
                            borderRadius: '5px', border: 'none',
                            height: '30px',
                            margin: '0px'
                        }} />
                    {
                        this.state.results.length > 0 &&
                        (
                            <div id="results" style={{
                                position: 'absolute', width: '70%', top: '80%',
                                border: '1px solid gray', backgroundColor: 'mintcream', borderRadius: '10px'
                                , zIndex: '100'
                            }}>
                                {
                                    this.state.results.map(val =>
                                        <p style={{
                                            color: 'black',
                                            margin: '0px',
                                            border: '1px dotted gray',
                                            cursor: 'pointer'
                                        }} onClick={() => this.selectedValue(val)}>{val}</p>)
                                }
                            </div>
                        )
                    }
                    <div style={{ display: 'flex', flexDirection: 'column' }} onClick={this.shoppingCartHandler}>
                    {
                        !isEmpty(this.props.myUser) &&   <p style={{ margin: '0' }}>{this.props.count}</p>
                    }  
                        <ShoppingCartIcon />
                    </div>
                </div>

                <nav>
                    <ul>
                        <li><Link style={{ textDecoration: 'none' }} onClick={() => {
                            this.props.history.push('/')
                            document.getElementById('mobile__header').classList.remove('show_nav')
                            if (document.getElementById('card__style')) {
                                if (document.getElementById('card__style').classList.contains('card__style')) {
                                    document.getElementById('card__style').classList.remove('card__style')

                                }
                            }
                            if (document.getElementById('card__style')) {
                                if (document.getElementById('card__style').classList.contains('show_nav')) {
                                    document.getElementById('mobile__header').classList.remove('show_nav')
                                }
                            }
                           
                        }
                        }>Home</Link></li>
                        <li><Link style={{ textDecoration: 'none' }}>Shop</Link></li>
                        <li><Link style={{ textDecoration: 'none' }}>About</Link></li>
                        <li><Link style={{ textDecoration: 'none' }}>Get In Touch</Link></li>

                        {!isEmpty(this.props.myUser) ?
                            <li><Link style={{ textDecoration: 'none' }} onClick={() => {
                                document.getElementById('mobile__header').classList.remove('show_nav')
                                this.props.logout()
                            }

                            }
                            >Logout</Link></li>
                            : <li><Link style={{ textDecoration: 'none' }} onClick={() => {
                                document.getElementById('mobile__header').classList.remove('show_nav')
                                this.props.setModalHandler()
                            }
                            }>Login</Link></li>

                        }
                    </ul>
                </nav>
            </div>
        )
    }

}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileVersion));