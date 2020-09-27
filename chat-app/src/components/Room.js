import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Room.css';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InfoMessage from './InfoMessage';

let socket;

function Room({ location }){

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let [displayMessages, setDisplayMessages] = useState([]);
    const {name, room} = queryString.parse(location.search);
    const ENDPOINT = 'http://localhost:8000';
    let prevMessage;

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.on('prev-messages', (messages) => {
            setDisplayMessages(messages.map(val => {
                let myText;
                let myPrevMessage;
                if(!prevMessage){
                    prevMessage = val.name
                }else{
                    (prevMessage == val.name) ?  myPrevMessage = true : myPrevMessage = false;
                    prevMessage = val.name;
                }

                (val.name == name)? myText = true : myText = false;
                return <Message text={val.message} name={val.name} myText={myText} myPrevMessage={myPrevMessage}/>
            }))
        })

        socket.emit('join-room', {name, room});

        socket.on('user-joined-message', (messages) => {
            const newMessages = messages.map((val) => {
                if(val.name == 'admin'){
                    return <InfoMessage message={`${val.name} has joined!`} />
                }else{
                    let myText;
                let myPrevMessage;
                if(!prevMessage){
                    prevMessage = val.name
                }else{
                    (prevMessage == val.name) ?  myPrevMessage = true : myPrevMessage = false;
                    prevMessage = val.name;
                }

                (val.name == name)? myText = true : myText = false;
                return <Message text={val.message} name={val.name} myText={myText} myPrevMessage={myPrevMessage}/>
                }
            })
        })

        socket.on('new-messages', (data) => {
            setDisplayMessages(data.map(val => {
                let myText;
                
                let myPrevMessage;
                if(!prevMessage){
                    prevMessage = val.name
                }else{
                    (prevMessage == val.name) ?  myPrevMessage = true : myPrevMessage = false;
                    prevMessage = val.name;
                }
                
                (val.name === name)? myText = true : myText = false;
                return <Message text={val.message} name={val.name} myText={myText} myPrevMessage={myPrevMessage}/>
            }))  
        })

        return() => {
            socket.emit('disconnect')
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        const data = {message: messages[messages.length - 1], name};
        socket.emit('new-message', data);
        //display your own message
        let myPrevMessage;
        if(!prevMessage){
            prevMessage = data.name
        }
        (prevMessage == data.name) ?  myPrevMessage = true : myPrevMessage = false;
        prevMessage = data.name;
            
        const newMessage = <Message text={data.message} name={name} myText={true} myPrevMessage={myPrevMessage}/>
        setDisplayMessages([...displayMessages, newMessage]);
    }, [messages])

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages([...messages, message]);
        setMessage('');
    };

    return(
        <div className="outer-container">
            <div className="inner-container">
                <h1>{room}</h1>
                <ScrollToBottom className="messages-container">
                    {displayMessages}
                </ScrollToBottom>
                <form className="form-container-room" onSubmit={handleSubmit}>
                    <input required type="text" placeholder="Type in your message!" value={message} onChange={e => setMessage(e.target.value)}/>
                    <button type="submit"><ArrowForwardIcon style={{fill: "#7373FA"}}/></button>
                </form> 
            </div>
        </div>
    );
}

export default Room;

