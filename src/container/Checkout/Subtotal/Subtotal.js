import React from 'react';
import {Map as iMap} from 'immutable';
import {withRouter, useHistory} from 'react-router-dom'

const Subtotal = React.memo(({items = iMap({})})=>{
    const history = useHistory();
    const [total, setTotal] = React.useState(null)
    React.useEffect(()=>{
        setTotal(Object.keys(items.toJS()).reduce((acc ,key)=>{
           return acc = acc + (items.toJS()[key].price * items.toJS()[key].quantity)
        }, 0));
    })
    return(
        <div style={{marginTop: '20px'}}>
            <p><i class="fa fa-inr"></i>{total}</p>
            <button onClick={() => history.push('/address')}>Checkout</button>
        </div>
    )

})

export default withRouter(Subtotal);