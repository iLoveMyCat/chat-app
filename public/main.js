//  io(), with no specified URL defaultly trying to connect to the host that serves the page.
var socket = io();

window.onload = function () {
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var messages = document.getElementById('messages');
    console.log(form,input,messages);
    if(form && input){
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if(input.value) {
                console.log(input.value);
                socket.emit('chat message',input.value);
                input.value = '';
            }
        });

        //capture a chat message event from the server to include in the page
        socket.on('chat message', function(msg) {
            var item = document.createElement('li');
            item.textContent = "[" + msg.time + "-"+  msg.username + "]: " + msg.text ;
            item.style.color = msg.color;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
            // window.scrollTop = document.body.scrollHeight;
        });
        input.focus;
    }
};    

    