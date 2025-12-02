const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const speechBubble = document.getElementById('speech-bubble');
    const speechText = document.getElementById('speech-text');
    const actionButtonsContainer = document.getElementById('action-buttons');

    // Listen for suggestions from the main process
    ipcRenderer.on('ghost-suggestion', (event, suggestion) => {
        if (suggestion && suggestion.message && suggestion.actions) {
            // Show the bubble with the suggestion
            speechText.innerText = suggestion.message;
            actionButtonsContainer.innerHTML = ''; // Clear old buttons

            suggestion.actions.forEach(action => {
                const button = document.createElement('button');
                button.innerText = action.label;
                button.id = action.label.replace(/\s+/g, '-'); // Create a simple ID
                
                // When a button is clicked, ask the main process to run the command
                button.addEventListener('click', async () => {
                    console.log(`Button clicked for command: ${action.command}`);
                    const result = await ipcRenderer.invoke('kiro-execute', action.command);
                    // Optional: Show the result in a new bubble or log it
                    if(result.error) {
                       speechText.innerText = "Boo! An error occurred: " + result.error;
                       speechBubble.classList.remove('hidden');
                    }
                });

                actionButtonsContainer.appendChild(button);
            });
            
            speechBubble.classList.remove('hidden');
        } else {
            // Hide the bubble if there's no suggestion
            speechBubble.classList.add('hidden');
        }
    });
});