const chat = document.getElementById('chat');
const input = document.getElementById('msg');
const sendBtn = document.getElementById('send');

function sendMessage() {
  const t = input.value.trim();
  if (!t) return;

  add('YOU: ' + t, 'user');
  input.value = '';

  const aiMsg = add('J.A.R.V.I.S: Processing...', 'ai');

  setTimeout(() => {
    aiMsg.innerText = 'J.A.R.V.I.S: ' + getReply(t);
    chat.scrollTop = chat.scrollHeight;
  }, 800);
}

function getReply(text) {
  const q = text.toLowerCase();
  if (q.includes('time')) {
    return 'The current time is ' + new Date().toLocaleTimeString() + ', Boss.';
  }
  if (q.includes('date')) {
    return 'Today is ' + new Date().toDateString() + ', Boss.';
  }
  if (q.includes('status')) {
    return 'AI Core and Network are online. Voice and Memory modules are currently locked.';
  }
  if (q.includes('hello') || q.includes('hi')) {
    return 'Hello, Boss. All active systems are ready.';
  }
  return 'Systems online. How may I assist you, Boss?';
}

function add(text, who) {
  const d = document.createElement('div');
  d.className = 'msg ' + who;
  d.innerText = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
  return d;
}

sendBtn.onclick = sendMessage;

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});
