const displayChatBox=()=>{
    document.querySelector('.chat-area').style.display="block"
}
document.getElementById('input').oninput=()=>{
    if(document.getElementById('input').value==""){
        document.getElementById('btn-send').style.display="none"
    }
    else{
        document.getElementById('btn-send').style.display="block"
    }
}
const chatInput = document.getElementById('input');

chatInput.addEventListener("input", () => {
    chatInput.style.height = "40px";
    chatInput.style.height = `${chatInput.scrollHeight}px`;
    chatInput.style.wordBreak = "break-word";
});
// console.log("Hello, world");
let modeDiv='light'
moding.innerHTML=`<i class="ri-moon-fill"></i>`
const mode=()=>{
    if(modeDiv=='light'){
        document.querySelector('.chat-area').style.background="#202528"
        modeDiv='dark'
        moding.innerHTML=`<i class="ri-sun-fill"></i>`
        chatInput.style.color="white"
        document.getElementById('btn-send').style.color="white"
    }
    else if(modeDiv=='dark'){
        document.querySelector('.chat-area').style.background="white"
        modeDiv='light'
        moding.innerHTML=`<i class="ri-moon-fill"></i>`
        chatInput.style.color="black"
        document.getElementById('btn-send').style.color="black"
    }
}
const apiKey='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'
// const apiKey = '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';
const chatContainer = document.querySelector('.displayChat'); // Assuming you have a single chat container element
const inputInitHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

function appendMessage(message, role) {
    if (role === 'bot') {
        const botImage = document.createElement('img');
        botImage.src = 'robot2.png'; // Replace with the actual path to your bot image
        botImage.alt = 'Bot Image';
        botImage.style.width = '30px'; // Set the width of the bot image as needed
        botImage.style.width = '30px'; // Set the width of the bot image as needed
        botImage.style.position = 'relative'; // Set the height of the bot image as needed
        botImage.style.top = '17px'; // Add some space between the image and the message
        botImage.style.backgroundColor = 'white'; // Add some space between the image and the message
        botImage.style.color = 'white'; // Add some space between the image and the message
        botImage.setAttribute('id', 'onlyImg')
        // console.log(botImage);
        chatContainer.appendChild(botImage);
    }
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(`${role}-message`);
    messageContainer.textContent = message;
    messageContainer.style.wordBreak = "break-word"
    messageContainer.style.width="50%"
    messageContainer.style.background="rgb(0, 110, 255)"
    messageContainer.style.borderTopRightRadius="10px"
    messageContainer.style.borderTopLeftRadius="10px"
    messageContainer.style.borderBottomRightRadius="10px"
    messageContainer.style.color="white"
    messageContainer.style.padding="10px"
    messageContainer.style.marginLeft="30px"
    chatContainer.appendChild(messageContainer);

  
}

// ... (existing code)

function send() {
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
        appendMessage(userMessage, 'user');
        appendMessage("Processing...", 'system'); // Display "Processing" message
        generateResponse(userMessage);
    }
    chatInput.value=""
}

function generateResponse(userMessage) {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: userMessage }]
        })
    };

    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            const botResponse = data.choices[0].message.content.trim();
            // Remove the "Processing" message
            const processingMessage = document.querySelector('.system-message');
            if (processingMessage) {
                chatContainer.removeChild(processingMessage);
            }
            appendMessage(botResponse, 'bot');
        })
        .catch(error => {
            console.log("Error:", error);
            // Remove the "Processing" message in case of an error
            const processingMessage = document.querySelector('.system-message');
            if (processingMessage) {
                chatContainer.removeChild(processingMessage);
            }
            appendMessage("Oops! Can't generating a response, connect to the internet.", 'bot');
        });
}

// this code is written to create an Artificial Intelligence chatbot //

// implementing user Image to each chat from the current device the site is 