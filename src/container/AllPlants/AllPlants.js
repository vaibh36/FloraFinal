import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { setPlantType, addItems } from '../../actions/action';
import { List as iList, Map as iMap } from 'immutable';
import chunk from 'lodash.chunk';
import { Card, Button, Modal } from 'react-bootstrap';
import './AllPlants.css';
import AddIcon from '@material-ui/icons/Add';
import isEmpty from 'lodash.isempty';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';


class AllPlants extends React.Component {


    state = {
        modal: false,
        name: '',
        description: '',
        backdrop: true,
        imageUrl: '',
        msg: ''
    }

    componentDidMount() {
        fetch('http://localhost:8085/flora/allPlants/' + this.props.match.params.id)
            .then((response) => {
                console.log('Response is:-', response);
                return response.json()
            })
            .then((data) => {
                console.log('Data to be added is via redis:-', data.plants)
                if (typeof data.plants === 'object')
                    this.props.setPlants(data.plants);
                else {
                    console.log('Data to be added is:-', data.plants)
                    this.props.setPlants(JSON.parse(data.plants));
                }
            })
            .catch((err) => {

            })
    }

    componentWillUnmount() {
        this.props.setPlants([]);
    }


    addToCart = (plant) => {
        const { myUser = {}, addItems } = this.props;
        const item = {
            [plant._id]: plant
        }
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

    showPlantData = (plant) => {
        this.setState({
            modal: true,
            name: plant.name,
            description: plant.description,
            imageUrl: plant.imageUrl
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

    render() {
        const { modal, name, description, imageUrl } = this.state;
        const { plantsData = iList([]), myUser = {}, cart = iMap({}) } = this.props;
        const rows = chunk(plantsData.toJS(), 2);
        console.log('Rows are:-', rows, rows.length);
        return (
            !modal ? (
                rows.length > 0 ? (
                    <div className="plants__view">
                        {
                            rows.map((row) => (
                                <div className="allplants" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    {
                                        row.map((plant) => (
                                            <div className="card__external">
                                                <Card id="card__style" style={{ height: '100%' }}>
                                                    <Card.Img src={plant.imageUrl} className="img_sizing"></Card.Img>
                                                    <Card.Body style={{ position: 'relative' }}>
                                                        <Card.Title>{plant.name}</Card.Title>
                                                        <div><StarIcon style={{
                                                            cursor: 'pointer', left: '10px',
                                                            position: 'absolute', top: '5px', color: 'gold'
                                                        }} />
                                                        </div>
                                                        <div onClick={() => this.showPlantData(plant)}>
                                                            <span style={{
                                                                cursor: 'pointer', left: '65%',
                                                                position: 'absolute', top: '5px'
                                                            }}>Know more</span>
                                                            <InfoIcon style={{
                                                                cursor: 'pointer', left: '88%',
                                                                position: 'absolute', top: '5px'
                                                            }} />
                                                        </div>
                                                        <Card.Text style={{ position: 'absolute', top: '50px', left: '10px' }}><i class="fa fa-inr"></i><span style={{ fontWeight: '700' }}>{plant.price}</span></Card.Text>
                                                        
                                                        {
                                                            !isEmpty(myUser) && 
                                                        <Card.Text className="quantity__text" style={{ position: 'absolute', left: '60%' }}><span style={{ fontSize: '10px' }}>Quantity</span></Card.Text>

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
                                                                <button style={{ width: '100%', height: '30px', borderRadius: '10px', fontSize: '10px' }}>Add</button>
                                                            </div>
                                                        }
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>) : <p>No data found</p>
            ) :
                <Modal size='lg' centered show={modal} onHide={() => this.setState({ modal: false })}>
                    <Modal.Header>
                        <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '20px' }}><img src={imageUrl} /></div>
                            <div style={{ marginTop: '45px' }}>{description}</div>
                        </div>

                    </Modal.Body>
                </Modal>

        )
    }

}


const mapStateToProps = (state) => {
    return {
        plantsData: state.get('plantSearchResult'),
        myUser: state.get('user').toJS(),
        cart: state.get('cart'),
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setPlants: res => dispatch(setPlantType(res)),
        addItems: (item) => dispatch(addItems(item))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPlants));