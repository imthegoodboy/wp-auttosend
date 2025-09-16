// Make sure the chat is open (your own or test account)
let inputBox = document.querySelector('div[contenteditable="true"][data-tab="10"]');

function sendMessage(message, times) {
    let count = 0;
    let interval = setInterval(() => {
        if (count >= times) {
            clearInterval(interval);
            console.log("Done sending messages!");
            return;
        }

        inputBox.focus(); // Focus on the input box
        document.execCommand('insertText', false, message); // Insert text

        // Simulate Enter key press
        let enterEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Enter',
            code: 'Enter'
        });
        inputBox.dispatchEvent(enterEvent);

        count++;
    }, 500); // 0.5s interval
}

// Example: send "Hello!" 10 times
sendMessage("Hello!", 10);
