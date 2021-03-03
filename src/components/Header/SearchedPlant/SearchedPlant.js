import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import isEmpty from 'lodash.isempty';
import { Card } from 'react-bootstrap';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import { Map as iMap } from 'immutable';
import { addItems } from '../../../actions/action';

class SearchedPlant extends React.Component {


    state = {
        plant: {},
        modal: false,
        name: '',
        description: '',
        backdrop: true,
        imageUrl: ''
    }


    componentDidMount = async () => {
        console.log('[componentDidMount] searchedPlant:-', this.props.match.params.id)
        const { myUser = {} } = this.props;
        const { email = '' } = myUser
        console.log('Url value is:-', this.props.match.params.id);
        const response = await fetch(`http://localhost:8085/flora/user/search/` + this.props.match.params.id);
        const res = await response.json();
        const { plant = {} } = res;
        this.setState({
            plant
        })

    }

    componentDidUpdate = async (prevProps) => {
        console.log('[componentDidUpdate] searchedPlant:-', this.props.match.params.id);
        if (this.props.match.params !== prevProps.match.params) {
            const response = await fetch(`http://localhost:8085/flora/user/search/` + this.props.match.params.id);
            const res = await response.json();
            const { plant = {} } = res;
            this.setState({
                plant
            })
        }
    }

    showPlantData = (plant) => {
        console.log('Plant clicked is:-', plant)
        this.setState({
            modal: true,
            name: plant.name,
            description: plant.description,
            imageUrl: plant.imageUrl
        })
    }

    addToCart = (plant) => {
        const { myUser = {}, addItems } = this.props;
        const item = {
            [plant._id]: plant
        }
        console.log('Item added:-', item);
        fetch('http://localhost:8085/flora/user/operation/' + myUser.email + '/' + 'ADDING', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: plant
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                const { cart = {} } = response;
                const { products = [] } = cart;
                const myCart = products.reduce((acc, item) => {
                    return {
                        ...acc,
                        [item.name]: item,
                    };
                }, {});

                console.log('My cart is:-', myCart)
                addItems(myCart)
            })
    }


    removeFromCart = (plant) => {
        const { cart = iMap({}), myUser, addItems } = this.props;
        const plantInfo = cart.get(plant.name);
        const { email } = myUser
        if (isEmpty(plantInfo)) {
            console.log('We need to stop')
            return
        } else {
            console.log('We need to call the api now')
        }
        fetch('http://localhost:8085/flora/user/operation/' + email + '/' + 'REMOVING', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: plantInfo.toJS()
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

    componentWillUnmount() {
        this.setState({
            plant: {}
        })
    }

    render() {
        const { plant = {} } = this.state;
        const { myUser = {}, cart } = this.props;
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                { !isEmpty(plant) ?
                    <Card style={{
                        width: '440px', marginTop: '10px',
                        marginBottom: '20px', boxShadow: '15px 10px 8px gray', height: '400px'
                    }}>
                        <Card.Img src={plant.imageUrl} style={{ height: '300px' }}></Card.Img>
                        <Card.Body style={{ position: 'relative' }}>
                            <Card.Title>{plant.name}</Card.Title>
                            <div><StarIcon style={{
                                cursor: 'pointer', left: '10px',
                                position: 'absolute', top: '5px', color: 'gold'
                            }} />
                            </div>
                            <div onClick={() => this.showPlantData(plant)}>
                                <span style={{
                                    cursor: 'pointer', left: '70%',
                                    position: 'absolute', top: '5px'
                                }}>Know more</span>
                                <InfoIcon style={{
                                    cursor: 'pointer', left: '90%',
                                    position: 'absolute', top: '5px'
                                }} />
                            </div>
                            <Card.Text style={{ position: 'absolute', top: '50px', left: '10px' }}><i class="fa fa-inr"></i><span style={{ fontWeight: '700' }}>{plant.price}</span></Card.Text>

                            {!isEmpty(myUser) &&
                                <Card.Text style={{ position: 'absolute', top: '40px', left: '60%' }}><span style={{ fontSize: '10px' }}>Quantity</span></Card.Text>
                            }
                            {!isEmpty(myUser) &&
                                <div style={{
                                    cursor: 'pointer', left: '60%',
                                    position: 'absolute', bottom: '5px',
                                    display: 'flex',
                                }}>
                                    <div style={{ border: '1px solid gray', borderRadius: '10px', marginRight: '10px' }}>
                                        <span onClick={() => this.addToCart(plant)} style={{ borderRight: '1px gray solid', padding: '8px', paddingTop: '2px', paddingBottom: '2px' }}>+</span>
                                        <span style={{ padding: '15px' }}>{cart.getIn([plant.name, 'quantity']) || 0}</span>
                                        <span onClick={() => this.removeFromCart(plant)} style={{ borderLeft: '1px gray solid', padding: '8px', paddingTop: '2px', paddingBottom: '2px' }}>-</span>
                                    </div>
                                    <button style={{ width: '100%', height: '30px', borderRadius: '10px', fontSize: '10px' }}>Add to Cart</button>
                                </div>
                            }
                        </Card.Body>
                    </Card> : <p>No such plant exist</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.get('count'),
        myUser: state.get('user').toJS(),
        cart: state.get('cart'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItems: (item) => dispatch(addItems(item))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchedPlant));