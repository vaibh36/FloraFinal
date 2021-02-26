import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

const SinglePlant = () =>{

    return(
        <div>
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
                <Card.Text style={{ position: 'absolute', top: '40px', left: '60%' }}><span style={{ fontSize: '10px' }}>Quantity</span></Card.Text>
                {!isEmpty(myUser) &&
                    <div style={{
                        cursor: 'pointer', left: '60%',
                        position: 'absolute', bottom: '5px',
                        display: 'flex',
                    }}>
                        <div style={{ border: '1px solid gray', borderRadius: '10px', marginRight: '10px' }}>
                            <span onClick={() => this.addToCart(plant)} style={{ borderRight: '1px gray solid', padding: '8px', paddingTop: '2px', paddingBottom: '2px' }}>+</span>
                            <span style={{ padding: '15px' }}>1</span>
                            <span onClick={() => this.removeFromCart(plant)} style={{ borderLeft: '1px gray solid', padding: '8px', paddingTop: '2px', paddingBottom: '2px' }}>-</span>
                        </div>
                        <button style={{ width: '100%', height: '30px', borderRadius: '10px', fontSize: '10px' }}>Add to Cart</button>
                    </div>
                }
            </Card.Body>
        </Card>
        </div>
    )

}

export default SinglePlant;