const users = [];

function userJoin(id, username, color){
    const user = { id, username, color};

    users.push(user);

    return user;
}

function userLeft(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

function getCurrentUser(id){
    return users.find(user => user.id === id);
}

function getAllUsers(id){
    return users;
}

module.exports = {
    userJoin,
    getCurrentUser,
    getAllUsers,
    userLeft
}