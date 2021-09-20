const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');

const chatIdentity = document.getElementById('chatidentity').value
const chatroom = document.getElementById('chatroom').value;

chatMessages.scrollTop = chatMessages.scrollHeight;

const socket = io();

// Join chatroom
socket.emit('join-room_admin', { chatroom });

// Message from server
socket.on('message', (message) => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('send-message_admin', {
		admin: chatIdentity,
		chatroom,
		message: msg
	});

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();

	outputMessage(msg, true);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Output message to DOM
function outputMessage(message, isAdmin = false) {
  const div = document.createElement('div');
  div.classList.add('message');
	if(isAdmin) div.classList.add('ml-auto');
	if(isAdmin) div.classList.add('admin');
  // const p = document.createElement('p');
  // p.classList.add('meta');
  // p.innerText = message.username;
  // p.innerHTML += `<span>${message.time}</span>`;
  // div.appendChild(p);
  console.log(message);
  if(message.isAudio){
    const audio = document.createElement('audio');
    audio.setAttribute('controls', true);
    const source = document.createElement('source');
    source.setAttribute('src', "/files/chat/" + message.body)
    source.setAttribute('type', "audio/mpeg");
    audio.appendChild(source);
    div.appendChild(audio);
  }
  else {
    const para = document.createElement('p');
    para.classList.add('text'); 
    para.innerText = message.body;
    div.appendChild(para);
  }
  document.querySelector('.chat-messages').appendChild(div);
}

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../chat';
  } else {
  }
});