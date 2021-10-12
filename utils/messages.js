const moment = require('moment');

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a'),
        color: generateMessageColor(username)
    }
}

function generateMessageColor(username){
    var length = username.length;
    return "rgb(205,330,210)";
}

module.exports = formatMessage;