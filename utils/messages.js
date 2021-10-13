const moment = require('moment');

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a'),
        color: generateMessageColor(username)
    }
}

function generateMessageColor(str){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

module.exports = formatMessage;