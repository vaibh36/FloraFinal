import { Check } from '@material-ui/icons';
import React from 'react';
import './Checkout.css';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import { Map as iMap } from 'immutable';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addItems, removeItem } from '../../actions/action';
import Subtotal from './Subtotal/Subtotal';

const CartItems = ({ count = 0, cart = iMap({}), user, addItems, removeItem }) => {
    const history = useHistory();

    React.useEffect(() => {
        console.log('Value in checkout is:-', cart, cart.toJS(), cart.size);
        if (isEmpty(user.toJS())) {
            history.push('/')
        }
    }, [])


    const addToCart = (plant) => {
        console.log('Plant to be added is:-', plant);
        const { email = '' } = user.toJS();
        fetch('http://localhost:8085/flora/user/operation/' + email + '/' + 'ADDING', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: plant
            })
        })
            .then((response) => {
                console.log('Response is:-', response);
                return response.json()
            })
            .then((response) => {
                console.log('Response is:-', response);
                const { cart = {} } = response;
                const { products = [] } = cart;
                const myCart = products.reduce((acc, item) => {
                    return {
                      ...acc,
                      [item.name]: item,
                    };
                  }, {});
                  addItems(myCart)
            })
    }



    const removeFromCart = (plant) => {
        console.log('Plant to be removed is:-', plant);
        const { email = '' } = user.toJS();
        const item = {
            [plant.plantId]: plant
        }
        fetch('http://localhost:8085/flora/user/operation/' + email + '/' + 'REMOVING', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: plant
            })

        })
            .then((response) => {
                console.log('Response is:-', response);
                return response.json()
            })
            .then((response) => {
                console.log('Response is:-', response);
                console.log('Response is:-', response);
                const { cart = {} } = response;
                const { products = [] } = cart;
                const myCart = products.reduce((acc, item) => {
                    return {
                      ...acc,
                      [item.name]: item,
                    };
                  }, {});
                  addItems(myCart)
            })
    }

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className='checkout__ad'
                    src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/AMZN_OutletDeals_Template_March_1500x200_wh_EN.jpg'
                    alt='outlet ad'
                />
                {
                    count === 0 ? <h2>You do not have any item to checkout</h2> :
                        (
                            <div style={{ display: 'flex' }}>

                                <div style={{ display: 'flex', flex: '80%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', border: '1px solid gray', backgroundColor: 'lightgray' }}>
                                    {
                                        Object.values(cart.toJS()).map((item) => {
                                            return (
                                                <div style={{ margin: '20px 20px' }}>
                                                    <img src={item.imageUrl} />
                                                    <p>{item.name}: <span>
                                                        <span onClick={() => addToCart(item)}> <AddIcon style={{ cursor: 'pointer' }} /></span>
                                                        {item.quantity}<span onClick={() => removeFromCart(item)}><RemoveIcon style={{ cursor: 'pointer' }} /></span></span></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ flex: '20%', border: '1px solid gray', height: '200px', margin: '0px 20px', backgroundColor: 'lightgray' }}>This is the subtotal part
                                <Subtotal items={cart} />
                                </div>
                            </div>

                        )
                }
            </div>
        </div>
    )

}


const mapStateToProps = (state) => {
    return {
        count: state.get('count'),
        cart: state.get('cart'),
        user: state.get('user'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItems: (item) => dispatch(addItems(item)),
        removeItem: (item) => dispatch(removeItem(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);