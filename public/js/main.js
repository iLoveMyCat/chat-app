//get username from URL using qs
//location.search for the url
const {username, color} = Qs.parse(location.search, { ignoreQueryPrefix: true});

//  io(), with no specified URL defaultly trying to connect to the host that serves the page.
var socket = io();
window.onload = function () {
    socket.emit('join server', {username, color});
    
    var form = document.getElementById('chat-form');
    var input = document.getElementById('input');
    var messages = document.getElementById('messages');
    var userList = document.getElementById('users');
    var typingFeedback = document.getElementById('typing-feedback');



    if(form && input){
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if(input.value) {
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
            messages.scrollTo(0, document.body.scrollHeight);
            messages.scrollTop = document.body.scrollHeight;
        });

        //room users
        socket.on('room users', ({users}) =>{
            outputUsers(users);
        });

        function outputUsers(users){
            userList.innerHTML = `
                ${users.map(user => `<li>${user.username}</li>`).join('')}
            `
        }

        //user is typing emit
        input.oninput = ()=>{
            socket.emit('user typing');
        };

        //capture usertyping
        socket.on('user typing', (username)=>{
            someoneIsTyping(username);
        });

        function someoneIsTyping(username){
            typingFeedback.classList.remove("typing");
            typingFeedback.offsetHeight;
            typingFeedback.innerHTML = `${username} is typing...`;
            typingFeedback.classList.add("typing");
        }
        function reset_animation() {
            var el = document.getElementById('animated');
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 
          }
    }
};    

    