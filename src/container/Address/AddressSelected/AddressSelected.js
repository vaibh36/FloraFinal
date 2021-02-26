import React from 'react';

const AddressSelected = ({address})=>{
    const {hno,city,state,sector} = address;
    return (
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
            <p>Address Selected:-</p>
            <div style={{border: '1px solid gray', width: '20%', padding: '10px'}}>
                <p>HouseNumber:{hno}</p>
                <p>Setor:{sector}</p>
                <p>City:{city}</p>
                <p>State:{state}</p>
            </div>
        </div>
    )
}

export default AddressSelected;