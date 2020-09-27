import React from 'react';
import './Message.css';

function Message({text, name, myText, myPrevMessage}){
    let classes;
    let nameStyles;
    let classForOneMessageContainer = 'one-message-countainer ';
    (myText) ? classes = 'my-message' : classes = 'other-message';
    
    if(myPrevMessage || myText){
        nameStyles = {display: 'none'};
    }
    if(myPrevMessage){
        classForOneMessageContainer += 'no-margin-top';
    }

    return(
    <div className={classForOneMessageContainer}>
        <div className={classes}>
            <p style={nameStyles}>{name}</p>
            <div className='message'>{text}</div>
        </div>
    </div>
    )
}

export default Message;