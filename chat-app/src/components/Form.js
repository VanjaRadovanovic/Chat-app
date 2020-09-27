import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

function Form(){
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const color = {fill: '#8C8C8C !important'}

    const handleSubmit = (e) => {
        
        if(!name || !room){
            e.preventDefault();
            return;
        }
     }

    return(
        <div className="container">
            <div className="form-container">
            <h2 className="title">Login</h2>
            <form>
                <label className="form-label">
                    <div className="input">
                        <input maxLength="20" id="Name" required type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        <PersonIcon styles={color}/>
                    </div>
                </label>
                <label className="form-label">
                    <div className="input">
                        <input maxLength="20" id="Room" required type="text" placeholder="Room name" value={room} onChange={e => setRoom(e.target.value)} />
                        <MeetingRoomIcon styles={color}/>
                    </div>
                </label>
                <Link to={`/room?name=${name}&room=${room}`} onClick={handleSubmit}>
                    <button className="form-button" type="submit">Join room</button>
                </Link>
            </form>
            </div>
        </div>
    );
}



export default Form;

