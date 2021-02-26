import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { connect } from 'react-redux';
import { setUser } from '../../actions/action';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';


const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { modalIsOpen, setIsOpen } = props;


    const customStyles = {
        overlay: {
            backgroundColor: 'lightgray',
            opacity: 0.9,

        },
        content: {
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            backgroundColor: 'gray',
            transition: 'opacity 0.5s ease-in'
        }
    };



    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <CSSTransition in={modalIsOpen} timeout={1000}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                    closeTimeoutMS={1000}
                >
                    <div className="login__container">
                        <h1>Sign in</h1>
                        <form>
                            <h5>E-mail</h5>
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                            />
                            <h5>Password</h5>
                            <input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type="password"
                            />
                            <button onClick={() => props.login(email, password)} type="submit" className="login__signInButton">
                                Sign in
                            </button>
                        </form>
                        <button onClick={() => props.register(email, password)} className="login__registerButton">
                            Create your Flora Account
                        </button>
                        <button onClick={() => props.forgot()} className="login__registerButton">
                            Forgot Password
                        </button>
                    </div>
                </Modal>
            </CSSTransition>
        </div>
    )

}


const mapDispatchToProps = (dispatch) => {
    return {
        setUsr: usr => dispatch(setUser(usr))
    };
};

export default connect(null, mapDispatchToProps)(Login);