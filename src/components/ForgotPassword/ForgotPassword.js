import React from 'react';
import {auth} from '../../firebase';

const ForgotPassword = () => {

    const [email, setEmail] = React.useState('');
    const [err, setErr] = React.useState(null)

    const sendEmail = ()=>{
        auth.sendPasswordResetEmail(email).then(function() {
           setEmail('');
           setErr('')
          }).catch(function(error) {
            console.log('Error is:-', error.code)
            setErr(error.code);
            setEmail('');
          });
    }

    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            marginTop: '110px',
        }}>

            <div>
                <h5>E-mail</h5>
                <input
                    style={{ width: '100%' }}
                    type="email"
                    onChange = {(event) => setEmail(event.target.value)}
                    value={email}
                />
                
                <button onClick={sendEmail}>Send Email</button>
                
                <p>{err}</p>
                
            </div>

        </div>
    )

}

export default ForgotPassword;