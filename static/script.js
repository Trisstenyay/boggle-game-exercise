let timeLeft = 60; // Start with 60 seconds
const $timerDisplay = $('#timer'); // Timer display element
const $guessForm = $('#word-form'); // Form element
const $inputField = $('#guess'); // Input field










// jQuery function to listen for form submission
$("#word-form").on("submit", async function (evt) {
    evt.preventDefault(); // prevent form from submitting the traditional way

    let guess = $("#guess").val();  // get the input value (the word)
    let score = 0;
    let totalScore = 0;


    

    
    // Make an AJAX request using axios to check the word and // Send the word to the server using axios
    let response = await axios.post("/check-word", { guess: guess });

    // Handle the response from the server and display a message to the user
    let result = response.data.result;  // { "result": "ok" } or other
    console.log(result, 'result')
    if (result === "ok") {
        score = guess.length;
        totalScore = totalScore + score;
        $("#message").text("Great! The word is valid.");
    } else if (result === "not-on-board") {
        $("#message").text("The word is not on the board.");
    } else if (result === "not-a-word") {
        $("#message").text("That's not a valid word.");
    }

    $("#score").text(`${score}`)
});





// Function to handle the countdown
const countdown = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--; // Decrease the time
        timerDisplay.textContent = timeLeft; // Update the timer display
    } else {
        clearInterval(countdown); // Stop the timer
        disableGame(); // Disable the game input
    }
}, 1000); // Runs every second





// Function to disable the form when time runs out
function disableGame() {
    inputField.disabled = true; // Disable the input field
    $guessForm.find('button').prop('disabled', true);  // Disable the submit button
    $('#result-message').text("Time's up! No more guesses allowed.");  // Show message

}

// Automatically start the countdown when the page loads
window.onload = countdown;





axios.post('/update-stats', {
    score: currentScore  // Sending the current score to the server
})
.then(response => {
    console.log('Statistics updated:', response.data);
})
.catch(error => {
    console.error('Error updating stats:', error);
});
