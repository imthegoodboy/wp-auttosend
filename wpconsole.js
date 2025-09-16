// Ask user for message
let messageText = prompt("Enter the message you want to send:");

// Ask user how many times to send
let repeatCount = parseInt(prompt("How many times do you want to send the message?"));

// Ask user for interval between messages in milliseconds
let intervalTime = parseInt(prompt("Enter interval time between messages (in milliseconds, e.g., 500):"));

// Select the input box
let inputBox = document.querySelector('div[contenteditable="true"][data-tab="10"]');

function sendMessage(message, times, interval) {
    let count = 0;
    let intervalId = setInterval(() => {
        if (count >= times) {
            clearInterval(intervalId);
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
    }, interval); // Use user-defined interval
}

// Call the function with user inputs
sendMessage(messageText, repeatCount, intervalTime);
