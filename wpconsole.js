// Function to prompt with retry on empty input, but allow cancel
function promptWithValidation(message, title = "Input Required") {
    let input;
    while (true) {
        input = prompt(`╔════════════════════════╗
║  ${title}  ║
╚════════════════════════╝
${message}`);
        
        if (input === null) {
            // User clicked cancel, exit the whole script
            alert("Operation cancelled by user.");
            throw new Error("User cancelled the prompt.");
        }

        if (input.trim() === "") {
            alert("⚠️ Please enter a valid value!");
        } else {
            return input.trim();
        }
    }
}

// ASCII Art for first prompt: Made by Nikku
let asciiArt = `
Made by Nikku
`;

try {
    // 1. Ask user for message with ASCII art
    let messageText = promptWithValidation(`${asciiArt}\nEnter the message you want to send:`, "Message Sender");

    // 2. Ask user how many times to send
    let repeatCount = parseInt(promptWithValidation("How many times do you want to send the message?", "Message Sender"));

    // 3. Ask user for interval between messages in milliseconds
    let intervalTime = parseInt(promptWithValidation("Enter interval time between messages (in milliseconds, e.g., 500):", "Message Sender"));

    // Select the input box
    let inputBox = document.querySelector('div[contenteditable="true"][data-tab="10"]');

    function sendMessage(message, times, interval) {
        let count = 0;
        let intervalId = setInterval(() => {
            if (count >= times) {
                clearInterval(intervalId);
                console.log("%cDone sending messages!", "color: green; font-weight: bold;");
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

            console.log(`%c[${count+1}] Sent: ${message}`, "color: blue;");
            count++;
        }, interval); // Use user-defined interval
    }

    // Call the function with user inputs
    sendMessage(messageText, repeatCount, intervalTime);

} catch (e) {
    console.log(e.message);  
}
