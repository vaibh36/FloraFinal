import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './MobileVersion.css';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class MobileVersion extends React.Component {


    toggle = () => {
        document.getElementById('mobile__header').classList.toggle('show_nav')
    }

    render() {
        return (
            <div id="mobile__header" className="mobile__header">
                <div onClick={this.toggle}>
                    <MenuIcon style={{ margin: '20px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        autoComplete="off"
                        className="search" type="text"
                        id="search" placeholder="Search"
                        style={{ borderRadius: '5px', border: 'none', 
                        height: '30px',
                         margin: '0px' }} />
                    <div>
                    <ShoppingCartIcon />
                    </div>
                </div>

                <nav>
                    <ul>
                        <li><Link style={{ textDecoration: 'none' }} onClick={() => this.props.history.push('/')}>Home</Link></li>
                        <li><Link style={{ textDecoration: 'none' }}>Shop</Link></li>
                        <li><Link style={{ textDecoration: 'none' }}>About</Link></li>
                        <li><Link style={{ textDecoration: 'none' }}>Get In Touch</Link></li>
                        <li><Link style={{ textDecoration: 'none' }} onClick={() => this.props.setModalHandler()}>Login</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }

}

export default withRouter(MobileVersion);