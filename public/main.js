//  io(), with no specified URL defaultly trying to connect to the host that serves the page.
var socket = io();

window.onload = function () {
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var messages = document.getElementById('messages');


    if(form && input){
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
            }
        });

        //capture a chat message event from the server to include in the page
        socket.on('chat message', function(msg) {
            var item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
};    

    