const chat = document.getElementById('chat');
const input = document.getElementById('msg');

// Replace with your fresh Gemini API key
const API_KEY = 'AQ.Ab8RN6LxlQL3vipwOJqffUyENHwR9na1T2YyIz0hXyV3QhzynQ';
const MODEL_NAME = 'gemini-1.5-flash'; 

document.getElementById('send').onclick = async () => {
    const t = input.value.trim();
    if (!t) return;
    
    add('YOU: ' + t, 'user');
    input.value = '';
    add('J.A.R.V.I.S: Processing...', 'ai');
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: t }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiReply = data.candidates[0].content.parts[0].text;
            chat.lastChild.innerText = 'J.A.R.V.I.S: ' + aiReply;
        } else {
            chat.lastChild.innerText = 'J.A.R.V.I.S: Error retrieving response.';
        }
    } catch (error) {
        chat.lastChild.innerText = 'J.A.R.V.I.S: Network connection error.';
    }
    
    chat.scrollTop = chat.scrollHeight;
};

function add(text, who) {
    const d = document.createElement('div');
    d.className = 'msg ' + who;
    d.innerText = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}
