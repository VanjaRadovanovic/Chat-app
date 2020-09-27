import React from 'react';

function InfoMessage({message}){
    const style={color: 'grey'}

    return(
    <p style={style}>{message}</p>
    )
}

export default InfoMessage;