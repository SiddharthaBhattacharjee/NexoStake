import React from 'react';
import { Card, Button } from 'react-bootstrap';

function CustomCard({ image, description, yesPrice, noPrice, onClick }) {
    return (
        <Card style={{ width: '18rem', margin: '1rem', cursor:'pointer',  }} className='box' onClick={onClick}>
            <Card.Img variant="top" style={{height:"50%"}} src={image} />
            <Card.Body style={{height:"50%"}}>
                <Card.Text>{description}</Card.Text>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                    <u style={{color:'green'}}>{yesPrice}</u>
                    <u style={{color:'red'}}>{noPrice}</u>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;
