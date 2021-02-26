import { Map as iMap } from 'immutable';
import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import './Address.css';
import { connect } from "react-redux";
import Addresses from './Addresses/Addresses';
import AddressSelected from './AddressSelected/AddressSelected'

class Address extends React.Component {

    state = {
        address: {
            id: '',
            hno: '',
            sector: '',
            city: '',
            state: ''
        },
        existingAddresses: [],
        addressSelected: false
    }

    getAddresses = async () => {
        const { email = '' } = this.props.user.toJS();
        fetch('http://localhost:8085/flora/user/addresses/' + email)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                const { user = {} } = res;
                const { address = [] } = user;
                console.log('Addresses in mount are:-', address);
                this.setState({
                    existingAddresses: address.map(({ hno, sector, city, state, _id }) => {
                        return {
                            hno, sector, city, state, id: _id
                        }
                    }),
                    address: {}
                })
            })
    }


    removeAddress = (addressId) => {
        const { email = '' } = this.props.user.toJS();
        console.log('Address to be removed is:-', addressId);
        fetch('http://localhost:8085/flora/user/addresses/delete/' + addressId + '/' + email, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('Response after deleting is:-', res);
                return res.json()
            })
            .then(() => {
                this.getAddresses();
            })
    }

    componentDidMount() {
        this.getAddresses();
    }

    onChangeHandler = (event, id) => {
        const { address = {} } = this.state;
        this.setState({
            address: { ...address, [id]: event.target.value }
        })

    }

    addAddress = () => {
        const { address = {} } = this.state;
        const { user = iMap({}) } = this.props;
        const { email = '' } = user.toJS();

        fetch('http://localhost:8085/flora/user/address/' + email, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address
            })
        })
            .then((response) => {
                return response.json()
            })
            .then(() => {
                this.getAddresses();
            })
    }

    componentWillUnmount() {
        this.setState({
            address: {}
        })
    }

    submitHandler = (id,obj) => {
        console.log('Value that has been seleced is:-', id,obj);
        this.setState({
            addressSelected: true,
            address: {...obj}
        })
    }

    render() {
        const { address = {}, existingAddresses = [], addressSelected } = this.state;
        const { hno = '', sector = '', city = '', state = '' } = address;
        const status = Object.values(address).map(val => val).includes('')

        return (
            <div>
                {
                    !addressSelected ? (
                        <div style={{ display: 'flex', marginTop: '100px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Addresses
                                existingAddresses={existingAddresses}
                                removeAddress={this.removeAddress}
                                submitHandler={this.submitHandler} />
                            <Accordion style={{ width: '400px', backgroundColor: '#fff', cursor: 'pointer' }}>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                    Want to add a new Address ?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <label for="hno">House Number:</label>
                                            <div style={{ textAlign: 'center' }}><input value={hno} onChange={(event) => this.onChangeHandler(event, 'hno')} type="text" id="hno" /></div>
                                        </div>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <label for="sector">Sector:</label>
                                            <div style={{ textAlign: 'center' }}><input onChange={(event) => this.onChangeHandler(event, 'sector')} value={sector} type="text" id="sector" /></div>
                                        </div>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <label for="city">City:</label>
                                            <div style={{ textAlign: 'center' }}><input onChange={(event) => this.onChangeHandler(event, 'city')} value={city} type="text" id="city" /></div>
                                        </div>
                                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <label for="state">State:</label>
                                            <div style={{ textAlign: 'center' }}><input onChange={(event) => this.onChangeHandler(event, 'state')} value={state} type="text" id="state" /></div>
                                        </div>
                                        <div onClick={() => this.addAddress()} style={{ textAlign: 'center' }}>
                                            <button disabled={status} style={{ width: '50%' }}>Add Address</button>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Accordion>
                        </div>) : <AddressSelected address={address} />
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.get('user'),
    };
};


export default connect(mapStateToProps)(Address);