# REACH Coding Challnge - Word Game

This is a web app created using React, react-bootstrap, HTML and CSS.

## In order to start the game, run:

### `yarn install`

### `yarn start`

This is a web app created using React, react-bootstrap, HTML and CSS. Runs the app in the development mode. Please make sure you have [Node.js](https://nodejs.org/en/) installed. You can also use `npm`<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Game rules:

-   At the start of the game the computer/secret-keeper will choose a dictionary word
-   The guesser loses the game if they guess 6 letters that are not in the secret word
-   The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above

### Requirements:

-   The length of the secret word is displayed to the guesser (e.g. as a set of underscores)
-   As the guesser makes correct guesses, occurrences of the guessed letter in the word are shown while unknown letters are still hidden
-   The number of guesses remaining is displayed
-   A list of incorrect guesses are displayed
-   Retrieves a dictionary list of words from the word dictionary REST API provided. I had to implement a proxi server using Node.js/Express to work around CORS issues I encouneted.

### Extenions:

-   Displays a progress bar as well as a flower visual that gets updated as the user guesses incorrectly
-   User is invited to select a “difficulty level” when the game starts, and the app will adjust the words that are used based on the user’s preference
-   Sound effects

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
