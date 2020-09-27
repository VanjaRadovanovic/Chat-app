let users = [];

function addUser(name, callback){
    
    let sameUser = users.filter((val) => {
        return val.name === name;
    });
    if(sameUser.length > 0){
        return callback('This username is teken!');
    }
    
    users = [...users, {name}];
    console.log(name, users, 'Picketine matere')
}

function removeUser(id){
    let user = users.findIndex(val => val.id == id);
    users.slice(user, 1);
}

export { addUser, removeUser };