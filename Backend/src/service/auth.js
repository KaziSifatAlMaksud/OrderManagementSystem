const jwt = require('jsonwebtoken');
const secret = "secret";
function setUser(user) {
    return jwt.sign(user, secret);
}


function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}   