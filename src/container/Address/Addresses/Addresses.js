import React from 'react';
import chunk from 'lodash.chunk';
import './Addresses.css';


class Addresses extends React.Component {

    render() {
        const { existingAddresses = [], removeAddress, submitHandler } = this.props;
        console.log('Existing addresses are:-', existingAddresses);
        const rows = chunk(existingAddresses, 3);
        console.log('Rows are:-', rows)
        return (
            <div style={{ display: 'flex' }}>
                {
                    rows.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                rows.map((row) => {
                                    return <div className="addresses mobile__addresses">
                                        {
                                            row.map(({ hno, sector, city, state, id }) => {
                                                return (
                                                    <div style={{display: 'flex', margin: '20px' }}>
                                                        <div style={{width: '10%', display: 'flex', alignItems: 'center'}}>
                                                            <input onChange={() => submitHandler(id, {hno,sector,city,state})} type="radio" id="male"  value={id} />
                                                        </div>
                                                        <div>
                                                            <p >House Number: {hno}</p>
                                                            <p>Sector: {sector}</p>
                                                            <p>City: {city}</p>
                                                            <p style={{ marginBottom: '10px' }}>State: {state}</p>
                                                            <button>Deliver to this Address</button>
                                                            <button onClick={() => removeAddress(id)} style={{ width: '50%' }}>Remove Address</button>
                                                            </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    ) : <p>No previous addresses available</p>
                }
            </div>
        )
    }

}

export default Addresses;